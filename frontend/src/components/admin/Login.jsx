// import React, { useState } from 'react'

// const Login = () => {

//   const [ email , setEmail] = useState('')
//   const [ password , setPassword] = useState('')

//   const handleSubmit = async(e) =>{
//     e.preventDefault
//   }
//   return (
//     <div className='flex items-center justify-center h-screen'>
//       <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
//         <div className='flex flex-col items-center justify-center'>
//           <div className='w-full py-6 text-center'>
//             <h1 className='text-3xl font-bold'>
//               <span className='text-primary'>Admin</span> Login
//             </h1>
//             <p className='font-light'>
//               Enter your details to access the admin panel
//             </p>
//           </div>
//           <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
//             <div className='flex flex-col'>
//               <label> Email </label>
//               <input onChange={e => setEmail(e.target.value)} value={email} className='border-b-2 border-gray-300 p-2 outline-none mb-6' type="text" placeholder='Enter Your Email' name="" id="email" />
//             </div>

//              <div className='flex flex-col'>
//               <label> Password </label>
//               <input onChange={e => setPassword(e.target.value)} value={password} className='border-b-2 border-gray-300 p-2 outline-none mb-6' type="password" placeholder='Enter Your Password' name="" id="password" />
//             </div>
//               <button type='submit' className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90'> Login </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login





import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/admin/login", { email, password });

      if (res.data.token) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common["Authorization"] = `${res.data.token}`;
        toast.success("Login successful!");
        navigate("/admin");
      } else {
        toast.error(res.data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Admin</span> Login
            </h1>
            <p className="font-light">
              Enter your details to access the admin panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 w-full sm:max-w-md text-gray-600">
            <div className="flex flex-col">
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                type="text"
                placeholder="Enter Your Email"
              />
            </div>

            <div className="flex flex-col">
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                type="password"
                placeholder="Enter Your Password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
