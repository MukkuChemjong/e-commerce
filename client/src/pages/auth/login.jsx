import CreateForm from "@/common/createForm";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginFormControls } from "@/config";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";


const initialState = {
  email: "",
  password: "",
};

const Authlogin = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if(data?.payload?.success){
        toast('Registration Successful!')
      } else {
        toast.error('Invalid Registration Information')
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="my-10">
        <h1 className="text-[30px] font-bold">Login to your Account</h1>
        <p className="text-[20px]">
          Don't have an account?
          <Link className="hover:cursor text-primary underline ml-2" to='/auth/register'>
            Create an account
          </Link>
        </p>
      </div>
      <CreateForm
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Sign in"}
      />
    </div>
  );
};

export default Authlogin;
