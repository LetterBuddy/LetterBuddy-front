import * as React from "react";
import { Fragment } from "react";
import Head from "./head/Head";


type LayoutProps = {
  children: React.ReactNode,
};

const Layout = (props: LayoutProps) => {
  return (
    <Fragment>
      <Head />
      {/* <main>{props.children}</main> */}
    </Fragment>
  );
};

export default Layout;