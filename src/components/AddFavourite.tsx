import React from 'react';
import {Box, Button, Grid} from "@material-ui/core";
import {useCardStyles} from "./Filters";
import {useFavorite} from "../hooks/useFavourite";

interface AddFavouriteProps {
  stockNumber: number;
}

export function AddFavourite({stockNumber}: AddFavouriteProps) {
  const classes = useCardStyles();
  const {setFavorite, isFavoriteLoading, isFavourite} = useFavorite();
  return (
    <Box className={classes.contentContainer}>
      <span className={classes.contentText}>
      {isFavourite(stockNumber) ?
        'You can remove this car from you favourites'
        : 'If you like this car, click the button and save it in your collection of favourite items.'
      }
      </span>
      <Grid container justify="flex-end">
        <Button className={classes.button} onClick={() => setFavorite(stockNumber)} disabled={isFavoriteLoading}>
          {isFavourite(stockNumber) ? 'Remove' : 'Save'}
        </Button>
      </Grid>
    </Box>
  );
};
