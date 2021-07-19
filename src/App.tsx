import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  Typography,
  CssBaseline,
  Grid,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { useStyles, theme } from "./useStyles";
import { DrinkCard } from "./DrinkCard";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { IngredientInteract } from "./IngredientInteract";

firebase.initializeApp({
  apiKey: "AIzaSyAZCEan1zGJg6N4RyCoI8l36kVYbm8l1F4",
  authDomain: "cocktails-52bb7.firebaseapp.com",
  projectId: "cocktails-52bb7",
  storageBucket: "cocktails-52bb7.appspot.com",
  messagingSenderId: "315490639182",
  appId: "1:315490639182:web:78aa99a8cbccfa0a63521f",
});

export type drink = {
  [key: string]: string;
};

export type ingredientDrinkMap = {
  [key: string]: drink[];
};

export const App: React.FC = () => {
  const classes = useStyles();

  const [currentUser, setCurrentUser] = useState<any>(null);

  const [allDrinks, setAllDrinks] = useState<drink[]>();
  const [filteredDrinks, setFilteredDrinks] = useState<drink[]>();
  const [allIngredients, setAllIngredients] = useState<string[]>();
  const [ingredientDrinkMap, setIngredientDrinkMap] =
    useState<ingredientDrinkMap>({});

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
    let listOfPromises: Promise<any>[] = [];
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
    const tempIngredientDrinkMap: ingredientDrinkMap = {};
    const ingredientList: string[] = [];
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
              tempIngredientDrinkMap[
                allDrinks[j][`strIngredient${i}`]
                  .toLowerCase()
                  .split(" ")
                  .map(
                    (s: string) => s.charAt(0).toUpperCase() + s.substring(1)
                  )
                  .join(" ")
              ] = [allDrinks[j]];
              ingredientList.push(
                allDrinks[j][`strIngredient${i}`]
                  .toLowerCase()
                  .split(" ")
                  .map(
                    (s: string) => s.charAt(0).toUpperCase() + s.substring(1)
                  )
                  .join(" ")
              );
            } else {
              tempIngredientDrinkMap[
                allDrinks[j][`strIngredient${i}`]
                  .toLowerCase()
                  .split(" ")
                  .map(
                    (s: string) => s.charAt(0).toUpperCase() + s.substring(1)
                  )
                  .join(" ")
              ].push(allDrinks[j]);
            }
          } else {
            break;
          }
        }
      }
    }
    ingredientList.sort();

    setIngredientDrinkMap(tempIngredientDrinkMap);
    setAllIngredients(ingredientList);
  };

  useEffect(() => {
    getAllIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDrinks, setAllDrinks]);

  if (!(allDrinks && allIngredients)) {
    return (
      <>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
          <main>
            <Container maxWidth="md" className={classes.container}>
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
              <Typography
                style={{ fontStyle: "italic" }}
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Loading Drinks
              </Typography>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="secondary" />
              </div>
            </Container>
          </main>
          <Footer />
        </ThemeProvider>
      </>
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar
          setFilteredDrinks={setFilteredDrinks}
          allDrinks={allDrinks}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
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
                ingredientDrinkMap={ingredientDrinkMap}
                currentUser={currentUser}
              />
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {filteredDrinks
                ? filteredDrinks.map((drink: drink) => (
                    <DrinkCard
                      key={drink.idDrink}
                      drink={drink}
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  ))
                : null}
            </Grid>
          </Container>
        </main>
        <Footer setFilteredDrinks={setFilteredDrinks} allDrinks={allDrinks} />
      </ThemeProvider>
    </>
  );
};
