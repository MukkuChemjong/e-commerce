import React, { Fragment } from "react";
import { Button } from "../ui/button";
import { CiLogout } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { toast } from "sonner";

function Adminheader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
    toast("Logged out Successfully!");
  }

  return (
    <div className="flex items-center justify-between border-b py-3">
      <Button onClick={() => setOpen(true)} className="sm:flex lg:hidden">
        <CiMenuBurger />
        <p className="sr-only">Menu</p>
      </Button>

      <div className="flex flex-1 justify-end">
        <Button onClick={() => handleLogout()}>
          <CiLogout />
          <p>Logout</p>
        </Button>
      </div>
    </div>
  );
}

export default Adminheader;
