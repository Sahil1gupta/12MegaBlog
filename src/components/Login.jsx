import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../features/authSlice/authSlice";

import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errors, setError] = useState(" ");

    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data)
        setError(" ");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div className="flex items-center justify-center w-full">
            <div
                className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {errors && <p className="text-red-600 mt-8 text-center">{errors}</p>}
                <form onSubmit={handleSubmit(onSubmit) }className='mt-8'>
                <div className="space-y-5">
                    <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true, 
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Email address must be a valid address",
                              }
                        })}
                        className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                    />
                    
                    <Input label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password",{required:true})}
                    className={`form-input ${errors.password ? 'border-red-500' : ''}`}
                    />
                    
                    <button
                    type="Submit"
                    className="w-full"
                    >Sing in</button>
           
                </div>
            </form>
        </div>
    </div >
  )
}

export default Login
