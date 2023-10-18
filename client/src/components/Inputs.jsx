import React from 'react'

export const Inputs = ({ children, ph }) => {
    return (
        <div className='flex justify-center items-center'>
            <label htmlFor="firstname" className="my-4 text-sm text-white bg-transparent duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75">{children}</label>
            <input className="my-2 block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600" type="text" placeholder={ph} />
        </div>)
}

