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
import { drink } from "./App";

type NavBarProps = {
  setFilteredDrinks?: any;
  allDrinks?: drink[];
  currentUser: any;
  setCurrentUser: any;
  setScreenState?: any;
};

export const NavBar: React.FC<NavBarProps> = ({
  setFilteredDrinks,
  allDrinks,
  currentUser,
  setCurrentUser,
  setScreenState,
}) => {
  const classes = useStyles();

  const getCurrentUserData = async () => {
    let firebaseUser: any;
    if (currentUser) {
      firebaseUser = firebase
        .firestore()
        .collection("favorites")
        .doc(currentUser.uid);
    }
    const request = await firebaseUser.get();
    const data = await request.data();
    return data;
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        setCurrentUser(result.user);
      });
  };

  const handleLogout = (): void => {
    if (window.confirm("Are you sure you want to Sign Out?")) {
      setCurrentUser();
    }
  };

  const handleMyFavoritesScreen = async () => {
    const userData = await getCurrentUserData();
    setFilteredDrinks(userData.favoriteDrinks);
    setScreenState("My Favorites");
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Button
              onClick={() => {
                setScreenState("Find My Drink");
                window.scrollTo({ top: 0, behavior: "smooth" });
                setFilteredDrinks(allDrinks);
              }}
            >
              <LocalBar className={`${classes.icon} ${classes.navBar}`} />
              <Typography variant="h6" className={classes.navBar}>
                Find My Drink
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
                  <MenuItem onClick={handleMyFavoritesScreen}>
                    My Favorites
                  </MenuItem>
                  <MenuItem onClick={() => setScreenState("My Ingredients")}>
                    My Ingredients
                  </MenuItem>
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
