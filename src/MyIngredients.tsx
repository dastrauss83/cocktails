import React, { useEffect, useState } from "react";
import firebase from "firebase";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { Delete } from "@material-ui/icons";
import { useStyles } from "./useStyles";
import {
  DragDropContext,
  Droppable,
  DropResult,
  Draggable,
} from "react-beautiful-dnd";

type MyIngredientsProps = {
  allIngredients: string[];
  currentUser: any;
  screenState: string;
  setScreenState: any;
  userIngredients: string[];
  setUserIngredients: any;
};

export const MyIngredients: React.FC<MyIngredientsProps> = ({
  allIngredients,
  currentUser,
  screenState,
  setScreenState,
  userIngredients,
  setUserIngredients,
}) => {
  const classes = useStyles();

  const [filteredUserIngredients, setFilteredUserIngredients] = useState<
    string[]
  >([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    () => setFilteredUserIngredients(userIngredients),
    [userIngredients, setUserIngredients]
  );

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
    setUserIngredients(data.myIngredients);
  };

  const handleDelete = async (ingredient: string) => {
    let userData = await getCurrentUserData();
    const index = userData.myIngredients.indexOf(ingredient);
    const tempMyIngredients = [...userData.myIngredients];
    tempMyIngredients.splice(index, 1);
    await firebaseUser.update({
      myIngredients: tempMyIngredients,
    });
    const response = await firebaseUser.get();
    const data = response.data();
    setUserIngredients(data.myIngredients);
  };

  const handleSearch = (event: any, newValue: string | string[]) => {
    if (newValue.length === 0) {
      setFilteredUserIngredients(userIngredients);
      return;
    }
    if (Array.isArray(newValue)) {
      setFilteredUserIngredients(newValue);
    } else {
      setFilteredUserIngredients([newValue]);
    }
  };

  const handleOnDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(userIngredients);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    await firebaseUser.update({
      myIngredients: items,
    });
    setUserIngredients(items);
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
          value={userIngredients}
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
      {userIngredients.length > 0 ? (
        <Grid item>
          <Autocomplete
            multiple
            id="userIngredients"
            onChange={handleSearch}
            options={userIngredients}
            getOptionLabel={(option: string) => option}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search My Ingredients"
                variant="outlined"
              />
            )}
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
          />
        </Grid>
      ) : null}
      <Grid item>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="userIngredients">
            {(droppableProvided: any) => (
              <ul
                className="userIngredients"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <Container className={classes.cardGrid}>
                  <Grid
                    container
                    spacing={1}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {filteredUserIngredients.map(
                      (ingredient: string, index: number) => (
                        <Draggable
                          key={ingredient}
                          draggableId={ingredient}
                          index={index}
                        >
                          {(draggableProvided: any) => {
                            return (
                              <Grid item xs={10}>
                                <li
                                  ref={draggableProvided.innerRef}
                                  {...draggableProvided.draggableProps}
                                  {...draggableProvided.dragHandleProps}
                                >
                                  <Card className={`${classes.card} card`}>
                                    <CardContent
                                      className={classes.cardContent}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Typography variant="h5">
                                          {ingredient}
                                        </Typography>
                                        <Button
                                          onClick={() => {
                                            // e.stopPropagation();
                                            handleDelete(ingredient);
                                          }}
                                        >
                                          <Delete color="secondary" />
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </li>
                              </Grid>
                            );
                          }}
                        </Draggable>
                      )
                    )}
                    {droppableProvided.placeholder}
                  </Grid>
                </Container>
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
    </Grid>
  );
};
