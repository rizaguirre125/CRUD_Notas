import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext"

function ProtectedRoute() {
  const {user, loading, isAuthenticated} = useAuth();
  console.log(user, loading, isAuthenticated);
  
  if(loading) return(
    <h1>Loading...</h1>
  )
  if(!loading && !isAuthenticated) return <Navigate to='/login' replace/>
  return (
    <Outlet />
  )
}

export default ProtectedRoute