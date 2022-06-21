import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from "react";
import queryString from "query-string";
import {
  getAuth,
  onAuthStateChanged,
  signOut as authSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  sendEmailVerification,
  checkActionCode,
  applyActionCode,
  getAdditionalUserInfo,
  updateEmail as authUpdateEmail,
  updateProfile as authUpdateProfile,
  updatePassword as authUpdatePassword,
  sendPasswordResetEmail as authSendPasswordResetEmail,
  confirmPasswordReset as authConfirmPasswordReset,
} from "firebase/auth";
import { firebaseApp } from "./firebase";
import { useUser, createUser, updateUser } from "./db";
import router from "next/router";
import PageLoader from "../components/PageLoader";

// Whether to merge extra user data from database into `auth.user`
const MERGE_DB_USER = true;
// Whether to send email verification on signup
const EMAIL_VERIFICATION = true;

// Initialize Firebase auth
const auth = getAuth(firebaseApp);

// Create a `useAuth` hook and `AuthProvider` that enables
// any component to subscribe to auth and re-render when it changes.
const authContext = createContext();
export const useAuth = () => useContext(authContext);
// This should wrap the app in `src/pages/_app.js`
export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook that creates the `auth` object and handles state
// This is called from `AuthProvider` above (extracted out for readability)
function useAuthProvider() {
  // Store auth user in state
  // `user` will be object, `null` (loading) or `false` (logged out)
  const [user, setUser] = useState(null);

  // Merge extra user data from the database
  // This means extra user data (such as payment plan) is available as part
  // of `auth.user` and doesn't need to be fetched separately. Convenient!
  let finalUser = useMergeExtraData(user, { enabled: MERGE_DB_USER });

  // Add custom fields and formatting to the `user` object
  finalUser = useFormatUser(finalUser);

  // Handle response from auth functions (`signup`, `signin`, and `signinWithProvider`)
  const handleAuth = async (response) => {
    const { user } = response;
    const { isNewUser } = getAdditionalUserInfo(response);

    // Ensure Firebase user is ready before we continue
    await waitForFirebase(user.uid);

    // Create the user in the database if they are new
    if (isNewUser) {
      await createUser(user.uid, { email: user.email });
      // Send email verification if enabled
      if (EMAIL_VERIFICATION) {
        sendEmailVerification(auth.currentUser);
      }
    }

    // Update user in state
    setUser(user);
    return user;
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      handleAuth
    );
  };

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(handleAuth);
  };

  const signinWithProvider = (name) => {
    // Get provider by name ("google", "facebook", etc)
    const provider = authProviders.find((p) => p.name === name).get();
    return signInWithPopup(auth, provider).then(handleAuth);
  };

  const signout = () => {
    return authSignOut(auth);
  };

  const sendPasswordResetEmail = (email) => {
    return authSendPasswordResetEmail(auth, email);
  };

  const confirmPasswordReset = (password, code) => {
    // Get code from query string object
    const resetCode = code || getFromQueryString("oobCode");
    return authConfirmPasswordReset(auth, resetCode, password);
  };

  const updatePassword = (password) => {
    return authUpdatePassword(auth.currentUser, password);
  };

  // Update auth user and persist data to database
  // Call this function instead of multiple auth/db update functions
  const updateProfile = async (data) => {
    const { email, name, picture } = data;

    // Update auth email
    if (email) {
      await authUpdateEmail(auth.currentUser, email);
    }

    // Update built-in auth profile fields
    // These fields are renamed in `useFormatUser`, so when updating we
    // need to make sure to use their original names (`displayName`, `photoURL`, etc)
    if (name || picture) {
      let fields = {};
      if (name) fields.displayName = name;
      if (picture) fields.photoURL = picture;
      await authUpdateProfile(auth.currentUser, fields);
    }

    // Persist all data to the database
    await updateUser(user.uid, data);

    // Update user in state
    setUser(auth.currentUser);
  };

  useEffect(() => {
    // Subscribe to user on mount
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Unsubscribe on cleanup
    return () => unsubscribe();
  }, []);

  return {
    user: finalUser,
    signup,
    signin,
    signinWithProvider,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    updatePassword,
    updateProfile,
  };
}

