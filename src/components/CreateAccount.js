import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    bankName: "",
    balance: "",
    accountType: "",
    ifscCode: "",
    openingDate: "",
    userDTO: { mobileNumber: "" },
  });

  const [formErrors, setFormErrors] = useState({
    bankName: "",
    balance: "",
    accountType: "",
    ifscCode: "",
    openingDate: "",
    userDTO: { mobileNumber: "" },
  });

  const [formValid, setFormValid] = useState({
    bankName: false,
    balance: false,
    accountType: false,
    ifscCode: false,
    openingDate: false,
    userDTO: { mobileNumber: false },
    buttonActive: false,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8086/accountService/accounts", formData)
      .then((response) => {
        setSuccessMessage("Account Created Successfully");
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

    if (field === "mobileNumber") {
      setFormData({ ...formData, userDTO: { mobileNumber: val } });
    } else {
      setFormData({ ...formData, [field]: val });
    }

    let errorsCopy = { ...formErrors };
    let formValidCopy = { ...formValid };

    switch (field) {
      case "bankName":
        const regex = /^[A-Za-z]{5,15}$/;
        if (val === "") {
          errorsCopy.bankName = "Bank name is required";
          formValidCopy.bankName = false;
        } else if (regex.test(val) === false) {
          errorsCopy.bankName = "Invalid bank name";
          formValidCopy.bankName = false;
        } else {
          errorsCopy.bankName = "";
          formValidCopy.bankName = true;
        }
        break;
      case "balance":
        if (val === "") {
          errorsCopy.balance = "Balance is required";
          formValidCopy.balance = false;
        } else if (val < 0) {
          errorsCopy.balance = "Balance should not be negative";
          formValidCopy.balance = false;
        } else {
          errorsCopy.balance = "";
          formValidCopy.balance = true;
        }
        break;
      case "accountType":
        if (val  !== "Salary" && val !== "Savings" && val !== "Current") {
          errorsCopy.accountType = "Account Type should be from list";
          formValidCopy.accountType = false;
        } else {
          errorsCopy.accountType = "";
          formValidCopy.accountType = true;
        }
        break;
      case "ifscCode":
        const regexp = /^[A-Za-z0-9]{1,15}$/;
        if (val === "") {
          errorsCopy.ifscCode = "IFSC code is required";
          formValidCopy.ifscCode = false;
        } else if (regexp.test(val) === false) {
          errorsCopy.ifscCode = "Invalid IFSC code";
          formValidCopy.ifscCode = false;
        } else {
          errorsCopy.ifscCode = "";
          formValidCopy.ifscCode = true;
        }
        break;
      case "openingDate":
        const currentDate = new Date();
        const openDate = new Date(val);

        if (openDate > currentDate) {
          errorsCopy.openingDate = "Opening date should not be future date";
          formValidCopy.openingDate = false;
        } else {
          errorsCopy.openingDate = "";
          formValidCopy.openingDate = true;
        }
        break;
      case "mobileNumber":
        const regexm = /^[0-9]{10}$/;
        if (val === "") {
          errorsCopy.userDTO.mobileNumber = "Mobile number is required";
          formValidCopy.userDTO.mobileNumber = false;
        } else if (regexm.test(val) === false) {
          errorsCopy.userDTO.mobileNumber = "Invalid mobile number";
          formValidCopy.userDTO.mobileNumber = false;
        } else {
          errorsCopy.userDTO.mobileNumber = "";
          formValidCopy.userDTO.mobileNumber = true;
        }
        break;
      default:
        break;
    }

    formValidCopy.buttonActive =
      formValidCopy.bankName &&
      formValidCopy.balance &&
      formValidCopy.accountType &&
      formValidCopy.ifscCode &&
      formValidCopy.openingDate &&
      formValidCopy.userDTO.mobileNumber;

    setFormValid({...formValidCopy});
    setFormErrors({...errorsCopy});
  };
  return (
    <>
      <div className="Bgimage">
        <Navbar />
        <h3 className="text-center title mt-5">Create Account</h3>
        <div className="container text-start bg color">
          <div className="row p-3">
            <div className="col color">
              <form onSubmit={handleSubmit}>
                <div className="mb-2 mt-2 color">
                  <label className="form-label">
                    <b>Bank Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="bankName"
                    value={formData.bankName}
                    placeholder="Eg:bbmbank"
                    onChange={handleChange}
                  />
                  {formErrors.bankName ? (
                    <p className="text-danger">{formErrors.bankName}</p>
                  ) : null}
                </div>
                <div className="mb-2 mt-2 color">
                  <label className="form-label">
                    <b>Balance</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="balance"
                    value={formData.balance}
                    placeholder="Eg: 1000"
                    onChange={handleChange}
                  />
                  {formErrors.balance ? (
                    <p className="text-danger">{formErrors.balance}</p>
                  ) : null}
                </div>
                <div className="mb-2 mt-2 color">
                  <label className="form-label">
                    <b>Account Type</b>
                  </label>
                  <select
                    className="form-control"
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleChange}
                  >
                    <option value="Account Type">Select Account Type</option>
                    <option value="Savings">Savings</option>
                    <option value="Current">Current</option>
                    <option value="Salary">Salary</option>
                  </select>
                </div>
                <div className="mb-2 mt-2 color">
                  <label className="form-label">
                    <b>IFSC Code</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="ifscCode"
                    value={formData.ifscCode}
                    placeholder="Eg :IFSC1234"
                    onChange={handleChange}
                  />
                  {formErrors.ifscCode ? (
                    <p className="text-danger">{formErrors.ifscCode}</p>
                  ) : null}
                </div>
                <div className="mb-2 color">
                  <label className="form-label">
                    <b>Opening Date</b>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="openingDate"
                    value={formData.openingDate}
                    onChange={handleChange}
                  />
                  {formErrors.openingDate ? (
                    <p className="text-danger">{formErrors.openingDate}</p>
                  ) : null}
                </div>

                <div className="mb-2 color">
                  <label className="form-label">
                    <b>Mobile Number</b>
                  </label>
                  <div className="dis">
                    <select name="code" className="form-control code me-1">
                      <option value="+91">+91</option>
                    </select>
                    <input
                      type="text"
                      className="form-control"
                      name="mobileNumber"
                      placeholder="Eg:9090909090"
                      value={formData.userDTO.mobileNumber}
                      onChange={handleChange}
                    />
                    {formErrors.userDTO.mobileNumber ? (
                      <p className="text-danger">
                        {formErrors.userDTO.mobileNumber}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div class="d-grid col-6 mx-auto">
                  <button
                    type="submit"
                    className="btn mb-2 mt-2 text-white btn-color"
                    disabled={!(formValid.buttonActive)}
                  >
                    Create Account
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

export default CreateAccount;
