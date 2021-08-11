import React from "react";
import { Typography, Container } from "@material-ui/core";
import { useStyles } from "../useStyles";
import { MyIngredients } from "../MyIngredients";

type MyIngredientsPageProps = {
  allIngredients: string[];
  currentUser: any;
  userIngredients: string[];
  setUserIngredients: any;
};

export const MyIngredientsPage: React.FC<MyIngredientsPageProps> = ({
  allIngredients,
  currentUser,
  userIngredients,
  setUserIngredients,
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
            My Ingredients
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Use the below to save your ingredients for future use. The My
            Ingredients list can be added to and deleted from at any time. My
            Ingredients can also be imported to the Find My Drink screen for
            easy use.
          </Typography>
          <MyIngredients
            allIngredients={allIngredients}
            currentUser={currentUser}
            userIngredients={userIngredients}
            setUserIngredients={setUserIngredients}
          />
        </Container>
      </div>
    </main>
  );
};
