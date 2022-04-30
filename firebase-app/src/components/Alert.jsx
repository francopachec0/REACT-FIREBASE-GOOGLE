import React from 'react'

export const Alert = ({message}) => {
    return (
        <div className='bg-red-200 border border-red-700 text-red-700 px-4 py-3 rounded mb-3 text-center'>
            <span className='sm:inline-block'>{message}</span>
        </div>
    )
}
