import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from "@material-ui/core";
import firebase from "firebase";
import { useEffect } from "react";
import { drink } from "./App";

import { useStyles } from "./useStyles";

type DrinkCardProps = {
  drink: drink;
  currentUser: any;
  setCurrentUser: any;
};

export const DrinkCard: React.FC<DrinkCardProps> = ({
  drink,
  currentUser,
  setCurrentUser,
}) => {
  const classes = useStyles();

  const ingredientList = [];

  for (let i = 1; i < 15; i++) {
    if (drink[`strIngredient${i}`]) {
      ingredientList.push(
        (drink[`strMeasure${i}`] || "") +
          " " +
          (drink[`strIngredient${i}`] || "")
      );
    } else {
      break;
    }
  }

  let firebaseUser: any;
  if (currentUser) {
    firebaseUser = firebase
      .firestore()
      .collection("favorites")
      .doc(currentUser.uid);
  }

  const getCurrentUserData = async () => {
    const request = await firebaseUser.get();
    const data = await request.data();
    return data;
  };

  const handleNewUser = async () => {
    if (currentUser) {
      const userData = await getCurrentUserData();
      if (!userData) {
        firebaseUser.set({
          favoriteDrinks: [],
          myIngredients: [],
        });
      }
    }
  };

  useEffect(() => {
    handleNewUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, setCurrentUser]);

  const handleFavorite = async () => {
    const userData = await getCurrentUserData();
    console.log(userData);
    console.log(drink);
    if (
      userData.favoriteDrinks.filter(
        (dr: drink) => dr.idDrink === drink.idDrink
      ).length > 0
    ) {
      console.log("work");
      const index = userData.favoriteDrinks.indexOf(drink);
      const tempFavoriteDrinks = [...userData.favoriteDrinks];
      tempFavoriteDrinks.splice(index, 1);
      await firebaseUser.update({
        favoriteDrinks: tempFavoriteDrinks,
      });
    } else {
      await firebaseUser.set({
        ...userData,
        favoriteDrinks: [...userData.favoriteDrinks, drink],
      });
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia className={classes.cardMedia} image={drink.strDrinkThumb} />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5">
            {drink.strDrink}
          </Typography>
          {/* <Typography>{drink.strInstructions}</Typography> */}
          <ul className={classes.ingredientList}>
            {ingredientList.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </CardContent>
        <CardActions className={classes.cardButtons}>
          <Button color="secondary" size="small">
            View
          </Button>
          {currentUser ? (
            <Button color="secondary" size="small" onClick={handleFavorite}>
              Favorite
            </Button>
          ) : null}
        </CardActions>
      </Card>
    </Grid>
  );
};
