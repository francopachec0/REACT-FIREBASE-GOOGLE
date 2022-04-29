import React, { useState } from 'react'
import { useAuth } from '../context/authContext'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const { login } = useAuth();
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
            navigate('/')
            toast.success('Logueado Correctamente!')
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

    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <div>
                {error && <p>{error}</p>}
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' placeholder='youremail@example.com' onChange={handleChange}/>

                <label htmlFor="password">Contraseña</label>
                <input type="password" name='password' placeholder='******' id='password' onChange={handleChange}/>

                <button>Iniciar Sesión</button>
            </form>
        </div>
    )
}

