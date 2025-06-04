import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async() =>{
      try{
        const res = await axios.post("http://localhost:7777/login", {
          emailId,
          password
        },{withCredentials: true})
      }
      catch(err){
        console.log(err);       
      }
  }
  
  return (
    <div className="flex justify-center my-28">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">LOGIN</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Id</legend>
            <input type="text" className="input" value={emailId} onChange={(e)=> setEmailId(e.target.value)}/>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input type="text" className="input" value={password} onChange={(e)=> setPassword(e.target.value)}/>
          </fieldset>
          <div className="card-actions justify-center py-4">
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
