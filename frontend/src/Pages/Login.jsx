import axios from "axios";
import { useEffect, useState } from "react";

import APP_URL from "../config";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${APP_URL}/login`, data);
      localStorage.setItem("token", res.data.token);
      navigate('/blog-list')
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token) navigate('/blog-list');
  },[]);

  return (
    <>
      <div className="group-container">
        <form onSubmit={handleSubmit}>
            <label>Email</label>
          <input
            placeholder="Enter Your Email..."
            type="email"
            value={data.email}
            onChange={onchange}
          ></input><br/>
          <label>Passwod</label>
          <input
            placeholder="Enter Your Email..."
            type="password"
            value={data.password}
            onChange={onchange}
          ></input><br/>
          <button type="submit">Login</button>

          <div>don't have account <Link to={'/sign-up'}>registere here</Link></div>
        </form>
      </div>
    </>
  );
};

export default Login;
