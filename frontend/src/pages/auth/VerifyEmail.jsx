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
import toast from 'react-hot-toast';

const VerifyEmail = () => {
    const { signUpData } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Redirect if no signup data
    useEffect(() => {
        if (!signUpData) {
            navigate('/auth/signup');
        }
    }, [signUpData, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        dispatch(signUp({ ...signUpData, otp }))
            .then((action) => {
                if (action.payload.success) {
                    toast.success("Signup successful");
                    navigate('/auth/login');
                } else {
                    toast.error(action.payload.message || "Something went wrong");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4">Verify Your Email</h1>
                <p className="text-gray-600 text-sm text-center mb-6">
                    Enter the 6-digit code sent to your email.
                </p>

                <form onSubmit={handleSubmit}>
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
                        type="submit"
                        disabled={loading || otp.length !== 6}
                        className={`mt-6 w-full text-white py-2 rounded-lg transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Verifying...
                            </div>
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default VerifyEmail;
