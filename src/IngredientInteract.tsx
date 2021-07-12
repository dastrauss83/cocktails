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

type IneractState = "" | "search" | "ingredients" | "ingredientsStrict";

type IngredientInteractProps = {
  allDrinks: any;
  allIngredients: any;
};

export const IngredientInteract: React.FC<IngredientInteractProps> = ({
  allDrinks,
  allIngredients,
}) => {
  const classes = useStyles();

  const [interactState, setInteractState] = useState<IneractState>("");

  return (
    <div className={classes.buttons}>
      <Grid container spacing={6} justifyContent="center">
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
                if (interactState === "ingredients") {
                  setInteractState("");
                } else {
                  setInteractState("ingredients");
                }
              }}
            >
              Input Ingredients
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                if (interactState === "ingredientsStrict") {
                  setInteractState("");
                } else {
                  setInteractState("ingredientsStrict");
                }
              }}
            >
              Input Ingredients
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          {interactState === "search" ? (
            <Autocomplete
              id="cocktailList"
              options={allDrinks}
              getOptionLabel={(option: any) => option.strDrink}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Cocktails" variant="outlined" />
              )}
            />
          ) : null}
          {interactState === "ingredients" ? (
            <Autocomplete
              multiple
              disableCloseOnSelect
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
