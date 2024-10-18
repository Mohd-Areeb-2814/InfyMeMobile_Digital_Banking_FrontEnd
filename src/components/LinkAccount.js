import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const LinkAccount = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState({});

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };
  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    // Add your logic to handle the form submission here
    event.preventDefault();
    axios
      .post(
        "http://localhost:8086/accountService/account/" + mobileNumber,
        accountNumber,
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        setSuccessMsg("Linked Successfully !!!");
        setErrorMsg("");
      })
      .catch((error) => {
        setErrorMsg(`Error ${error.response.data.errorCode}: ${error.response.data.errorMessage}`);
        setSuccessMsg("");
      });
  };

  return (
    <>
      <Navbar />
      <h3 className="text-center mt-3 fw-bold">Link Account</h3>
      <div className="container ms-5 cover">
        <p>
          Enter your mobile number and account number to link
        </p>
        <p>Mobile Number</p>
        <div>
          <select>
            <option>+91</option>
          </select>
          <input
            type="text"
            placeholder="Eg:9090909090"
            className="ms-2"
            name="mobileNumber"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
          />
        </div>
        <div>
          <p className="mt-3">Account Number</p>
          <input
            type="number"
            placeholder="512345678"
            className="ms-1"
            name="accountNumber"
            value={accountNumber}
            onChange={handleAccountNumberChange}
          />
        </div>
        <button
          type="button"
          className="btn mt-3 ms-1 btn-color text-white"
          onClick={handleSubmit}
        >
          Check Link
        </button>
        {successMsg ? <span className="text-success">{successMsg}</span> : null}
        {errorMsg ? <span className="text-danger">{errorMsg}</span> : null}
      </div>
      <Footer />
    </>
  );
};

export default LinkAccount;
