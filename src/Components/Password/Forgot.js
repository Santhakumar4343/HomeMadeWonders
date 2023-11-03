import axios from "axios";
import { useState } from "react";
import "./Forgot.css";
import Newpassword from "./Newpassword"; 
import PropagateLoader from "react-spinners/PropagateLoader"; // Import the loading spinner component

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showNewPasswordFields, setShowNewPasswordFields] = useState(false); 
  const [forgot,setforgot] = useState(true);
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }
    const formDataObject = new FormData();
    formDataObject.append("email", email);

    const header = {
      "Content-Type": "multipart/form-data",
    };

    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/customer/send-otp",
        formDataObject,
        { headers: header } // Fix header key here
      );

      console.log("otp sent successfully");
      if (response.status === 200) {
        // Show the Newpassword fields
        setShowNewPasswordFields(true);
        setforgot(false)
      }
    } catch (error) {
      console.error("Error:", error);
      setError("wrong email id");
    } finally {
      setIsLoading(false); // Hide the loading spinner regardless of success or error
    }
  };

  return (
    <div className="forgotcontainer">
     { forgot && <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <div className="error-message">{error}</div>}
        </div>
        {isLoading &&  (
        <div className="loader-container">
          <PropagateLoader color={"#123abc"} loading={isLoading} size={15} />
        </div>)}

        <button type="submit">Submit</button>
      </form>}
      
      {/* Conditional rendering of Newpassword fields */}
      {showNewPasswordFields && <Newpassword email={email} />}
    </div>
  );
};

export default Forgot;