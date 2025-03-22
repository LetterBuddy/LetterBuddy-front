import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const EntryLayout = (props: LayoutProps) => {
  return (
    
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {props.children}
    </main>
  );
};

export default EntryLayout;