function useFormatUser(user) {
  // Memoize so returned object has a stable identity
  return useMemo(() => {
    // Return if auth user is `null` (loading) or `false` (not authenticated)
    if (!user) return user;

    // Create an array of user's auth providers by id (["password", "google", etc])
    // Components can read this to prompt user to re-auth with the correct provider
    const providers = user.providerData.map(({ providerId }) => {
      return authProviders.find((p) => p.id === providerId).name;
    });

    return {
      // Include full auth user data
      ...user,
      // Alter the names of some fields
      name: user.displayName,
      picture: user.photoURL,
      // User's auth providers
      providers: providers,
    };
  }, [user]);
}

function useMergeExtraData(user, { enabled }) {
  // Get extra user data from database
  const { data, status, error } = useUser(enabled && user && user.uid);

  // Memoize so returned object has a stable identity
  return useMemo(() => {
    // If disabled or no auth user (yet) then just return
    if (!enabled || !user) return user;

    switch (status) {
      case "success":
        // If successful, but `data` is `null`, that means user just signed up and the `createUser`
        // function hasn't populated the db yet. Return `null` to indicate auth is still loading.
        // The above call to `useUser` will re-render things once the data comes in.
        if (data === null) return null;
        // Return auth `user` merged with extra user `data`
        return { ...user, ...data };
      case "error":
        // Uh oh.. Let's at least show a helpful error.
        throw new Error(`
          Error: ${error.message}
          This happened while attempting to fetch extra user data from the database
          to include with the authenticated user. Make sure the database is setup or
          disable merging extra user data by setting MERGE_DB_USER to false.
        `);
      default:
        // We have an `idle` or `loading` status so return `null`
        // to indicate that auth is still loading.
        return null;
    }
  }, [user, enabled, data, status, error]);
}

// A Higher Order Component for requiring authentication
export const requireAuth = (Component) => {
  return (props) => {
    // Get authenticated user
    const auth = useAuth();

    useEffect(() => {
      // Redirect if not signed in
      if (auth.user === false) {
        router.replace("/auth/signin");
      }
    }, [auth]);

    // Show loading indicator
    // We're either loading (user is `null`) or about to redirect from above `useEffect` (user is `false`)
    if (!auth.user) {
      return <PageLoader />;
    }

    // Render component now that we have user
    return <Component {...props} />;
  };
};

// Handle Firebase email link for reverting to original email after an email change
export const handleRecoverEmail = async (code) => {
  // Check that action code is valid
  const info = await checkActionCode(auth, code);
  // Revert to original email by applying action code
  await applyActionCode(auth, code);
  // Send password reset email so user can change their password in the case
  // that someone else got into their account and changed their email.
  await authSendPasswordResetEmail(auth, info.data.email);
  // Return original email so it can be displayed by calling component
  return info.data.email;
};

// Handle Firebase email link for verifying email
export const handleVerifyEmail = (code) => {
  return applyActionCode(auth, code);
};

const authProviders = [
  {
    id: "password",
    name: "password",
  },
  {
    id: "google.com",
    name: "google",
    get: () => new GoogleAuthProvider(),
  },
  {
    id: "facebook.com",
    name: "facebook",
    get: () => {
      const provider = new FacebookAuthProvider();
      provider.setCustomParameters({ display: "popup" });
      return provider;
    },
  },
  {
    id: "twitter.com",
    name: "twitter",
    get: () => new TwitterAuthProvider(),
  },
  {
    id: "github.com",
    name: "github",
    get: () => new GithubAuthProvider(),
  },
];

// Wait for Firebase user to be initialized before resolving promise
// and taking any further action (such as writing to the database)
const waitForFirebase = (uid) => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Ensure we have a user with expected `uid`
      if (user && user.uid === uid) {
        resolve(user); // Resolve promise
        unsubscribe(); // Prevent from firing again
      }
    });
  });
};

const getFromQueryString = (key) => {
  return queryString.parse(window.location.search)[key];
};
