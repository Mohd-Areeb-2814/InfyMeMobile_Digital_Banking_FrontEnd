import React, { useState } from 'react'
import Navbar from "./Navbar" 
import axios from 'axios';
import Footer from './Footer';

const ListAccount = () => {

  const [formData, setFormData] = useState({
    mobileNumber: "",
  });
  
  const [error, setError] = useState("");
  const [accountList, setAccountList] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    console.log("Form Data:", formData);
    axios
      .get(
        "http://localhost:8086/accountService/accounts/" + formData.mobileNumber
      )
      .then((response) => {
        setAccountList(response.data);
        setError("");
      })
      .catch((error) => {
        setError(`Error ${error.response.data.errorCode}: ${error.response.data.errorMessage}`)
        setAccountList([]);
      });
    }

  return (
    <>
    <Navbar/>
    <h3 className='text-center mt-3 fw-bold'>List Account</h3>
    <div className='container ms-5 cover max-height'>
        <p>Enter your mobile number to view your linked account details</p>
        <p>Mobile Number</p>
        <div>
            <select>
                <option>code</option>
                <option>+91</option>
            </select>
            <input type="text" placeholder="Eg:9090909090" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} className='ms-2' />
        </div>
        <button type='button' className='btn mt-3 ms-1 btn-color text-white' onClick={handleSubmit}>View Details</button>
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
          {accountList.map((account) => (
            <div className="col">
              <div
                key={account.accountNumber}
                className="card text-center w-75 mx-auto mt-4"
                style={{
                  margin: "10px",
                  padding: "10px",
                  backgroundColor: "#f3efee",
                }}
              >
                <h4 style={{ color: "#88685e" }}>Account Details</h4>
                <div>
                  <p>Account Number : {account.accountNumber}</p>
                  <p>Bank Name : {account.bankName}</p>
                  <p>Balance : {account.balance}</p>
                  <p>Account Type : {account.accountType}</p>
                  <p>IFSC Code : {account.ifscCode}</p>
                  <p>Opening Date : {account.openingDate}</p>
                  <p>Mobile Number : {account.userDTO.mobileNumber}</p>
                </div>
              </div>
            </div>
          ))}
          {error ? <span className="text-danger">{error}</span> : null}
        </div>
      
    </div>
      <Footer/>
    </>
  )
}

export default ListAccount