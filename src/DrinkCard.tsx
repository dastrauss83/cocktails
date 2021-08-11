import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Popover,
} from "@material-ui/core";
import firebase from "firebase";
import { useState } from "react";
import { useEffect } from "react";
import { drink } from "./App";

import { useStyles } from "./useStyles";

type DrinkCardProps = {
  drink: drink;
  currentUser: any;
};

export const DrinkCard: React.FC<DrinkCardProps> = ({ drink, currentUser }) => {
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);

  const ingredientList = [];

  for (let i = 1; i < 15; i++) {
    if (drink[`strIngredient${i}`]) {
      ingredientList.push(
        (drink[`strMeasure${i}`] || "") +
          " " +
          (drink[`strIngredient${i}`] || "")
      );
    } else break;
  }

  let firebaseUser: any;
  if (currentUser) {
    firebaseUser = firebase
      .firestore()
      .collection("favorites")
      .doc(currentUser.uid);
  }

  const getCurrentUserData = async () => {
    if (currentUser!) {
      const request = await firebaseUser.get();
      const data = await request.data();
      return data;
    }
  };

  const handleIsFavorite = async () => {
    if (currentUser) {
      const userData = await getCurrentUserData();
      setIsFavorite(
        userData.favoriteDrinks.filter(
          (dr: drink) => dr.idDrink === drink.idDrink
        ).length > 0
      );
    } else setIsFavorite(false);
  };

  useEffect(() => {
    handleIsFavorite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

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
  }, [currentUser]);

  const handleFavorite = async () => {
    const userData = await getCurrentUserData();
    if (
      userData.favoriteDrinks.filter(
        (dr: drink) => dr.idDrink === drink.idDrink
      ).length > 0
    ) {
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
      <Card
        className={`${classes.card} card`}
        onClick={() => setIsInView(!isInView)}
      >
        <CardMedia className={classes.cardMedia} image={drink.strDrinkThumb} />
        <CardContent className={classes.cardContent}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h5">
              {drink.strDrink}
            </Typography>
            {!currentUser ? null : isFavorite ? (
              <Button
                color="secondary"
                variant="contained"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite();
                  setIsFavorite(!isFavorite);
                }}
              >
                Favorite
              </Button>
            ) : (
              <Button
                color="secondary"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite();
                  setIsFavorite(!isFavorite);
                }}
              >
                Favorite
              </Button>
            )}
          </div>
          <ul className={classes.ingredientList}>
            {ingredientList.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </CardContent>
        <Popover
          open={isInView}
          anchorReference="none"
          onClose={() => setIsInView(!isInView)}
          transformOrigin={{
            horizontal: "center",
            vertical: "center",
          }}
          elevation={20}
          PaperProps={{ style: { width: "50%" } }}
          classes={{
            root: classes.popover,
          }}
        >
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={drink.strDrinkThumb}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h2">
                {drink.strDrink}
              </Typography>
              <Typography gutterBottom variant="h5">
                {drink.strInstructions}
              </Typography>
              <ul className={classes.ingredientList}>
                {ingredientList.map((ingredient) => (
                  <li key={ingredient}>
                    <Typography gutterBottom variant="h5">
                      {ingredient}
                    </Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Popover>
      </Card>
    </Grid>
  );
};
