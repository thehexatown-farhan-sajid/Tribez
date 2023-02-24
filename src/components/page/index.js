import React from "react";
import "./style.scss";

const Page = ({ children }) => {
  return (
    <>
      <div className="content">{children}</div>
    </>
  );
};

export default Page;
