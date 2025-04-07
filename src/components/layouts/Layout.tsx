import * as React from "react";
import { Fragment } from "react";
import Head from "./head/Head";
import LoadingScreen from "../ui/loadingScreen/LoadingScreen";
import useLoadingStore from "../../store/useLoadingStore";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { isLoading } = useLoadingStore();

  return (
    <Fragment>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Head />
          <main>{props.children}</main>
        </>
      )}
    </Fragment>
  );
};

export default Layout;
