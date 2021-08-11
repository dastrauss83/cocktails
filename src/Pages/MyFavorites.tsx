import React from "react";
import { Typography, Grid, Container } from "@material-ui/core";
import { useStyles } from "../useStyles";
import { DrinkCard } from "../DrinkCard";
import { drink } from "../App";

type MyFavoritesProps = {
  currentUser: any;
  filteredDrinks: drink[];
};

export const MyFavorites: React.FC<MyFavoritesProps> = ({
  currentUser,
  filteredDrinks,
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
            My Favorites
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Below are the cocktails that you have favorited. This list can be
            added to and removed from at any time. Use the Find My Drink screen
            to add more drinks to My Favorites.
          </Typography>
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
