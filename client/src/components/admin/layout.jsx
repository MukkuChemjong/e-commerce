import React, { useState } from "react";
import Adminheader from "./header.jsx";
import Adminsidebar from "./sidebar";
import { Outlet } from "react-router-dom";

const Adminlayout = () => {
  const[ openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <Adminsidebar open={openSidebar} setOpen={setOpenSidebar} />

      <div className="w-full p-5 ">
        <Adminheader setOpen={setOpenSidebar} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Adminlayout;
