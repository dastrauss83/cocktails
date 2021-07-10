import { createTheme, makeStyles } from "@material-ui/core";
import { purple, green } from "@material-ui/core/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: purple[500],
    },
  },
});

export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  icon: {
    marginRight: "20px",
  },
  buttons: {
    marginTop: "40px",
  },
  cardGrid: {
    padding: "20px, 0",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: "50px 0",
  },
  ingredientList: {
    listStyleType: "circle",
    padding: "10px",
    paddingLeft: "20px",
  },
  cardButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
