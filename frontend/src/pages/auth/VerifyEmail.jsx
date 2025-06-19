import React, { useEffect, useState } from 'react';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '@/slices/authSlice';

const VerifyEmail = () => {
    const {signUpData}=useSelector((state)=>state.auth)
    const [otp, setOtp] = useState("");
    const navigate= useNavigate()
    const dispatch=useDispatch()
    console.log(signUpData,"ooooooooooo")

    useEffect(()=>{
      if(!signUpData)
      {
        navigate('/auth/signup')
      }
    },[signUpData,navigate])


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp({...signUpData,otp})).then((action)=>{
                if(action.payload.success)
                {
                    alert("Signup successfull")
                    navigate('/auth/login')
                }
                else{
                    alert(action.payload.message)
                }
        })
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4">Verify Your Email</h1>
                <p className="text-gray-600 text-sm text-center mb-6">
                    Enter the 6-digit code sent to your email.
                </p>

                <div className="flex justify-center">
                    <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={setOtp}
                        className="flex"
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>

                <Button
                    onClick={handleSubmit}
                    className="mt-6 w-full text-white py-2 rounded-lg transition"
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default VerifyEmail;
