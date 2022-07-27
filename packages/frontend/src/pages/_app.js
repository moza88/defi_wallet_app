import React from "react";
import Navbar from "components/navbar/Navbar";
import Footer from "components/footer/Footer";
import { AuthProvider } from "util/auth";
import { ThemeProvider } from "util/theme";
import { QueryClientProvider } from "util/db";
import { Provider } from '@self.id/framework'

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider>
      <Provider client={{ ceramic: 'testnet-clay' }}>

      <ThemeProvider>
        <AuthProvider>
          <>
            <Navbar
              color="default"
              logo="https://1000logos.net/wp-content/uploads/2017/11/Wells-Fargo-emblem.jpg"
              logoInverted="https://1000logos.net/wp-content/uploads/2017/11/Wells-Fargo-emblem.jpg"
            />

            <Component {...pageProps} />

            <Footer
              bgColor="light"
              size="normal"
              bgImage=""
              bgImageOpacity={1}
              description="A short description of what you do here"
              copyright={`© ${new Date().getFullYear()} Wells Fargo`}
              logo="https://1000logos.net/wp-content/uploads/2017/11/Wells-Fargo-emblem.jpg"
              logoInverted="https://1000logos.net/wp-content/uploads/2017/11/Wells-Fargo-emblem.jpg"
              sticky={true}
            />
          </>
        </AuthProvider>
      </ThemeProvider>
      </Provider>

    </QueryClientProvider>
  );
}

export default MyApp;
