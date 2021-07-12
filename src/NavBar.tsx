import { LocalBar } from "@material-ui/icons";
import { Typography, AppBar, Toolbar, Button } from "@material-ui/core";
import { useStyles } from "./useStyles";

export const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <LocalBar className={classes.icon} color="secondary" />
          <Typography variant="h6" color="secondary">
            Find Your Drink
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};
