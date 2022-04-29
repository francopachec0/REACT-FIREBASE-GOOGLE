import { useAuth } from "../context/authContext";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import loadingPNG from '../images/loading-gif-png-5.gif';

export const Home = () => {

    const { user, logOut, loading } = useAuth();
    console.log(user);

    const navigate = useNavigate()

    const handleLogOut = async () => {
        await logOut();
        navigate('/login');
    }

    if (loading) return <div><img src={loadingPNG} alt="loading" width='80px' height='80px'/><h1>Cargando</h1></div>

    return(
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <h1>¡Bienvenid@!</h1>
            <h3>{user.email}</h3>

            <button onClick={handleLogOut}>Cerrar Sesión</button>
        </div>
    )
};
