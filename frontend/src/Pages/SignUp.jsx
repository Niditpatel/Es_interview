import axios from "axios";
import { useEffect, useState } from "react";

import APP_URL from "../config";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name:'',
    email: "",
    password: "",
  });

  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${APP_URL}/signup`, data);
      localStorage.setItem("token", res.data.token);
      navigate('/blog-list')
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="group-container">
        <form onSubmit={handleSubmit}>
        <label>Name</label>
          <input
            placeholder="Enter Your Name..."
            name="name"
            value={data.name}
            onChange={onchange}
          ></input><br/>
            <label>Email</label>
          <input
            placeholder="Enter Your Email..."
            name="email"
            type="email"
            value={data.email}
            onChange={onchange}
          ></input><br/>
          <label>Passwod</label>
          <input
            placeholder="Enter Your apssword..."
            type="password"
            name="password"
            value={data.password}
            onChange={onchange}
          ></input><br/>
          <button type="submit">Sign up</button>
          <div>already have account <Link to={'/'}>login</Link></div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
