import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from "@material-ui/core";

import { useStyles } from "./useStyles";

type DrinkCardProps = {
  drink: any;
};

export const DrinkCard: React.FC<DrinkCardProps> = ({ drink }) => {
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
          <Button color="secondary" size="small">
            Favorite
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
