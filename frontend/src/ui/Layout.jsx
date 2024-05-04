import React from "react";
import { Outlet, useParams } from "react-router-dom";

const Layout = () => {
  const x = useParams();
  console.log(x);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
