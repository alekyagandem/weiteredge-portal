import React, { useEffect } from "react";
import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  createBrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { connect } from 'react-redux';
import { MyProvider } from "./Components/loggedin/Mycontext";
import LoginComponent from "./Components/loginPage/index";
import { Options } from "./Components/loggedin/options";
import Sidebar from "./Components/loggedin/SideBar";
import Checkin from "./Components/loggedin/Checkin";
import Breaktime from "./Components/loggedin/Breaktime";
import Timesheet from "./Components/loggedin/Timesheet";

function App() {
  const [activeLink, setActiveLink] = useState<String>("");
  // const[isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    console.log(localStorage.getItem("role_id"))
  });

  return (
    <div className="App">
      {
         (localStorage.getItem('role_id') === "null" || localStorage.getItem('loggedIn') != "true")  &&
         <>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
      </>
}

      {localStorage.getItem("loggedIn") === "true" && (
        <>
          {localStorage.getItem("role_id") === "user" && (
            <>
              <MyProvider>
                

                <div className="grid-container">
                  <Routes>
                    <Route path="/options" element={<Breaktime />} />
                  </Routes>
                  <Routes>
                    <Route path="/options" element={<Checkin />} />
                  </Routes>
                </div>
                
                <Routes>
                  
                  <Route path="/options" element={<Timesheet />} />
                </Routes>
                <Sidebar setActiveLink={setActiveLink} />
                <p>Active Link: {activeLink}</p>
              </MyProvider>
            </>
          )}
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state: { role: any; }) => ({
  role: state.role
});

export default connect(mapStateToProps)(App);
