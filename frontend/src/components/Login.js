


import React, {useState} from 'react'
import { useNavigate  } from 'react-router-dom'
import { gapi } from "gapi-script";
import "./css/Login.css"
import {
  Link, Navigate
} from "react-router-dom";


const Login = () => {
  const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let navigate = useNavigate ();
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
    
        if (!response.ok) {
          const errorData = await response.json(); // Assuming your server returns an error message
          alert(`Error: ${errorData.message}`);
          return;
        }
    
        const json = await response.json();
        if (json.authtoken) {
          localStorage.setItem('token', json.authtoken);
          navigate("/");
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred. Please try again.");
      }
    };
    

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
      <>
     
        <div className="container flex">
          <div className="facebook-page flex">
            <div className="text">
              <h1>SPOT</h1>
              <p>Connect with Knowledge on DoubtSpot - Your go-to platform for </p>
              <p>doubt solving. Join the community, ask questions,</p>
              <p> and explore a world of shared wisdom.</p>
            </div>
            <form  onSubmit={handleSubmit}>
              <input type="email" placeholder="Email or phone number"  value={credentials.email} onChange={onChange} id="email" name="email" required />
              <input type="password" placeholder="Password"  value={credentials.password} onChange={onChange} id="email" name="password"  required />
              <div className="link">
                <button type="submit" className="login">
                  Login
                </button>
                <a href="#" className="forgot">
                  Forgot password?
                </a>
              </div>
              <hr />
              <Link className="button" to="/signup">
                <a href="#">Create new account</a>
              </Link>
            </form>
          </div>
        </div>
        </>
      );
    }
    

export default Login