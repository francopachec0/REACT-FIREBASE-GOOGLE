import React, { useState } from 'react'
import { useAuth } from '../context/authContext'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Register = () => {

    const [user, setUser] = useState({
        email: '',
        password: '',
        passwordConfirm: ''
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
            await signUp(user.email, user.password && user.passwordConfirm);
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
            } else if (!user.passwordConfirm) {
                setError('Debes confirmar tu contraseña.')
                toast.error('Debes confirmar tu contraseña.')
            } else if ( user.password !== user.passwordConfirm) {
                setError('Las contraseñas no coinciden.')
                toast.error('Las contraseñas no coinciden.')
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

                <label htmlFor="password">Confirma tu Contraseña</label>
                <input type="password" name='passwordConfirm' placeholder='******' id='passwordConfirm' onChange={handleChange}/>

                <button>Registrarse</button>
            </form>
        </div>
    )
}
