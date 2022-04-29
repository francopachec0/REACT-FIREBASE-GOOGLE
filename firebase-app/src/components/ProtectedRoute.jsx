import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import loadingPNG from '../images/loading-gif-png-5.gif'

export function ProtectedRoute({children}) {
    const { user, loading } = useAuth();

    if (loading) return <div><img src={loadingPNG} alt="loading" width='80px' height='80px'/><h1>Cargando</h1></div>
    if (!user) return <Navigate to='/login' />

    return <>{children}</>

}