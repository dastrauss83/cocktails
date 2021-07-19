import {
  Grid,
  Button,
  ButtonGroup,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Search } from "@material-ui/icons";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { useState } from "react";

import { useStyles } from "./useStyles";
import React from "react";
import { drink, ingredientDrinkMap } from "./App";

type IneractState = "" | "search" | "drinksWith" | "myIngredients";

type IngredientInteractProps = {
  allDrinks: drink[];
  allIngredients: string[];
  setFilteredDrinks: any;
  ingredientDrinkMap: ingredientDrinkMap;
};

export const IngredientInteract: React.FC<IngredientInteractProps> = ({
  allDrinks,
  allIngredients,
  setFilteredDrinks,
  ingredientDrinkMap,
}) => {
  const classes = useStyles();

  const [interactState, setInteractState] = useState<IneractState>("");
  const [myIngredientsState, setMyIngredientsState] = useState<boolean>(false);

  const handleSearch = (event: any, newValue: drink | drink[]) => {
    if (newValue.length === 0) {
      setFilteredDrinks(allDrinks);
      return;
    }
    if (Array.isArray(newValue)) {
      setFilteredDrinks(newValue);
    } else {
      setFilteredDrinks([newValue]);
    }
  };

  const handleDrinksWith = (event: any, newValue: string | string[]) => {
    if (newValue.length === 0) {
      setFilteredDrinks(allDrinks);
      return;
    }
    if (!Array.isArray(newValue)) {
      newValue = [newValue];
    }
    let arrayOfDrinks: drink[] = [];
    for (let i = 0; i < newValue.length; i++) {
      arrayOfDrinks = arrayOfDrinks.concat(ingredientDrinkMap[newValue[i]]);
    }
    setFilteredDrinks(arrayOfDrinks);
  };

  const handleMyIngredients = (event: any, newValue: string | string[]) => {
    if (allDrinks) {
      if (newValue.length === 0) {
        setFilteredDrinks(allDrinks);
        return;
      }
      if (!Array.isArray(newValue)) {
        newValue = [newValue];
      }
      let arrayOfDrinks: drink[] = [];
      if (!myIngredientsState) {
        //not strict
        for (let i = 0; i < newValue.length; i++) {
          arrayOfDrinks = arrayOfDrinks.concat(ingredientDrinkMap[newValue[i]]);
        }
        if (newValue.length === 1) {
          setFilteredDrinks(newValue);
        } else {
          arrayOfDrinks = arrayOfDrinks.filter(
            (drink: drink, index: number, array: drink[]) =>
              array.indexOf(drink) === index &&
              array.lastIndexOf(drink) !== index
          );
        }
        console.log(arrayOfDrinks);
        setFilteredDrinks(arrayOfDrinks);
      } else {
        //strict
        for (let i = 0; i < allDrinks.length; i++) {
          for (let j = 1; j < 15; j++) {
            if (allDrinks[i][`strIngredient${j}`]) {
              if (
                newValue.indexOf(
                  allDrinks[i][`strIngredient${j}`]
                    .toLowerCase()
                    .split(" ")
                    .map(
                      (s: string) => s.charAt(0).toUpperCase() + s.substring(1)
                    )
                    .join(" ")
                ) === -1
              ) {
                break;
              }
            } else {
              arrayOfDrinks = arrayOfDrinks.concat(allDrinks[i]);
            }
          }
        }
        arrayOfDrinks = arrayOfDrinks.filter((drink: drink, index: number) => {
          return arrayOfDrinks.indexOf(drink) === index;
        });
        console.log(arrayOfDrinks);
        setFilteredDrinks(arrayOfDrinks);
      }
    }
  };

  return (
    <div className={classes.buttons}>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        direction="column"
        wrap="wrap"
      >
        <Grid item>
          <ButtonGroup>
            <Button
              variant={interactState === "search" ? "contained" : "outlined"}
              color="secondary"
              onClick={() => {
                setFilteredDrinks(allDrinks);
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
              variant={
                interactState === "drinksWith" ? "contained" : "outlined"
              }
              color="secondary"
              onClick={() => {
                setFilteredDrinks(allDrinks);
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
              variant={
                interactState === "myIngredients" ? "contained" : "outlined"
              }
              color="secondary"
              onClick={() => {
                setFilteredDrinks(allDrinks);
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
              onChange={handleSearch}
              options={allDrinks}
              getOptionLabel={(option: drink) => option.strDrink}
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
              onChange={handleDrinksWith}
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
                  onChange={handleMyIngredients}
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
                    <TextField
                      {...params}
                      label="Ingredients"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={myIngredientsState}
                        onChange={() =>
                          setMyIngredientsState(!myIngredientsState)
                        }
                      />
                    }
                    label={
                      "Show possible drinks with exclusively My Ingredients"
                    }
                    labelPlacement="top"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};
