import { Grid, Button, ButtonGroup, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Search } from "@material-ui/icons";
import { useState } from "react";

import { useStyles } from "./useStyles";

type IngredientInteractProps = {
  allCocktails: any;
};

export const IngredientInteract: React.FC<IngredientInteractProps> = ({
  allCocktails,
}) => {
  const classes = useStyles();

  const [searchState, setSearchState] = useState<boolean>(false);
  const [ingredientState, setIngredientState] = useState<boolean>(false);

  return (
    <div>
      <div className={classes.buttons}>
        <Grid container spacing={6} justify="center">
          <ButtonGroup>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setSearchState(!searchState);
                if (ingredientState) {
                  setIngredientState(!ingredientState);
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
                setIngredientState(!ingredientState);
                if (searchState) {
                  setSearchState(!searchState);
                }
                console.log(allCocktails);
              }}
            >
              Input Ingredients
            </Button>
          </ButtonGroup>
        </Grid>
      </div>
      {searchState ? (
        <Autocomplete
          id="cocktailList"
          options={allCocktails}
          getOptionLabel={(option: any) => option.strDrink}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Cocktails" variant="outlined" />
          )}
        />
      ) : null}
      {ingredientState ? (
        <Autocomplete
          id="combo-box-demo"
          options={[0, 1, 2, 3]}
          getOptionLabel={(option) => JSON.stringify(option)}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Ingredients" variant="outlined" />
          )}
        />
      ) : null}
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
