import React from "react";
import classes from "./EntryLayout.module.css";

type LayoutProps = {
    children: React.ReactNode;
  };

const EntryLayout = (props: LayoutProps) => {
  return <main className={classes.main}>{props.children}</main>;
};

export default EntryLayout;