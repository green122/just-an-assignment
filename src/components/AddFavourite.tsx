import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Box, Button, Card, CardContent, CardMedia, List, ListItem, Typography} from "@material-ui/core";
import {useCardStyles} from "./Filters";
import {useFavorite} from "../hooks/useFavoutire";

interface AddFavouriteProps {
  stockNumber: string;
}

export function AddFavourite({stockNumber}: AddFavouriteProps) {
  const classes = useCardStyles();
  const {setFavorite, isFavoriteLoading, isFavourite} = useFavorite();
  return (
    <div className={classes.container}>
      If you like this car, click the button and save it in your collection of favourite items.
      <Button className={classes.button} onClick={() => setFavorite(stockNumber)} disabled={isFavoriteLoading}>
        {isFavourite(stockNumber) ? 'Remove from favourite' : 'Save to favorite'}
      </Button>
    </div>
  );
};
