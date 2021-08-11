import { useStyles } from "../useStyles";
import React from "react";
import { Typography, Grid, Container } from "@material-ui/core";
import { DrinkCard } from "../DrinkCard";
import { IngredientInteract } from "../IngredientInteract";
import { drink, ingredientDrinkMap, interactState } from "../App";

type FindMyDrinkProps = {
  allDrinks: drink[];
  filteredDrinks: drink[];
  allIngredients: string[];
  setFilteredDrinks: any;
  ingredientDrinkMap: ingredientDrinkMap;
  currentUser: any;
  userIngredients: string[];
  interactState: interactState;
  setInteractState: any;
};

export const FindMyDrink: React.FC<FindMyDrinkProps> = ({
  allDrinks,
  filteredDrinks,
  allIngredients,
  setFilteredDrinks,
  ingredientDrinkMap,
  currentUser,
  userIngredients,
  interactState,
  setInteractState,
}) => {
  const classes = useStyles();
  return (
    <main>
      <div className={classes.container}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Find My Drink
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Below is a list of cocktails and their ingredients. You can search
            the list for a specific cocktail, or use the ingredient searches for
            a more refined search. The "Drinks With..." search will tell you all
            the cocktails that include your selected ingredits, while the "My
            Ingredients" search will show you only the cocktails you can make
            with the ingredients you have. Click on a cocktail to see any
            further instructions or "Favorite" to add to My Favorites.
          </Typography>
          <IngredientInteract
            allDrinks={allDrinks}
            allIngredients={allIngredients}
            setFilteredDrinks={setFilteredDrinks}
            ingredientDrinkMap={ingredientDrinkMap}
            currentUser={currentUser}
            userIngredients={userIngredients}
            interactState={interactState}
            setInteractState={setInteractState}
          />
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {filteredDrinks &&
            filteredDrinks.map((drink: drink) => (
              <DrinkCard
                key={drink.idDrink}
                drink={drink}
                currentUser={currentUser}
              />
            ))}
        </Grid>
      </Container>
    </main>
  );
};
