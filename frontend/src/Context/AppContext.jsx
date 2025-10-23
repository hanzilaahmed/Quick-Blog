// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from 'axios'
// import toast from 'react-hot-toast';
// import {useNavigate} from 'react-router-dom'

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;



// const AppContext = createContext();

// export const AppProvider = ({ children}) => {

//     const navigate = useNavigate();
//     const [ token , setToken] = useState(null);
//     const [ blogs , setBlogs] = useState([]);
//     const [ input , setInput] = useState("");

//     const fetchBlogs = async () => {
//         try {
//         const { data } = await axios.get("/api/blog/all");
//         data.success ? setBlogs(data.blogs) : toast.error(data.message)
//         } catch (error) {
//             toast.error(error.message)
//         }
//     };

//     useEffect(() => {
//         fetchBlogs();
//         const token = localStorage.getItem('token')
//         if (token) {
//             setToken(token);
//             axios.defaults.headers.common['Authorization'] = `${token}`; 
//          }
//     },[])

//     const value = {
//         axios , navigate , token , setToken , blogs , setBlogs , input , setInput
//     }

//     return(
//         <AppContext.Provider value={value}>
//             {children}
//         </AppContext.Provider>
//     )
// }
// export const useAppContext = () => {

//     return useContext(AppContext)
// };





import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      axios.defaults.headers.common["Authorization"] = `${savedToken}`;
    }
    setLoading(false);
  }, []);

  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
