import { LocalBar } from "@material-ui/icons";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { useStyles } from "./useStyles";

export const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar>
        <LocalBar className={classes.icon} />
        <Typography variant="h6">Find your Drink</Typography>
      </Toolbar>
    </AppBar>
  );
};
