import { AccountCircleSharp, LocalBar } from "@material-ui/icons";
import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  Grid,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useStyles } from "./useStyles";
import firebase from "firebase";
import { useState } from "react";

type NavBarProps = {
  setFilteredDrinks: any;
  allDrinks: any;
  currentUser: any;
  setCurrentUser: any;
};

export const NavBar: React.FC<NavBarProps> = ({
  setFilteredDrinks,
  allDrinks,
  currentUser,
  setCurrentUser,
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        setCurrentUser(result.user);
      });
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to Log Out?")) {
      setCurrentUser();
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setFilteredDrinks(allDrinks);
              }}
            >
              <LocalBar className={`${classes.icon} ${classes.navBar}`} />
              <Typography variant="h6" className={classes.navBar}>
                Find Your Drink
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            {!currentUser ? (
              <Button onClick={() => handleLogin()}>
                <Typography variant="h6" className={classes.navBar}>
                  Sign In
                </Typography>
                <AccountCircleSharp
                  className={`${classes.icon} ${classes.navBar}`}
                />
              </Button>
            ) : (
              <>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleOpenMenu}
                >
                  <Typography variant="h6" className={classes.navBar}>
                    {currentUser.displayName}
                  </Typography>
                  <AccountCircleSharp
                    className={`${classes.icon} ${classes.navBar}`}
                  />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={handleCloseMenu}>My Favorites</MenuItem>
                  <MenuItem onClick={handleCloseMenu}>My Ingredients</MenuItem>
                  <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                </Menu>
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
