import "./SignupOption.css";
import logo2 from "../assets/photos/logo.png";
import employeeImage from "../assets/photos/Esignup.png";
import customerImage from "../assets/photos/Csignup.png";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function SignupOption() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/esignup");
  };

  const handleCustomerClick = () => {
    navigate("/csignup");
  };

  return (
    <div className="flex flex-col relative ">
      <div className="bg-black z-50 w-full">
        <Navbar />
      </div>
      <div className="signupoption-container top-20">
        <div className="logo-wrapper">
          <img src={logo2} />
        </div>

        <div className="signup-content">
          <div className="signup-options">
            <div className="signup-option">
              <h2 className="option-title">
                <span className="highlight">Mechanic</span>
                <br />
                Sign up
              </h2>
              <button className="image-button" onClick={handleClick}>
                <img src={employeeImage} />
              </button>
            </div>

            <div className="signup-option">
              <h2 className="option-title">
                <span className="highlight">Customer</span>
                <br />
                Sign up
              </h2>
              <button className="image-button" onClick={handleCustomerClick}>
                <img src={customerImage} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupOption;
