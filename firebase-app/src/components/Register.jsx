import React, { useState } from 'react'
import { useAuth } from '../context/authContext'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { Alert } from './Alert';

export const Register = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const { signUp } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState();

    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signUp(user.email, user.password);
            navigate('/')
            toast.success('Registrado Correctamente!')
        } catch (error) {
            //console.log(error.code)
            if (error.code === 'auth/invalid-email') {
                setError('Correo Inválido.')
                toast.error('Correo Inválido.')
            } else if (error.code === 'auth/weak-password') {
                setError('Contraseña débil. Debe contener al menos 6 caracteres.')
                toast.error('Contraseña débil. Debe contener al menos 6 caracteres.')
            } else if (error.code === 'auth/email-already-in-use') {
                setError('Email ya registrado anteriormente.')
                toast.error('Email ya registrado anteriormente.')
            }
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
                    <input className='shadow appearance-none rounded w-full py-2 px3 text-gray-700 text-center' type="email" name='email' placeholder='youremail@example.com' onChange={handleChange}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className='block text-gray-600 text-sm font-bold mb-2'>Contraseña</label>
                    <input className='shadow appearance-none rounded w-full py-2 px3 text-gray-700 text-center' type="password" name='password' placeholder='******' id='password' onChange={handleChange}/>
                </div>

                <div className='flex justify-center'>
                    <button className='bg-blue-400 text-white rounded text-sm font-medium py-1 px-2 text-center hover:bg-blue-500'>Registrarse</button>
                </div>
            </form>
            <div>
                <p className='my-4 flex justify-between text-gray-600'>¿Ya tienes una cuenta? <Link to='/login'>Inicia Sesión</Link></p>
            </div>
        </div>
    )
}
