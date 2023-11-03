import axios from "axios";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Newpassword.css"; 
import PropagateLoader from "react-spinners/PropagateLoader";


const Newpassword = (props) => {
  const { email } = props; 

  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [error,setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObject = new FormData();

    formDataObject.append("email", email);
    formDataObject.append("otp", otp);
    formDataObject.append("newPassword", newPassword);
    
    const header = {
      "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
    };

    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/customer/reset-password",
        formDataObject,
        { header }
      );

      console.log("OTP successful");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setError("Wrong OTP")
    }finally {
      setIsLoading(false); // Hide the loading spinner regardless of success or error
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              readOnly // Make the email field read-only
            />
          </div>
          <div>
            <label>OTP</label>
            <input
              type="text"
              placeholder="OTP"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            {error && <div className="error-message">{error}</div>}
          </div>
          <div>
            <label>New Password</label>
            <input
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          {isLoading &&  (
        <div className="loader-container">
          <PropagateLoader color={"#123abc"} loading={isLoading} size={15} />
        </div>)}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Newpassword;