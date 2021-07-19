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

import { useStyles } from "./useStyles";

type DrinkCardProps = {
  drink: any;
  currentUser: any;
};

export const DrinkCard: React.FC<DrinkCardProps> = ({ drink, currentUser }) => {
  const classes = useStyles();

  const ingredientList = [];

  for (let i = 1; i < 15; i++) {
    if (drink[`strIngredient${i}`]) {
      ingredientList.push(
        (drink[`strMeasure${i}`] || "") + " " + drink[`strIngredient${i}`] || ""
      );
    } else {
      break;
    }
  }

  const handleFavorite = async (drink: any) => {
    const currentUserFavorites = [
      await firebase
        .firestore()
        .collection("favorites")
        .doc(currentUser.uid)
        .get(),
    ];

    await firebase
      .firestore()
      .collection("favorites")
      .doc(currentUser.uid)
      .set({
        favoriteDrinks: [...currentUserFavorites, drink],
      });
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
          <Button
            color="secondary"
            size="small"
            onClick={() => {
              handleFavorite(drink);
            }}
          >
            Favorite
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
