import { registerFormControls } from '@/config';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CreateForm from '@/common/createForm';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/store/auth-slice';
import { toast } from "sonner"

const initialState = {
  name: '',
  email: "",
  password: "",
};

const Authregister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(registerUser(formData)).then((data) => {
      if(data?.payload?.success){
        toast('Registration Successful!')
        navigate('/auth/login')
      } else {
        toast.error('Invalid Registration Information')
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="my-10">
        <h1 className="text-[30px] font-bold">Register an Account</h1>
        <p className="text-[20px]">
          Already have an account?
          <Link className="hover:cursor text-primary underline ml-2" to='/auth/login'>
            Sign in
          </Link>
        </p>
      </div>
      <CreateForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Sign in"}
      />
    </div>
  );
};

export default Authregister;