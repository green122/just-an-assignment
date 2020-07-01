import React from 'react';
import {AppBar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {colors} from "../constants/colors.constants";

export const useStyles = makeStyles(() => ({
  footer: {
    backgroundColor: "white",
    boxShadow: "none",
    height: 90,
    borderTop: "1px solid lightgray",
    justifyContent: "center",
    alignItems: "center",
    color: colors.black
  }
}));

export function Footer() {
  const classes = useStyles();
  return (
    <AppBar className={classes.footer} position="static">
      ©AUTO1 - 2018
    </AppBar>
  );
};
