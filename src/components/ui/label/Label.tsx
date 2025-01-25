import React from "react";
import classes from "./Label.module.css";

const Label: React.FC<{
  children: string;
}> = (props) => {
  return <label className={classes.label}>{props.children}</label>;
};

export default Label;