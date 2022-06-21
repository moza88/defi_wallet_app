import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  // Style nested HTML elements so that
  // long-form content doesn't have to use
  // components to match MUI style
  root: {
    ...theme.typography.body1,
    "& h1": {
      ...theme.typography.h4,
      fontWeight: 600,
    },
    "& h2": {
      ...theme.typography.h5,
      fontWeight: 600,
    },
    "& h3": {
      ...theme.typography.h6,
      fontWeight: 600,
    },
    "& a": {
      color: theme.palette.primary.main,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
}));

function LongContent(props) {
  const classes = useStyles();

  return <div className={classes.root}>{props.children}</div>;
}

export default LongContent;
