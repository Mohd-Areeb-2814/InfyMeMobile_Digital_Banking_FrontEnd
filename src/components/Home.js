import React, {useEffect} from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  return (
    <>
    <div className="Bgimage">
        <br/>
    <Navbar />
      <main className="main-content">
        <div className="hero-section">
          <h1>Trust us and save your money with us.</h1>
        </div>
 
        <aside className="info-box">
          <h5>How can we help you?</h5>
          <p>_________________________________________</p>
          <br/>
         
 
          <p>
            Banking is the best way to save your money and get a loan for your
            future. Nowadays it is very easy to get a loan from a bank. InfyMe
            Mobile is one of the leading digital banking solutions in India.
          </p>
          <p>_________________________________________</p>
         
          { JSON.parse(localStorage.getItem('isUserLoggedIn'))  === true ?  null : (<>
            <div className="connect-us">
              <p>Connect Us</p>
              <div className="d-flex">
                <Link to="/login" className="login-button me-2">
                  Login here
                </Link>
  
                <Link to="/registration" className="mt-3 text-black">
                  New User?
                </Link>
              </div>
            </div>
          </>) }

        </aside>
      </main>
      <Footer/>
      </div>
    </>
  );
};

export default Home;
