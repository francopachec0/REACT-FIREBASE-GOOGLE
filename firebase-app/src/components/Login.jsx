import React, { useState } from 'react'
import { useAuth } from '../context/authContext'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from './Alert';
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";

export const Login = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const { login, loginWithGoogle, loginWithFacebook, loginWithGitHub, resetPassword } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState();

    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(user.email, user.password);
            navigate('/');
            toast.success('Logueado Correctamente!');
        } catch (error) {
            //console.log(error.message)
            //console.log(error.code)
            if (error.code === 'auth/user-not-found') {
                setError('Usuario no encontrado.')
                toast.error('Usuario no encontrado.')
            } else if (error.code === 'auth/wrong-password') {
                setError('Contraseña incorrecta.')
                toast.error('Contraseña incorrecta.')
            } else if (error.code === 'auth/invalid-email') {
                setError('Email invalido.')
                toast.error('Email invalido.')
            }
        }
    }

    const handleLoginGoogle = async () => {
        try {
            await loginWithGoogle();
            navigate('/');
            toast.success('Logueado Correctamente!');
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleLoginFacebook = async () => {
        try {
            await loginWithFacebook();
            navigate('/');
            toast.success('Logueado Correctamente!');
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleLoginGitHub = async () => {
        try {
            await loginWithGitHub();
            navigate('/');
            toast.success('Logueado Correctamente!');
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleReset = async () => {
        if (!user.email) return setError('Ingresa un Email para continuar.')
        try {
            await resetPassword(user.email)
            toast('Mail de recuperación enviado!', {
                icon: '📨',
            });
        } catch (error) {
            setError(error.message);
        }
        
    }

    return (
        <div className='w-full max-w-xs m-auto'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <div>
                {error && <Alert message={error}/>}
            </div>

            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4'>
                <div className="mb-4">
                    <label htmlFor="email" className='block text-gray-600 text-sm font-bold mb-2'>Email</label>
                    <input type="email" name='email' placeholder='youremail@example.com' onChange={handleChange} className='shadow appearance-none rounded w-full py-2 px3 text-gray-700 text-center'/>
                </div>
                
                <div className="mb-4">
                    <label htmlFor="password" className='block text-gray-600 text-sm font-bold mb-2'>Contraseña</label>
                    <input type="password" name='password' placeholder='******' id='password' onChange={handleChange} className='shadow appearance-none rounded w-full py-2 px3 text-gray-700 text-center'/>
                </div>
                <div className='flex justify-center'>
                    <button className='bg-blue-400 text-white rounded text-sm font-medium py-1 px-2 text-center hover:bg-blue-500'>Iniciar Sesión</button>
                </div>
                
            </form>

            <div>
                <a href='#!' onClick={handleReset} className='my-4 text-sm flex justify-center text-gray-600'>¿Olvidaste tu contraseña?</a>
            </div>

            <div>
                <p className='my-4 text-sm flex justify-between text-gray-600'>¿No tienes cuenta? <Link to='/register'>Regístrate</Link></p>
            </div>

            <div className='flex justify-center'>
                <button onClick={handleLoginGoogle} className='flex text-gray-600 font-bold justify-between w-full bg-white rounded py-2 px-5 hover:bg-gray-200'>Logueate con Google <FaGoogle color='#f48c06' size={18} className='mt-1 ml-3'/></button>
            </div>

            <div className='flex justify-center'>
                <button onClick={handleLoginFacebook} className='flex text-gray-600 font-bold justify-between bg-white rounded py-2 px-5 mt-2 w-full hover:bg-gray-200'>Logueate con Facebook <FaFacebookF color='#1d3557' size={18} className='mt-1 ml-3'/></button>
            </div>

            <div className='flex justify-center'>
                <button onClick={handleLoginGitHub} className='flex text-gray-600 font-bold justify-between bg-white rounded py-2 px-5 mt-2 w-full hover:bg-gray-200'>Logueate con GitHub <FaGithub color='#343a40' size={18} className='mt-1 ml-3'/></button>
            </div>
            
        </div>
    )
}

