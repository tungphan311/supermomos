import React from "react";
import NavBar from "./navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}
