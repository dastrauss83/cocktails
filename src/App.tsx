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
  const [filteredDrinks, setFilteredDrinks] = useState<any | undefined>();
  const [allIngredients, setAllIngredients] = useState<any | undefined>();

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
    const listOfDrinks = arrayOfDrinks.filter(Boolean).sort();

    setAllDrinks(listOfDrinks);
    setFilteredDrinks(listOfDrinks);
  };

  useEffect(() => {
    getAllDrinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllIngredients = () => {
    const ingredientList: any = [];
    if (allDrinks && allDrinks.length > 430) {
      for (let j = 0; j < allDrinks.length; j++) {
        for (let i = 1; i < 15; i++) {
          if (allDrinks[j][`strIngredient${i}`]) {
            if (
              ingredientList.indexOf(
                allDrinks[j][`strIngredient${i}`]
                  .toLowerCase()
                  .split(" ")
                  .map(
                    (s: string) => s.charAt(0).toUpperCase() + s.substring(1)
                  )
                  .join(" ")
              ) === -1
            ) {
              ingredientList.push(
                allDrinks[j][`strIngredient${i}`]
                  .toLowerCase()
                  .split(" ")
                  .map(
                    (s: string) => s.charAt(0).toUpperCase() + s.substring(1)
                  )
                  .join(" ")
              );
            }
          } else {
            break;
          }
        }
      }
    }
    ingredientList.sort();

    setAllIngredients(ingredientList);
  };

  useEffect(() => {
    getAllIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDrinks, setAllDrinks]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar setFilteredDrinks={setFilteredDrinks} allDrinks={allDrinks} />
        <main>
          <div className={classes.container}>
            <Container maxWidth="md">
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
                Below is a list of cocktails and their ingredients. You can
                search the list for a specific cocktail, or use the ingredient
                searches for a more refined search. The "Drinks With..." search
                will tell you all the cocktails that include your selected
                ingredits, while the "My Ingredients" search will show you only
                the cocktails you can make with the ingredients you have. Click
                "View" on a cocktail to see any further instructions or
                "Favorite" to add to the list of your favorite cocktails.
              </Typography>
              <IngredientInteract
                allDrinks={allDrinks}
                allIngredients={allIngredients}
                setFilteredDrinks={setFilteredDrinks}
              />
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {filteredDrinks
                ? filteredDrinks.map((drink: any) => (
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
