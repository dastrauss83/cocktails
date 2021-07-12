import React, { useState, useEffect } from "react";
import "./App.css";

import { Typography, CssBaseline, Grid, Container } from "@material-ui/core";

import { ThemeProvider } from "@material-ui/styles";

import { useStyles, theme } from "./useStyles";

import { DrinkCard } from "./DrinkCard";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { IngredientInteract } from "./IngredientInteract";

export const App: React.FC = () => {
  const classes = useStyles();

  const [allDrinks, setAllDrinks] = useState<any | undefined>();

  const getOneDrinkList = async (key: string) => {
    let response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${key}`
    );
    let resObj = await response.json();
    let drinks = resObj.drinks;
    return drinks;
  };

  const getAllDrinks = async () => {
    const possibleKeys = "abcdefghijklmnopqrstuvwxyz0123456789";
    let listOfPromises: any = [];
    for (let i = 0; i < possibleKeys.length; i++) {
      listOfPromises = await listOfPromises.concat(
        getOneDrinkList(possibleKeys.charAt(i))
      );
    }
    const arrayOfDrinks = (await Promise.all(listOfPromises)).flat();
    const listOfDrinks = arrayOfDrinks.filter(Boolean);
    console.log(listOfDrinks);
    setAllDrinks(listOfDrinks);
  };

  useEffect(() => {
    getAllDrinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                Find Your Drink
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
              <IngredientInteract allCocktails={allDrinks} />
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {allDrinks
                ? allDrinks.map((drink: any) => (
                    <DrinkCard key={drink.idDrink} drink={drink} />
                  ))
                : null}
            </Grid>
          </Container>
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
};
