import { useAuth } from "../context/authContext";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import loadingPNG from '../images/loading-gif-png-5.gif';
import userPNG from '../images/user png.png'

export const Home = () => {

    const { user, logOut, loading } = useAuth();
    console.log(user);

    const navigate = useNavigate()

    const handleLogOut = async () => {      
        try {
            await logOut();
            navigate('/login');
            toast('Hasta Pronto!', {
                icon: '👋🏼',
            });
        } catch (error) {
            console.log(error.message)
        }
    }

    if (loading) return <div><img src={loadingPNG} alt="loading" width='80px' height='80px'/><h1>Cargando</h1></div>

    return(
        <div className="w-full max-w-xs m-auto text-black">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="bg-white rounded shadow-md px-8 pt-6 pb-8">
                <div className='flex justify-center'>
                    <h1>¡Bienvenid@!</h1>
                </div>
                <div className='flex justify-center font-bold'>
                    <h3>{user.displayName ? user.displayName : user.email}</h3>
                </div>
                <div className='flex justify-center'>
                    <img className="mt-2" src={user.photoURL || userPNG} alt="user" width='100px' height='100px'/>
                </div>
                
            </div>
            <div className='flex justify-center'>
                <button onClick={handleLogOut} className='my-4 font-bold flex justify-between text-gray-600'>Cerrar Sesión</button>
            </div>
        </div>
    )
};
