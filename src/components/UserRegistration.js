import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    accountHolderName: "",
    mobileNumber: "",
    gender: "",
    dateOfBirth: "",
    password: "",
    email: "",
    communicationAddress: "",
    pan: ""
  });

  const [formErrors, setFormErrors] = useState({
    accountHolderName: "",
    mobileNumber: "",
    gender: "",
    dateOfBirth: "",
    password: "",
    email: "",
    communicationAddress: "",
    pan: ""
  });

  const [formValid, setFormValid] = useState({
    accountHolderName: false,
    mobileNumber: false,
    gender: false,
    dateOfBirth: false,
    password: false,
    email: false,
    communicationAddress: false,
    pan: false
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8086/userService/users", formData)
      .then((response) => {
        setSuccessMessage("Registered Successfully");
        setErrorMessage("");
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
      case "pan":
        const re = /^.{3,50}$/;
        if (val === "") {
          errorsCopy.pan = "PAN is required";
          formValidCopy.pan = false;
        } else if (re.test(val) === false) {
          errorsCopy.pan = "Invalid PAN";
          formValidCopy.pan = false;
        } else {
          errorsCopy.pan = "";
          formValidCopy.pan = true;
        }
        break;
      case "communicationAddress":
        const rex = /^.{3,50}$/;
        if (val === "") {
          errorsCopy.communicationAddress = "Address is required";
          formValidCopy.communicationAddress = false;
        } else if (rex.test(val) === false) {
          errorsCopy.communicationAddress = "Invalid Address";
          formValidCopy.communicationAddress = false;
        } else {
          errorsCopy.communicationAddress = "";
          formValidCopy.communicationAddress = true;
        }
        break;
      case "email":
        const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (val === "") {
          errorsCopy.email = "Email is required";
          formValidCopy.email = false;
        } else if (reg.test(val) === false) {
          errorsCopy.email = "Invalid Email";
          formValidCopy.email = false;
        } else {
          errorsCopy.email = "";
          formValidCopy.email = true;
        }
        break;
      case "dateOfBirth":
        const currentDate = new Date();
        const openDate = new Date(val);

        if (openDate >= currentDate) {
          errorsCopy.dateOfBirth = "Date of Birth should be past date";
          formValidCopy.dateOfBirth = false;
        } else {
          errorsCopy.dateOfBirth = "";
          formValidCopy.dateOfBirth = true;
        }
        break;
      case "accountHolderName":
        const regx = /^(?!.*\s{2,})([A-Z][a-zA-Z]{2,49}(\s[A-Z][a-zA-Z]{2,49})*)?$/;
        if (val === "") {
          errorsCopy.accountHolderName = "Account Name is required";
          formValidCopy.accountHolderName = false;
        } else if (regx.test(val) === false) {
          errorsCopy.accountHolderName = "Invalid Account Name";
          formValidCopy.accountHolderName = false;
        } else {
          errorsCopy.accountHolderName = "";
          formValidCopy.accountHolderName = true;
        }
        break;
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
        <h3 className="text-center title mt-5">User Registration</h3>
        <div className="container text-start bg color">
          <div className="row p-3">
            <div className="col color">
              <form onSubmit={handleSubmit}>
                <div className="mb-2 mt-2 color">
                  <label className="form-label">
                    <b>Account Holder Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="accountHolderName"
                    value={formData.accountHolderName}
                    placeholder="Eg: Johnny Depth"
                    onChange={handleChange}
                  />
                  {formErrors.accountHolderName ? (
                    <p className="text-danger">{formErrors.accountHolderName}</p>
                  ) : null}
                </div>

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
                    <b>Gender</b>
                  </label>
                  <select
                    className="form-control"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="Select Gender">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="mb-2 color">
                  <label className="form-label">
                    <b>Date of Birth</b>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                  {formErrors.dateOfBirth ? (
                    <p className="text-danger">{formErrors.dateOfBirth}</p>
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

                <div className="mb-2 color">
                  <label className="form-label">
                    <b>Email</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    placeholder="Eg: xyz@gmail.com"
                    onChange={handleChange}
                  />
                  {formErrors.email ? (
                    <p className="text-danger">{formErrors.email}</p>
                  ) : null}
                </div>

                <div className="mb-2 mt-2 color">
                  <label className="form-label">
                    <b>Communication Address</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="communicationAddress"
                    value={formData.communicationAddress}
                    placeholder="Eg: 2/123 IT Park Chandigarh"
                    onChange={handleChange}
                  />
                  {formErrors.communicationAddress ? (
                    <p className="text-danger">{formErrors.communicationAddress}</p>
                  ) : null}
                </div>

                <div className="mb-2 mt-2 color">
                  <label className="form-label">
                    <b>PAN</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="pan"
                    value={formData.pan}
                    placeholder="Eg: BBUPC0954N"
                    onChange={handleChange}
                  />
                  {formErrors.pan ? (
                    <p className="text-danger">{formErrors.pan}</p>
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

export default UserRegistration;
