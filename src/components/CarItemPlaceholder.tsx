import React from 'react';
import {Box, Card, CardContent, CardMedia} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const usesStyles = makeStyles({
  root: {
    display: "flex",
    marginBottom: 12,
    padding: 12,
    height: 75
  },
  cardContentImage: {
    display: "flex",
    width: 60,
    alignItems: "center",
    backgroundColor: "#EDEDED",
  },
  header: {
    width: 270,
    height: 30
  },
  content: {
    padding: "0 12px"
  },
  lineLong: {
    width: 270,
    height: 18
  },
  lineShort: {
    width: 130,
    height: 18
  }
})

const CarItemPlaceholder = () => {
  const classes = usesStyles();
  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent className={classes.cardContentImage}>
        <CardMedia
          component="div"
        />
      </CardContent>
      <CardContent className={classes.content}>
        <Box
          className={classes.header}
          mb={1}
          bgcolor="#EDEDED"
        />
        <Box
          className={classes.lineLong}
          mb={1}
          bgcolor="#EDEDED"
        />
        <Box
          mb={1}
          className={classes.lineShort}
          bgcolor="#EDEDED"
        />
      </CardContent>
    </Card>
  );
};

export default CarItemPlaceholder;
