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

export const DrinkCard: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/random"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5">
            Drink name
          </Typography>
          <Typography>
            Drink descrption. See what the api has to offer
          </Typography>
          {/* Maybe map a list of the Ingredients */}
          <ul className={classes.ingredientList}>
            <li>Ingredient 1</li>
            <li>Ingredient 2</li>
            <li>Ingredient 3</li>
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
