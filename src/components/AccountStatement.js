import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import {faStepBackward, faFastBackward, faStepForward, faFastForward} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AccountStatement = () => {
  const [formData, setFormData] = useState({
    mobileNumber: "",
  });

  const [error, setError] = useState("");
  const [accountStatementList, setAccountStatementList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(1); // Set the number of items per page
  const [showTable, setShowTable] = useState(false); // State to control table visibility

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchTransactions(formData.mobileNumber, currentPage);
  };

  const fetchTransactions = (mobileNumber, page) => {
    axios
      .get(
        `http://localhost:8086/accountService/accounts/transactions/${mobileNumber}?page=${page}&size=${pageSize}`
      )
      .then((response) => {
        setAccountStatementList(response.data.content);
        setTotalPages(response.data.totalPages);
        setError("");
        setShowTable(true); // Show the table after fetching data
      })
      .catch((error) => {
        setError(`Error ${error.response.data.errorCode}: ${error.response.data.errorMessage}`);
        setAccountStatementList([]);
        setShowTable(false); // Hide the table on error
      });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      fetchTransactions(formData.mobileNumber, newPage);
    }
  };

  return (
    <>
      <Navbar />
      <h3 className="text-center mt-3 fw-bold">Account Statement</h3>
      <div className="container ms-5 cover">
        <p>Please enter the mobile number to get the account statement</p>
        <p>Mobile Number</p>
        <div>
          <select>
            <option>code</option>
            <option>+91</option>
          </select>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            placeholder="Eg: 9090909090"
            onChange={handleInputChange}
            className="ms-2"
          />
        </div>
        <button
          type="button"
          className="btn mt-3 ms-1 btn-color text-white"
          onClick={handleSubmit}
        >
          Get Statement
        </button>

        {showTable && ( // Render the table only if showTable is true
          <>
            <table className="table table-bordered table-striped mt-3">
              <thead>
                <tr>
                  <th>Transaction Date And Time</th>
                  <th>Amount</th>
                  <th>Sender Account</th>
                  <th>Paid To</th>
                  <th>Receiver Account</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {accountStatementList.map((statement) => (
                  <tr key={statement.transactionId}>
                    <td>{statement.transactionDateTime}</td>
                    <td>{statement.amount}</td>
                    <td>{statement.senderAccountNumber}</td>
                    <td>{statement.paidTo}</td>
                    <td>{statement.receiverAccountNumber}</td>
                    <td>{statement.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            

            <div className="pagination mt-3">
              <button
                onClick={() => handlePageChange(0)}
                disabled={currentPage === 0}
              >
               <FontAwesomeIcon icon={faFastBackward} /> First
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                <FontAwesomeIcon icon={faStepBackward} /> Previous
              </button>
              <span className="mx-2">
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
              >
                <FontAwesomeIcon icon={faStepForward} /> Next
              </button>
              <button
                onClick={() => handlePageChange(totalPages - 1)}
                disabled={currentPage >= totalPages - 1}
              >
               <FontAwesomeIcon icon={faFastForward} /> Last
              </button>
            </div>
          </>
        )}

        {error && <span className="text-danger">{error}</span>}

      </div>
      <Footer />
    </>
  );
};

export default AccountStatement;
