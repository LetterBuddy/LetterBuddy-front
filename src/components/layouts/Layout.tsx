import * as React from "react";
import Head from "./head/Head";

type LayoutProps = {
  children: React.ReactNode,
};

const Layout = (props: LayoutProps) => {
  return (
    <>
      <Head />
      <main
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {props.children}
      </main>
    </>
  );
};

export default Layout;
