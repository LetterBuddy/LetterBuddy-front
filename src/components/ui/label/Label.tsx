import React from "react";
import classes from "./Label.module.css";

const Label: React.FC<{
  children: string;
  color?: string;
}> = ({ children, color }) => {
  return (
    <label className={classes.label} style={color ? { color } : undefined}>
      {children}
    </label>
  );
};

export default Label;
