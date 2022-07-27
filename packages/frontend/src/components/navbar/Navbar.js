import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "next/link";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Section from "components/section/Section";
import { useAuth } from "util/auth";
import { useDarkMode } from "util/theme";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 28,
    marginRight: theme.spacing(2),
  },
  drawerList: {
    width: 250,
  },
  spacer: {
    flexGrow: 1,
  },
}));

function Navbar(props) {
  const classes = useStyles();

  const auth = useAuth();
  const darkMode = useDarkMode();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuState, setMenuState] = useState(null);

  // Use inverted logo if specified
  // and we are in dark mode
  const logo =
    props.logoInverted && darkMode.value ? props.logoInverted : props.logo;

  const handleOpenMenu = (event, id) => {
    // Store clicked element (to anchor the menu to)
    // and the menu id so we can tell which menu is open.
    setMenuState({ anchor: event.currentTarget, id });
  };

  const handleCloseMenu = () => {
    setMenuState(null);
  };

  return (
    <Section bgColor={props.color} size="auto">
      <AppBar position="static" color="transparent" elevation={0}>
        <Container disableGutters={true}>
          <Toolbar>
            <Link href="/">
              <a>
                <img src={logo} alt="Logo" className={classes.logo} />
              </a>
            </Link>
            <Typography variant="h5">
              Wealth Mgmt Banking Portal
            </Typography>
            <div className={classes.spacer} />
            <Hidden mdUp={true} implementation="css">
              <IconButton
                onClick={() => {
                  setDrawerOpen(true);
                }}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden smDown={true} implementation="css">
              <Link href="/identity/about" passHref={true}>
                <Button component="a" color="inherit">
                  Identity
                </Button>
              </Link>
              <Link href="/wallets/wallets" passHref={true}>
                <Button component="a" color="inherit">
                  Wallets
                </Button>
              </Link>
              <Link href="/faq/faq" passHref={true}>
                <Button component="a" color="inherit">
                  Buy/Sell
                </Button>
              </Link>
              <Link href="/monitoring/monitoring" passHref={true}>
                <Button component="a" color="inherit">
                  Monitoring
                </Button>
              </Link>
              <Link href="/faq/faq" passHref={true}>
                <Button component="a" color="inherit">
                  FAQ
                </Button>
              </Link>

              {!auth.user && (
                <>
                  <Link href="/auth/signin" passHref={true}>
                    <Button component="a" color="inherit">
                      Sign in
                    </Button>
                  </Link>
                  <Box component="span" ml={1}>
                    <Link href="/auth/signup" passHref={true}>
                      <Button component="a" variant="contained" color="primary">
                        Sign up
                      </Button>
                    </Link>
                  </Box>
                </>
              )}

              {auth.user && (
                <>
                  <Button
                    color="inherit"
                    aria-label="Account"
                    aria-controls="account-menu"
                    aria-haspopup="true"
                    onClick={(event) => {
                      handleOpenMenu(event, "account-menu");
                    }}
                  >
                    Account
                    <ExpandMoreIcon className={classes.buttonIcon} />
                  </Button>
                  <Menu
                    id="account-menu"
                    open={
                      menuState && menuState.id === "account-menu"
                        ? true
                        : false
                    }
                    anchorEl={menuState && menuState.anchor}
                    getContentAnchorEl={undefined}
                    onClick={handleCloseMenu}
                    onClose={handleCloseMenu}
                    keepMounted={true}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <div>
                      <Link href="/settings/general" passHref={true}>
                        <MenuItem component="a">Settings</MenuItem>
                      </Link>
                      <Divider />
                      <MenuItem
                        onClick={(event) => {
                          auth.signout();
                        }}
                      >
                        Signout
                      </MenuItem>
                    </div>
                  </Menu>
                </>
              )}

              <IconButton
                color="inherit"
                onClick={darkMode.toggle}
                style={{ opacity: 0.6 }}
              >
                {darkMode.value && <NightsStayIcon />}

                {!darkMode.value && <WbSunnyIcon />}
              </IconButton>
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List
          className={classes.drawerList}
          onClick={() => setDrawerOpen(false)}
        >
          <Link href="/identity/about" passHref={true}>
            <ListItem component="a" button={true}>
              <ListItemText>Identity</ListItemText>
            </ListItem>
          </Link>


          <Link href="/asset-mgmt/asset-manager" passHref={true}>
            <ListItem component="a" button={true}>
              <ListItemText>Asset Manager</ListItemText>
            </ListItem>
          </Link>

          <Link href="/wallets/wallets" passHref={true}>
            <ListItem component="a" button={true}>
              <ListItemText>Digital Asset Banker</ListItemText>
            </ListItem>
          </Link>

          <Link href="/faq/faq" passHref={true}>
            <ListItem component="a" button={true}>
              <ListItemText>FAQ</ListItemText>
            </ListItem>
          </Link>
          {!auth.user && (
            <>
              <Link href="/auth/signin" passHref={true}>
                <ListItem component="a" button={true}>
                  <ListItemText>Sign in</ListItemText>
                </ListItem>
              </Link>
              <ListItem>
                <Link href="/auth/signup" passHref={true}>
                  <Button component="a" variant="contained" color="primary">
                    Sign up
                  </Button>
                </Link>
              </ListItem>
            </>
          )}

          {auth.user && (
            <>

              <Link href="/settings/general" passHref={true}>
                <ListItem component="a" button={true}>
                  <ListItemText>Settings</ListItemText>
                </ListItem>
              </Link>
              <Divider />
              <ListItem
                button={true}
                onClick={(event) => {
                  auth.signout();
                }}
              >
                <ListItemText>Sign out</ListItemText>
              </ListItem>
            </>
          )}

          <ListItem>
            <IconButton
              color="inherit"
              onClick={darkMode.toggle}
              style={{ opacity: 0.6 }}
            >
              {darkMode.value && <NightsStayIcon />}

              {!darkMode.value && <WbSunnyIcon />}
            </IconButton>
          </ListItem>
        </List>
      </Drawer>
    </Section>
  );
}

export default Navbar;
