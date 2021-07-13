import { AccountCircleSharp, LocalBar } from "@material-ui/icons";
import { Typography, AppBar, Toolbar, Button, Grid } from "@material-ui/core";
import { useStyles } from "./useStyles";

type NavBarProps = {
  setFilteredDrinks: any;
  allDrinks: any;
};

export const NavBar: React.FC<NavBarProps> = ({
  setFilteredDrinks,
  allDrinks,
}) => {
  const classes = useStyles();

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
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Typography variant="h6" className={classes.navBar}>
                Sign In
              </Typography>
              <AccountCircleSharp
                className={`${classes.icon} ${classes.navBar}`}
              />
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
