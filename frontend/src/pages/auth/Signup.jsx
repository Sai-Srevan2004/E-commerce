import CommonForm from "@/components/common/CommonForm";
import { registerFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { sendOtp, setSignupData } from "@/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function SignUp() {
  const [formData, setFormData] = useState(initialState);
  const {isLoading}=useSelector((state)=>state.auth)

  const dispatch=useDispatch();
  const navigate=useNavigate()

  const onSubmit=(e)=>{
    e.preventDefault()
    console.log(formData)
    dispatch(setSignupData(formData))
  
    dispatch(sendOtp(formData.email)).then((action)=>{
      
      if(action.payload.success)
      { 
           toast.success(action.payload.message)
           navigate('/auth/verify-email')
      }
      else{
        toast.error(action.payload.message)
      }
    })
  }

  console.log(formData);

  if(isLoading)return <Loader/>

  return (
    <div className="mx-auto mt-[150px] w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default SignUp;