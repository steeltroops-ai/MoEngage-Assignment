import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'
function PasswordInput({value, onChange, placeholder}) {
    const [ispassword,setIsPassword] = useState(false);

    const toggleShowPassword = () => {
        setIsPassword(!ispassword);
    }


  return (
    <div>

        <input 
        value={value}
        onChange={onChange}
        type={ispassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className='w-full border rounded p-2 font-serif text-black'
        />

        {ispassword ? <FaRegEye 
        size={22}
        className="text-blue-600 cursor-pointer relative left-80 bottom-8"
        onClick={() => toggleShowPassword()} /> 
        :
        <FaRegEyeSlash
        size={22}
        className='text-gray-600 cursor-pointer relative left-80 bottom-8'
        onClick={() => toggleShowPassword()} />
        }

    </div>
  )
}

export default PasswordInput