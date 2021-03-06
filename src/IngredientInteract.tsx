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
import { useEffect, useState } from "react";
import { useStyles } from "./useStyles";
import React from "react";
import {
  drink,
  ingredientDrinkMap,
  interactState,
  capitalizeHelper,
} from "./App";

type IngredientInteractProps = {
  allDrinks: drink[];
  allIngredients: string[];
  setFilteredDrinks: any;
  ingredientDrinkMap: ingredientDrinkMap;
  currentUser: any;
  userIngredients: string[];
  interactState: interactState;
  setInteractState: any;
};

export const IngredientInteract: React.FC<IngredientInteractProps> = ({
  allDrinks,
  allIngredients,
  setFilteredDrinks,
  ingredientDrinkMap,
  currentUser,
  userIngredients,
  interactState,
  setInteractState,
}) => {
  const classes = useStyles();

  const [myIngredientsState, setMyIngredientsState] = useState<boolean>(false);
  const [myIngredientsValue, setMyIngredientsValue] = useState<string[]>([]);

  const handleSearch = (event: any, newValue: drink | drink[]) => {
    if (newValue.length === 0) {
      setFilteredDrinks(allDrinks);
      return;
    }
    if (Array.isArray(newValue)) {
      setFilteredDrinks(newValue);
    } else setFilteredDrinks([newValue]);
  };

  const handleDrinksWith = (_event: any, newValue: string | string[]) => {
    if (newValue.length === 0) {
      setFilteredDrinks(allDrinks);
      return;
    }
    if (!Array.isArray(newValue)) {
      newValue = [newValue];
    }
    let arrayOfDrinks: drink[] = [];
    for (let i = 0; i < newValue.length; i++) {
      arrayOfDrinks.push(...ingredientDrinkMap[newValue[i]]);
    }
    setFilteredDrinks(arrayOfDrinks);
  };

  const handleMyIngredients = (event: any, newValue: string | string[]) => {
    if (allDrinks) {
      if (newValue.length === 0) {
        setFilteredDrinks(allDrinks);
        setMyIngredientsValue([]);
        return;
      }
      if (!Array.isArray(newValue)) {
        newValue = [newValue];
      }
      setMyIngredientsValue(newValue);
      let arrayOfDrinks: drink[] = [];
      if (!myIngredientsState) {
        //not strict
        for (let i = 0; i < newValue.length; i++) {
          arrayOfDrinks.push(...ingredientDrinkMap[newValue[i]]);
        }
        if (newValue.length !== 1) {
          arrayOfDrinks = arrayOfDrinks.filter(
            (drink: drink, index: number, array: drink[]) =>
              array.indexOf(drink) === index &&
              array.lastIndexOf(drink) !== index
          );
        }
        setFilteredDrinks(arrayOfDrinks);
      } else {
        //strict
        for (let i = 0; i < allDrinks.length; i++) {
          for (let ii = 1; ii < 15; ii++) {
            if (allDrinks[i][`strIngredient${ii}`]) {
              if (
                newValue.indexOf(
                  capitalizeHelper(allDrinks[i][`strIngredient${ii}`])
                ) === -1
              ) {
                break;
              }
            } else arrayOfDrinks.push(allDrinks[i]);
          }
        }
        arrayOfDrinks = arrayOfDrinks.filter((drink: drink, index: number) => {
          return arrayOfDrinks.indexOf(drink) === index;
        });
        setFilteredDrinks(arrayOfDrinks);
      }
    }
  };

  useEffect(() => {
    handleMyIngredients(Event, myIngredientsValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myIngredientsState]);

  const toggleInteractState = (state: interactState) => {
    if (interactState === state) {
      setInteractState("");
    } else setInteractState(state);
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
                toggleInteractState("search");
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
                toggleInteractState("drinksWith");
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
                toggleInteractState("myIngredients");
              }}
            >
              My Ingredients
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          {interactState === "search" && (
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
                <>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.strDrink}
                </>
              )}
            />
          )}
          {interactState === "drinksWith" && (
            <Autocomplete
              multiple
              id="ingredientList"
              onChange={handleDrinksWith}
              options={allIngredients}
              getOptionLabel={(option) => option}
              renderOption={(option, { selected }) => (
                <>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </>
              )}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Ingredients" variant="outlined" />
              )}
            />
          )}
          {interactState === "myIngredients" && (
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
                  value={myIngredientsValue}
                  onChange={handleMyIngredients}
                  id="ingredientList"
                  options={allIngredients}
                  getOptionLabel={(option) => option}
                  renderOption={(option, { selected }) => (
                    <>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </>
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
              {currentUser && (
                <Grid item>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={(e) => {
                      setMyIngredientsValue(userIngredients);
                      handleMyIngredients(e, userIngredients);
                    }}
                  >
                    Import My Ingredients
                  </Button>
                </Grid>
              )}
              <Grid item>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={myIngredientsState}
                        onChange={() => {
                          setMyIngredientsState(!myIngredientsState);
                        }}
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
          )}
        </Grid>
      </Grid>
    </div>
  );
};
