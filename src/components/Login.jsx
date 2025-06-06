import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("rohit@gmail.com");
  const [password, setPassword] = useState("Rohit@123");
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async() =>{
      try{
        const res = await axios.post(BASE_URL + "/login", {
          emailId,
          password
        },{withCredentials: true})
        //console.log(res.data.data);
        dispatch(addUser(res.data.data))
        return navigate("/");
      }
      catch(err){
        setError(err?.response?.data || "Invalid Credentials")
        //console.log(err);       
      }
  }
  
  return (
    <div className="flex justify-center my-28">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">LOGIN</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input type="text" className="input" value={emailId} onChange={(e)=> setEmailId(e.target.value)}/>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input type="text" className="input" value={password} onChange={(e)=> setPassword(e.target.value)}/>
          </fieldset>
          <p className="text-red-700 flex justify-center">{error}</p>
          <div className="card-actions justify-center py-2">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
          <div>
            <p className="text-center text-sm">
            Don’t have an account?{" "}
            <a href="#" className="text-primary link link-hover">
              Sign Up
            </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
