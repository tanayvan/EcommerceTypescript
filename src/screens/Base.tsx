import React from "react";
import Navbar from "../components/Navbar";

interface Props {
  children: React.ReactNode;
}
const Base: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Base;
