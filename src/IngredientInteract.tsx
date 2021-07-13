import {
  Grid,
  Button,
  ButtonGroup,
  TextField,
  Checkbox,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Search } from "@material-ui/icons";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { useState } from "react";

import { useStyles } from "./useStyles";
import React from "react";

type IneractState = "" | "search" | "drinksWith" | "myIngredients";

type IngredientInteractProps = {
  allDrinks: any;
  allIngredients: any;
  setFilteredDrinks: any;
};

export const IngredientInteract: React.FC<IngredientInteractProps> = ({
  allDrinks,
  allIngredients,
  setFilteredDrinks,
}) => {
  const classes = useStyles();

  const [interactState, setInteractState] = useState<IneractState>("");

  const [drinksWithValue, setDrinksWithValue] = useState<any[] | undefined>(
    undefined
  );
  const [myIngredientsValue, setMyIngredientsValue] = useState<
    any[] | undefined
  >(undefined);

  return (
    <div className={classes.buttons}>
      <Grid
        container
        spacing={6}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid item>
          <ButtonGroup>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                if (interactState === "search") {
                  setInteractState("");
                } else {
                  setInteractState("search");
                }
              }}
            >
              <Search className={classes.icon} />
              Search
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                if (interactState === "drinksWith") {
                  setInteractState("");
                } else {
                  setInteractState("drinksWith");
                }
              }}
            >
              Drinks With...
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                if (interactState === "myIngredients") {
                  setInteractState("");
                } else {
                  setInteractState("myIngredients");
                }
              }}
            >
              My Ingredients
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          {interactState === "search" ? (
            <Autocomplete
              multiple
              id="cocktailList"
              onChange={(event: any, newValue: any) => {
                console.log(newValue);
                if (newValue.length === 0) {
                  setFilteredDrinks(allDrinks);
                  return;
                }
                if (Array.isArray(newValue)) {
                  setFilteredDrinks(newValue);
                } else {
                  setFilteredDrinks([newValue]);
                }
              }}
              options={allDrinks}
              getOptionLabel={(option: any) => option.strDrink}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Cocktails" variant="outlined" />
              )}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.strDrink}
                </React.Fragment>
              )}
            />
          ) : null}
          {interactState === "drinksWith" ? (
            <Autocomplete
              multiple
              id="ingredientList"
              value={drinksWithValue}
              onChange={(event: any, newValue: any) => {
                setDrinksWithValue(newValue);
              }}
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
          ) : null}
          {interactState === "myIngredients" ? (
            <Autocomplete
              multiple
              disableCloseOnSelect
              value={myIngredientsValue}
              onChange={(event: any, newValue: any) => {
                setMyIngredientsValue(newValue);
              }}
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
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};

/* Combo Box, value/inputvalue, options (array)  */
/* Checboxes, limit tags, size prop, options (array) */

/* <Autocomplete
  id="combo-box-demo"
  options={[0, 1, 2, 3]}
  getOptionLabel={(option) => JSON.stringify(option)}
  style={{ width: 300 }}
  renderInput={(params) => (
    <TextField {...params} label="Cocktails" variant="outlined" />
  )}
/> */
