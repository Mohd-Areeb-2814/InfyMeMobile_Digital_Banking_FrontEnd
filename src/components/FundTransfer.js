import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const FundTransfer = () => {
  const [form, setForm] = useState({
    modeOfTransaction: "Fund Transfer",
    paidTo: "",
    receiverAccountNumber: "",
    amount: "",
    paidFrom: "",
    senderAccountNumber: "",
    remarks: "",
  });

  const [formError, setFormError] = useState({
    paidTo: "",
    receiverAccountNumber: "",
    amount: "",
    paidFrom: "",
    senderAccountNumber: "",
    remarks: "",
  });

  const messages = {
    MOBILE_RECEIVER_ERROR: "Please enter the receiver's 10 digit mobile number",
    RECEIVER_ERROR: "Please enter the receiver accout number",
    SENDER_ERROR: "Please enter the sender account number",
    AMOUNT_ERROR: "Please enter amount grater than 0 to be transferred",
    REMARKS_ERROR: "Please enter the remarks",
    MOBILE_SENDER_ERROR: "Please enter the sender's 10 digit mobile number",
    MANDATORY: "Enter all form fields",
  };

  const [formValid, setFormValid] = useState({
    paidTo: false,
    receiverAccountNumber: false,
    amount: false,
    paidFrom: false,
    senderAccountNumber: false,
    remarks: false,
    buttonActive: false,
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setForm({ ...form, [fieldName]: fieldValue });

    let errorsCopy = { ...formError };
    let formValidCopy = { ...formValid };

    switch (fieldName) {
      case "paidTo":
        if (fieldValue.length !== 10) {
          errorsCopy.paidTo = messages.MOBILE_RECEIVER_ERROR;
          formValidCopy.paidTo = false;
        } else if (fieldValue === "") {
          errorsCopy.paidTo = messages.MOBILE_RECEIVER_ERROR;
          formValidCopy.paidTo = false;
        } else {
          errorsCopy.paidTo = "";
          formValidCopy.paidTo = true;
        }
        break;
      case "receiverAccountNumber":
        if (fieldValue === "") {
          errorsCopy.receiverAccountNumber = messages.RECEIVER_ERROR;
          formValidCopy.receiverAccountNumber = false;
        } else {
          errorsCopy.receiverAccountNumber = "";
          formValidCopy.receiverAccountNumber = true;
        }
        break;
      case "amount":
        if (fieldValue <= 0) {
          errorsCopy.amount = messages.AMOUNT_ERROR;
          formValidCopy.amount = false;
        } else if (fieldValue === "") {
          errorsCopy.amount = messages.AMOUNT_ERROR;
          formValidCopy.amount = false;
        } else {
          errorsCopy.amount = "";
          formValidCopy.amount = true;
        }
        break;
      case "paidFrom":
        if (fieldValue.length !== 10) {
          errorsCopy.paidFrom = messages.MOBILE_SENDER_ERROR;
          formValidCopy.paidFrom = false;
        } else if (fieldValue === "") {
          errorsCopy.paidFrom = messages.MOBILE_SENDER_ERROR;
          formValidCopy.paidFrom = false;
        } else {
          errorsCopy.paidFrom = "";
          formValidCopy.paidFrom = true;
        }
        break;
      case "senderAccountNumber":
        if (fieldValue === "") {
          errorsCopy.senderAccountNumber = messages.SENDER_ERROR;
          formValidCopy.senderAccountNumber = false;
        } else {
          errorsCopy.senderAccountNumber = "";
          formValidCopy.senderAccountNumber = true;
        }
        break;
      case "remarks":
        if (fieldValue === "") {
          errorsCopy.remarks = messages.REMARKS_ERROR;
          formValidCopy.remarks = false;
        } else {
          errorsCopy.remarks = "";
          formValidCopy.remarks = true;
        }
        break;
      default:
        break;
    }

    formValidCopy.buttonActive =
      formValidCopy.paidTo &&
      formValidCopy.receiverAccountNumber &&
      formValidCopy.amount &&
      formValidCopy.paidFrom &&
      formValidCopy.senderAccountNumber &&
      formValidCopy.remarks;

    setFormValid({ ...formValidCopy });
    setFormError({ ...errorsCopy });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch("http://localhost:8086/accountService/accounts/fundtransfer", form)
      .then((response) => {
        setSuccessMsg(
          "Transaction Completed." +
            form.amount +
            "INR Transferred from Account Number " +
            form.paidFrom +
            "to " +
            form.paidTo +
            " Successfully"
        );
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
      <h4 className="text-center mt-3 fw-bold">Fund Transfer</h4>
      <div className="cadiv">
        <div class="ftcon">
          <div class="row">
            <div class="col">
              <form>
                <div class="form-group mt-3">
                  <label>Mode Of Transaction</label>
                  <input
                    type="text"
                    className="form-control"
                    value="Fund Transfer"
                    name="modeOfTransaction"
                    disabled={true}
                  />
                  <br />
                </div>
              </form>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <form>
                <div class="form-group">
                  <label>Paid To</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Reciever Mobile Number"
                    name="paidTo"
                    value={form.paidTo}
                    onChange={handleChange}
                  />
                  {formError.paidTo ? (
                    <p className="text-danger">{formError.paidTo}</p>
                  ) : null}
                  <br />
                </div>
              </form>
            </div>
            <div class="col">
              <form>
                <div class="form-group">
                  <label>Receiver Account</label>
                  <input
                    type="text"
                    class="form-control"
                    name="receiverAccountNumber"
                    placeholder="Receiver Account Number"
                    value={form.receiverAccountNumber}
                    onChange={handleChange}
                  />
                  {formError.receiverAccountNumber ? (
                    <p className="text-danger">
                      {formError.receiverAccountNumber}
                    </p>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <form>
                <div class="form-group">
                  <label>Amount</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Eg:10000"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                  />
                  {formError.amount ? (
                    <p className="text-danger">{formError.amount}</p>
                  ) : null}
                  <br />
                </div>
              </form>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <form>
                <div class="form-group">
                  <label>Date</label>
                  <input type="date" class="form-control" name="date" />
                  <br />
                </div>
              </form>
            </div>
            <div class="col">
              <form>
                <div class="form-group">
                  <label>Remarks</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Eg: Rent"
                    name="remarks"
                    value={form.remarks}
                    onChange={handleChange}
                  />
                  {formError.remarks ? (
                    <p className="text-danger">{formError.remarks}</p>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <form>
                <div class="form-group">
                  <label>Paid From</label>
                  <input
                    type="text"
                    class="form-control"
                    name="paidFrom"
                    placeholder="Sender Mobile Number"
                    value={form.paidFrom}
                    onChange={handleChange}
                  />
                  {formError.paidFrom ? (
                    <p className="text-danger">{formError.paidFrom}</p>
                  ) : null}
                </div>
              </form>
            </div>
            <div class="col">
              <form>
                <div class="form-group">
                  <label>Sender Account</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Sender Account Number"
                    name="senderAccountNumber"
                    value={form.senderAccountNumber}
                    onChange={handleChange}
                  />
                  {formError.senderAccountNumber ? (
                    <p className="text-danger">
                      {formError.senderAccountNumber}
                    </p>
                  ) : null}
                </div>
              </form>
              <br />
            </div>

            <button
              className="btn-color text-white"
              onClick={handleSubmit}
              disabled={!formValid.buttonActive}
            >
              Transfer Amount
            </button>
          </div>
          {successMsg ? (
            <span className="text-success">{successMsg}</span>
          ) : null}
          {errorMsg ? <span className="text-danger">{errorMsg}</span> : null}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FundTransfer;
