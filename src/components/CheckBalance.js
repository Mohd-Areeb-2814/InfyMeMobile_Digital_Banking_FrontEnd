import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios';

const CheckBalance = () => {

  const[mobileNumber, setMobileNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState("");
 
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState("");
 
  const handleMobileNumberChange = (event) => {
   setMobileNumber(event.target.value);
  }
  const handleAccountNumberChange = (event) => {
   setAccountNumber(event.target.value);
  }
 
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`http://localhost:8086/accountService/accounts/balance/${mobileNumber}/account?accountNo=${accountNumber}`)
    .then((response) => {
      setSuccessMsg("Your Balance is : "+response.data);
      setErrorMsg("");
    })
    .catch((error) => {
      //console.log(error.response.data);
      setErrorMsg(`Error ${error.response.data.errorCode}: ${error.response.data.errorMessage}`);
      setSuccessMsg("");
    })
 
   
  };

  return (
    <>
    <Navbar/>
    <h3 className='text-center mt-3 fw-bold'>Check Balance</h3>
    <div className='container ms-5 cover'>
        <p>Enter your mobile number to check your balance</p>
        <p>Mobile Number</p>
        <div>
            <select>
                <option>+91</option>
            </select>
            <input type="text" placeholder="Eg:9090909090" className='ms-2' name='mobileNumber' value={mobileNumber} onChange={handleMobileNumberChange} />
        </div>
        <div>
        <p className='mt-3'>Account Number</p>
        <input type="text" className='ms-1' name='accountNumber' value = {accountNumber} onChange={handleAccountNumberChange} />
        </div>
        <button type='button' className='btn mt-3 ms-1 btn-color text-white' onClick={handleSubmit}>Check Balance</button>
        <br/><br/>
            <div className="card w-25">
              <h5 className="text-center">Balance</h5>
             {successMsg ? <span className="text-danger text-center">{successMsg}</span> : null}
            {errorMsg ? <span className="text-danger text-center">{errorMsg}</span> : null}
            </div>
    </div>
    <Footer/>
    </>
  )
}

export default CheckBalance