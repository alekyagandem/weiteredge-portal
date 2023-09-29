import React from "react";
import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {  
  createBrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  RouterProvider
} from "react-router-dom";
import { MyProvider } from "./Components/loggedin/Mycontext";
import LoginComponent from "./Components/loginPage/index";
import  {Options} from "./Components/loggedin/options";
import Sidebar from "./Components/loggedin/SideBar";
import GridContainer from "./Components/loggedin/GridContainer";
import Checkin from "./Components/loggedin/Checkin";
import Breaktime from "./Components/loggedin/Breaktime";
import Timesheet from "./Components/loggedin/Timesheet";
import styled from '@emotion/styled';




function App() {
  const [activeLink, setActiveLink] = useState<String>("");
  return (
    <div className="App">
      
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
      <MyProvider>
      <Routes>
        <Route path="/options" element={<Options/>} />
      </Routes>
      
      
      {/* <div className="grid-container"> */}
        {/* <Routes>
        <Route path="/options" element={<Breaktime checkinrun={false}/>} />
        </Routes>
        <Routes>
        <Route path="/options" element={<Checkin/>} />
        </Routes> */}
        <Routes>
          <Route path="/options" element={<GridContainer/>}></Route>
        </Routes>
        <Routes>
        <Route path="/options" element={<Timesheet/>} />
      </Routes>
      {/* </div> */}
     
      <Sidebar setActiveLink={setActiveLink} />
      <p>Active Link: {activeLink}</p>
      </MyProvider>
    </div>
   
  );
}

export default App;
