import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./useStyles";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { MyIngredientsPage } from "./Pages/MyIngredientsPage";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { FindMyDrink } from "./Pages/FindMyDrink";
import { MyFavorites } from "./Pages/MyFavorites";

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

export type interactState = "" | "search" | "drinksWith" | "myIngredients";

export const capitalizeHelper = (string: string): string => {
  return string
    .toLowerCase()
    .split(" ")
    .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
};

export const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userIngredients, setUserIngredients] = useState<string[]>([]);

  const [interactState, setInteractState] = useState<interactState>("");

  const [allDrinks, setAllDrinks] = useState<drink[]>([]);
  const [filteredDrinks, setFilteredDrinks] = useState<drink[]>([]);
  const [allIngredients, setAllIngredients] = useState<string[]>([]);
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
    let arrayOfPromises: Promise<any>[] = [];
    for (let i = 0; i < possibleKeys.length; i++) {
      arrayOfPromises.push(getOneDrinkList(possibleKeys.charAt(i)));
    }
    const arrayOfDrinks = (await Promise.all(arrayOfPromises))
      .flat()
      .filter(Boolean)
      .sort();

    setAllDrinks(arrayOfDrinks);
    setFilteredDrinks(arrayOfDrinks);
  };

  useEffect(() => {
    getAllDrinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllIngredients = () => {
    const tempIngredientDrinkMap: ingredientDrinkMap = {};
    const ingredientList: string[] = [];
    if (allDrinks && allDrinks.length > 400) {
      for (let i = 0; i < allDrinks.length; i++) {
        for (let ii = 1; ii < 15; ii++) {
          if (allDrinks[i][`strIngredient${ii}`]) {
            if (
              ingredientList.indexOf(
                capitalizeHelper(allDrinks[i][`strIngredient${ii}`])
              ) === -1
            ) {
              tempIngredientDrinkMap[
                capitalizeHelper(allDrinks[i][`strIngredient${ii}`])
              ] = [allDrinks[i]];
              ingredientList.push(
                capitalizeHelper(allDrinks[i][`strIngredient${ii}`])
              );
            } else {
              tempIngredientDrinkMap[
                capitalizeHelper(allDrinks[i][`strIngredient${ii}`])
              ].push(allDrinks[i]);
            }
          } else break;
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
  }, [allDrinks]);

  const getUserIngredients = async () => {
    if (currentUser) {
      const response = await firebase
        .firestore()
        .collection("favorites")
        .doc(currentUser.uid)
        .get();
      const data = response.data();
      data && setUserIngredients(data.myIngredients);
    }
  };

  useEffect(() => {
    getUserIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar
          setFilteredDrinks={setFilteredDrinks}
          allDrinks={allDrinks}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setInteractState={setInteractState}
        />
        <Switch>
          <Route exact path="/">
            <FindMyDrink
              allDrinks={allDrinks}
              allIngredients={allIngredients}
              setFilteredDrinks={setFilteredDrinks}
              ingredientDrinkMap={ingredientDrinkMap}
              currentUser={currentUser}
              userIngredients={userIngredients}
              interactState={interactState}
              setInteractState={setInteractState}
              filteredDrinks={filteredDrinks}
            />
          </Route>
          <Route exact path="/my-favorites">
            {!currentUser ? (
              <Redirect to="/" />
            ) : (
              <MyFavorites
                currentUser={currentUser}
                filteredDrinks={filteredDrinks}
              />
            )}
          </Route>
          <Route exact path="/my-ingredients">
            {!currentUser ? (
              <Redirect to="/" />
            ) : (
              <MyIngredientsPage
                allIngredients={allIngredients}
                currentUser={currentUser}
                userIngredients={userIngredients}
                setUserIngredients={setUserIngredients}
              />
            )}
          </Route>
        </Switch>
        <Footer
          setFilteredDrinks={setFilteredDrinks}
          allDrinks={allDrinks}
          setInteractState={setInteractState}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
};
