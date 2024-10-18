import "./App.css";
import ListAccount from "./components/ListAccount";
import LinkAccount from "./components/LinkAccount";
import LinkAccountOTP from "./components/LinkAccountOTP";
import CheckBalance from "./components/CheckBalance";
import AcccountStatement from "./components/AccountStatement";
import CreateAccount from "./components/CreateAccount";
import FundTransfer from "./components/FundTransfer";
import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import UserLogin from "./components/UserLogin";
import UserRegistration from "./components/UserRegistration";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/accounts" element={<ListAccount />}></Route>
        <Route path="/link" element={<LinkAccount/>}></Route>
        <Route path="/linkotp" element={<LinkAccountOTP />}></Route>
        <Route path="/balance" element={<CheckBalance />}></Route>
        <Route path="/statement" element={<AcccountStatement />}></Route>
        <Route path="/create" element={<CreateAccount />}></Route>
        <Route path="/transfer" element={<FundTransfer />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/registration" element={<UserRegistration />}></Route>
      </Routes>
    </>
  );
}

export default App;
