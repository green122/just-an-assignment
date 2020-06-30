import React, {useCallback, useState} from 'react';
import {Select, Button, MenuItem, Grid, InputLabel, AppBar, Toolbar, IconButton, Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

export const useStyles = makeStyles(() => ({
  appbar: {
    backgroundColor: "white",
    boxShadow: "none",
    height: 90,
    borderBottom: "1px solid lightgray",
    marginBottom: 24,
    justifyContent: "center"
  },
  toolbar: {
    justifyContent: "space-between"
  },
  link: {
    textDecoration: "none",
    color: "#4A4A4A",
    marginRight: 24,
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

export function Header() {
  const classes = useStyles();
  return (
    <AppBar className={classes.appbar} position="static">
      <Toolbar className={classes.toolbar}>
        <Box ml={5}>
          <img src="https://static.auto1.com/@auto1/auto1-platform/4.83.0/img/logo.png"/>
        </Box>
        <Box>
          <Link className={classes.link} to="" color="inherit">Purchase</Link>
          <Link className={classes.link} to="" color="inherit">My order</Link>
          <Link className={classes.link} to="" color="inherit">Sell</Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
