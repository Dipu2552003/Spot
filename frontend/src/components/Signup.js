import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    bio: "",
    imgUrl: "",
    prn: "",
  });
  let navigate = useNavigate();

  const handleStepChange = () => {
    // if (step === 1) {
    //   // Perform validation for step 1
    //   if (!formData.name || !formData.email || !formData.password || !formData.cpassword) {
    //     alert('Please fill in all fields for step 1.');
    //     return;
    //   }
    // }

    setStep(step === 1 ? 2 : 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, bio, imgUrl, prn } = formData;

    // API call for user creation (unchanged from your code)
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, bio, imgUrl, prn }),
    });

    const json = await response.json();
    console.log(json);

    if (json.authtoken) {
      // Save the auth token and redirect (unchanged from your code)
      localStorage.setItem("token", json.authtoken);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderImage = () => {
    if (step === 2 && formData.imgUrl) {
      return (
        <img
          src={formData.imgUrl}
          alt="Profile"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
      );
    }
    return null;
  };

  return (
    <div className="container flex">
      <div className="facebook-page flex">
        <div className="text">
          <h1>SPOT</h1>

          <p>
            {step === 2
              ? "Upload your profile picture:"
              : "show you how to connect with the world"}
          </p>

          {step === 2 && formData.imgUrl ? (
  <img
    src={formData.imgUrl}
    alt="Profile"
    style={{ borderRadius: "50%", width: "300px" }}
  />
) : (
  step === 2 && (
    <div
      style={{
        width: "200px",
        height: "200px",
        backgroundColor: "grey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
      }}
    >
      No Image
    </div>
  )
)}

        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                onChange={onChange}
                name="name"
                value={formData.name}
              />
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={onChange}
                name="email"
                value={formData.email}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={onChange}
                name="password"
                value={formData.password}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                onChange={onChange}
                name="cpassword"
                value={formData.cpassword}
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <input
                type="text"
                placeholder="Hey spill some beans bio yourself"
                onChange={onChange}
                name="bio"
                value={formData.bio}
                required
              />
              <input
                type="text"
                placeholder="url"
                onChange={onChange}
                name="imgUrl"
                value={formData.imgUrl}
                required
              />
              <input
                type="text"
                placeholder="prn"
                onChange={onChange}
                name="prn"
                value={formData.prn}
                required
              />
            </div>
          )}

          <div className="link">
            {step === 1 ? (
              <button
                type="button"
                className="login"
                onClick={handleStepChange}
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                className="login"
                onClick={handleStepChange}
              >
                Previous
              </button>
            )}
            {step === 2 && (
              <button type="button" className="login" onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
