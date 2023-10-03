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
import GridContainer from "./Components/loggedin/GridContainer";
import Checkin from "./Components/loggedin/Checkin";
import Breaktime from "./Components/loggedin/Breaktime";
import Timesheet from "./Components/loggedin/Timesheet";
import styled from '@emotion/styled';
import { UserProvider } from "./Components/loginPage/Usercontext";
function App() {
  const [activeLink, setActiveLink] = useState<String>("");
  const isAuthenticated = localStorage.getItem("role_id") === "user";
  const isLoggedin =localStorage.getItem("loggedIn") === "true"
  const shouldDisplaySidebar = isAuthenticated; // Display the sidebar only for authenticated users
  console.log("isAuthenticated",isAuthenticated)
  console.log("Role_id",localStorage.getItem("role_id"),localStorage.getItem("loggedIn"))

  return (
    <div className="App">

      <UserProvider>


      {
         (localStorage.getItem('role_id') === "null" || localStorage.getItem('loggedIn') != "true")  &&
         <>

      <Routes>
        {/* (localStorage.getItem('role_id') === "null" ) && */}
        <Route path="/" element={<LoginComponent />} />
        <Route
          path="/options"
          element={
            isAuthenticated && isLoggedin ? (
              <>
                <MyProvider>
                  <Sidebar setActiveLink={setActiveLink} />
                  <p>Active Link: {activeLink}</p>
                
                <Options />
                <GridContainer />
                <Timesheet />
                </MyProvider>
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      </UserProvider>
    </div>
  );
}
const mapStateToProps = (state: { role: any; }) => ({
  role: state.role
});

export default connect(mapStateToProps)(App);
