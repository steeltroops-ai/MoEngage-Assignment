import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswrodInput';
import { validateEmail } from '../../Utils/Helper';
import axiosInstance from '../../Utils/AxiosInstance';


function Signup() {
  const[name, setName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[error,setError] = useState(null);

  const navigate = useNavigate();

  const handlesignup = async(e) => {
    e.preventDefault();
    
    if(!name){
      setError("Please enter your name");
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter valid email address");
      return;
    }
    if(!password){
      setError("Please enter the password");
      return;
    }

    setError("");
    
    // SignUp API cal
    try{
      const response = await axiosInstance.post("/create_account", {
          fullname: name,
          email: email,
          password: password,
      });
      //Handle successful registration response
      if(response.data && response.data.error){
          setError(response.data.message);
          return
      }

      if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken)
        navigate("/");
      }

  } catch (error) {
      //Handle Login error
      if(error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
      }else {
          setError("An unexpected error occurred. Please try again.");
      }


  }

  };
  

  return (
    <>
    <div className='flex justify-center items-center h-screen bg-gray-300'>
      <div className='flex flex-col rounded-2xl shadow-2xl shadow-black w-1/4 p-4'>
                <h1 className='text-xl font-semibold text-center'>
                SignUp
                </h1>

                <form 
                className='flex flex-col gap-2 w-full'
                onSubmit={handlesignup} >

                    <label className='text-left font-serif'>Name</label>

                    <input type='text' 
                    placeholder='Name' 
                    className='input-box p-2 font-serif text-black border rounded'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />

                    <label className='text-left font-serif'>Email</label>

                    <input type='text' 
                    placeholder='abc@gmail.com' 
                    className='input-box p-2 font-serif text-black border rounded'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className='text-left font-serif'>Create Password</label>

                    <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                    {/* if error than print  */}
                    {error && <p className='text-red-500 pb-1 text-md'>{error}</p>}

                    <button type='submit' 
                    className="bg-orange-700 p-2 rounded text-white active:bg-orange-800">
                    Create Account
                    </button>

                    <p>Already have account ?{" "}
                        <Link to={"/login"} 
                        className='text-orange-600 underline'>
                        Login
                        </Link>
                    </p>

                </form>
            </div>
    </div>
    </>
  )
}

export default Signup