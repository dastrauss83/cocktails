import React from "react";
import firebase from "firebase";
import { Checkbox, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { useState } from "react";
import { useEffect } from "react";

type MyIngredientsProps = {
  allIngredients: string[];
  currentUser: any;
  screenState: string;
  setScreenState: any;
};

export const MyIngredients: React.FC<MyIngredientsProps> = ({
  allIngredients,
  currentUser,
  screenState,
  setScreenState,
}) => {
  const [myIngredients, setMyIngredients] = useState<string[]>([]);

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

  const getUserIngredients = async () => {
    const response = await firebaseUser.get();
    const data = response.data();
    setMyIngredients(data.myIngredients);
  };

  useEffect(() => {
    getUserIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenState, setScreenState]);

  const handleIngredient = async (e: any, newValue: string | string[]) => {
    if (!Array.isArray(newValue)) {
      newValue = [newValue];
    }
    const userData = await getCurrentUserData();
    await firebaseUser.set({
      ...userData,
      myIngredients: newValue,
    });
    const response = await firebaseUser.get();
    const data = response.data();
    setMyIngredients(data.myIngredients);
  };

  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      alignItems="center"
      direction="column"
      wrap="wrap"
    >
      <Grid item>
        <Autocomplete
          multiple
          disableCloseOnSelect
          value={myIngredients}
          onChange={handleIngredient}
          id="ingredientList"
          options={allIngredients}
          getOptionLabel={(option) => JSON.stringify(option)}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </React.Fragment>
          )}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Ingredients" variant="outlined" />
          )}
        />
      </Grid>
    </Grid>
  );
};
