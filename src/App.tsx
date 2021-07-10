import React from "react";
import "./App.css";

import {
  Typography,
  CssBaseline,
  Grid,
  Container,
  Button,
  ButtonGroup,
} from "@material-ui/core";

import { ThemeProvider } from "@material-ui/styles";

import { useStyles, theme } from "./useStyles";

import { DrinkCard } from "./DrinkCard";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const App: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <main>
          <div className={classes.container}>
            <Container maxWidth="sm">
              <Typography
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Find your Drink
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                This is a real long sentence and I am just typing words so that
                it looks big on the screen. WHen I got to the mall I buy ducks
                and quacks. I love to play soccer and especially liverpool.
              </Typography>
              <div className={classes.buttons}>
                <Grid container spacing={6} justify="center">
                  <ButtonGroup>
                    <Button variant="contained" color="secondary">
                      Search
                    </Button>
                    <Button variant="outlined" color="secondary">
                      Input my Ingredients
                    </Button>
                  </ButtonGroup>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {cards.map((card) => (
                <DrinkCard key={card} />
              ))}
            </Grid>
          </Container>
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
};
