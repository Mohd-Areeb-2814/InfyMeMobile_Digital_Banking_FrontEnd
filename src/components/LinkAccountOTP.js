import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const LinkAccountOTP = () => {
  const [mobileNumber, setMobileNumber] = useState("");

  const [otpAccountNo, setOtpAccountNo] = useState({
    accountNumber: "",
    otp: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };
  const handleOtpAccountNumberChange = (event) => {
    const { name, value } = event.target;
    setOtpAccountNo({ ...otpAccountNo, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:8086/accountService/accounts/" + mobileNumber,
        otpAccountNo
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
      <h3 className="text-center mt-3 fw-bold">Link Account with OTP</h3>
      <div className="container ms-5 cover">
        <p>
          Enter your Account number, Mobile number and OTP to link the account
          details
        </p>
        <p>Mobile Number</p>
        <div>
          <select>
            <option>+91</option>
          </select>
          <input
            type="text"
            name="mobileNumber"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            placeholder="Eg:9090909090"
            className="ms-2"
          />
        </div>
        <div>
          <p className="mt-3">Account Number</p>
          <input
            type="text"
            name="accountNumber"
            value={otpAccountNo.accountNumber}
            onChange={handleOtpAccountNumberChange}
            className="ms-1"
          />
        </div>
        <div>
          <p className="mt-3">OTP</p>
          <input
            type="text"
            name="otp"
            value={otpAccountNo.otp}
            onChange={handleOtpAccountNumberChange}
            className="ms-1"
          />
        </div>
        <button
          type="button"
          className="btn mt-3 ms-1 btn-color text-white"
          onClick={handleSubmit}
        >
          Link Account
        </button>
      </div>
      {successMsg ? <span className="text-success">{successMsg}</span> : null}
      {errorMsg ? <span className="text-danger">{errorMsg}</span> : null}
      <Footer />
    </>
  );
};

export default LinkAccountOTP;
