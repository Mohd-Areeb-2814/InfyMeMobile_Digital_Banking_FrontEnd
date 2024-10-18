import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: ""
  });

  const [formErrors, setFormErrors] = useState({
    mobileNumber: "",
    password: ""
  });

  const [formValid, setFormValid] = useState({
    mobileNumber: false,
    password: false
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const saveBooleanToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8086/userService/users/login", formData)
      .then((response) => {

        const newStatus = !isUserLoggedIn;

        setIsUserLoggedIn(newStatus);
        saveBooleanToLocalStorage('isUserLoggedIn', newStatus);
        
        setSuccessMessage("Login Successfully");
        setErrorMessage("");

        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data);
        setErrorMessage(`Error ${error.response.data.errorCode}: ${error.response.data.errorMessage}`);
        setSuccessMessage("");
      });
  };

  const handleChange = (event) => {
    const field = event.target.name;
    const val = event.target.value;

    setFormData({ ...formData, [field]: val });

    let errorsCopy = { ...formErrors };
    let formValidCopy = { ...formValid };

    switch (field) {
      case "password":
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,15}$/;
        if (val === "") {
          errorsCopy.password = "Password is required";
          formValidCopy.password = false;
        } else if (regex.test(val) === false) {
          errorsCopy.password = "Invalid password";
          formValidCopy.password = false;
        } else {
          errorsCopy.password = "";
          formValidCopy.password = true;
        }
        break;
      case "mobileNumber":
        const regexm = /^[0-9]{10}$/;
        if (val === "") {
          errorsCopy.mobileNumber = "Mobile number is required";
          formValidCopy.mobileNumber = false;
        } else if (regexm.test(val) === false) {
          errorsCopy.mobileNumber = "Invalid mobile number";
          formValidCopy.mobileNumber = false;
        } else {
          errorsCopy.mobileNumber = "";
          formValidCopy.mobileNumber = true;
        }
        break;
      default:
        break;
    }

    formValidCopy.buttonActive =
      formValidCopy.password &&
      formValidCopy.mobileNumber;

    setFormValid({...formValidCopy});
    setFormErrors({...errorsCopy});
  };
  return (
    <>
      <div className="Bgimage">
        <Navbar />
        <h3 className="text-center title mt-5">User Login</h3>
        <div className="container text-start bg color">
          <div className="row p-3">
            <div className="col color">
              <form onSubmit={handleSubmit}>
                <div className="mb-2 color">
                  <label className="form-label">
                    <b>Mobile Number</b>
                  </label>
                  
                    <input
                      type="text"
                      className="form-control"
                      name="mobileNumber"
                      placeholder="Eg: 9090909090"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                    />
                    {formErrors.mobileNumber ? (
                      <p className="text-danger">
                        {formErrors.mobileNumber}
                      </p>
                    ) : null}
                  
                </div>

                <div className="mb-2 mt-2 color">
                  <label className="form-label">
                    <b>Password</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    placeholder="Eg: Xyz@123"
                    onChange={handleChange}
                  />
                  {formErrors.password ? (
                    <p className="text-danger">{formErrors.password}</p>
                  ) : null}
                </div>

                <div class="d-grid col-6 mx-auto">
                  <button
                    type="submit"
                    className="btn mb-2 mt-2 text-white btn-color"
                    disabled={!(formValid.buttonActive)}
                  >
                    Login
                  </button>
                  {successMessage ? <div className="text-success">{successMessage}</div> : null}
                  {errorMessage ? (
                    <div className="text-danger">{errorMessage}</div>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UserLogin;
