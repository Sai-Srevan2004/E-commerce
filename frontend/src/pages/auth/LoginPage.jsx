import CommonForm from "../../components/common/CommonForm";
import { loginFormControls } from "@/config";
import { login } from "@/slices/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData)).then((action) => {
      if (action.payload.success) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
      setFormData({ email: "", password: "" });
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 mt-[150px]">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/signup"
          >
            Register
          </Link>
        </p>
      </div>

      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />

      {/*New Button to Navigate to Home */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => navigate("/shop/home")}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
