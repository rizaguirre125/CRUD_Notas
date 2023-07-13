import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);
  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-bold my-2">Register</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500"> Username is required</p>
          )}
          <input
            type="text"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500"> Email is required</p>}
          <input
            type="text"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500"> Password is required</p>
          )}
          <button
            type="submit"
            className="w-full bg-zinc-500 hover:bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
          >
            Register
          </button>
        </form>
        <p className="flex gap-2 justify-between">
          {"Already have an account?"}
          <Link to="/login" className="text-sky-500">
            Sing in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
