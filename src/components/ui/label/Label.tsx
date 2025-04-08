import React from "react";
import classes from "./Label.module.css";

const Label: React.FC<{
  children: string;
  style?: React.CSSProperties;
}> = (props) => {
  return (
    <label className={classes.label} style={props.style}>
      {props.children}
    </label>
  );
};

export default Label;
