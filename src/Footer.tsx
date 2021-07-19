import { useStyles } from "./useStyles";
import { Button, Grid, Typography } from "@material-ui/core";
import { LocalBar } from "@material-ui/icons";
import { drink } from "./App";

type FooterProps = {
  setFilteredDrinks?: any;
  allDrinks?: drink[];
};

export const Footer: React.FC<FooterProps> = ({
  setFilteredDrinks,
  allDrinks,
}) => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid item>
          <Button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setFilteredDrinks(allDrinks);
            }}
            style={{ paddingLeft: "0px" }}
          >
            <LocalBar className={classes.icon} color="secondary" />
            <Typography variant="h6" color="textPrimary">
              Find Your Drink
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            gutterBottom
          >
            Created by:{" "}
            <span style={{ fontStyle: "italic" }}>David Strauss</span>
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            gutterBottom
          >
            Drinks provided by{" "}
            <a href="https://thecocktaildb.com/"> thecocktaildb.com</a>
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};
