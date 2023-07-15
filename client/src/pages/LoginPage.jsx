import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { singin, errors: singinErrors, isAuthenticated } = useAuth();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    singin(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {singinErrors.map((error, i) => (
          <div className="bg-red-500 p-2" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-bold my-2">Inicio de sesión</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Correo electrónico"
          />
          {errors.email && <p className="text-red-500"> El correo electrónico que ingresaste no está conectado a una cuenta. Encuentra tu cuenta e inicia sesión.</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="text-red-500">La contraseña que ingresaste es incorrecta.</p>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-sm my-2"
          >
            Iniciar sesión
          </button>
        </form>
        <div className="flex items-center justify-center py-5 ">
          <Link to="/login/identify" className="text-sky-500">¿Olvidaste tu contraseña?</Link>
        </div>
        <hr className="solid"></hr>
        <div className="flex items-center justify-center py-5 ">
          <Link
            to="/register"
            className="w-75 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md "
          >
            Crear cuenta nueva
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
