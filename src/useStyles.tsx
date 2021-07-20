import { createTheme, makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: blue[900],
    },
  },
});

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8, 0, 6),
    marginTop: "20px",
  },
  icon: {
    marginRight: "15px",
    marginLeft: "15px",
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
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    padding: "50px 0",
  },
  ingredientList: {
    listStyleType: "circle",
    padding: "10px",
    paddingLeft: "20px",
  },
  navBar: {
    color: "white",
  },
  popover: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    width: "500px",
  },
}));
