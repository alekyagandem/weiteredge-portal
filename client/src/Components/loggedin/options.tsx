import React, { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import styled from "@emotion/styled";
import { Button } from "reactstrap";

const OptionStyle = styled.div({
  background: "#333",
  height: "60px",
  padding: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
 
});

const ButtonStyle = styled.button({
  backgroundColor: "#009DDA", // Blue background color
  color: "#fff", // White text color
  border: "none",
  borderRadius: "4px",
  padding: "10px 20px",
  cursor: "pointer",
});

const Options = () => {
  function logout() {
    localStorage.setItem("loggedIn", "false");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  }
  return (
    <div>
      <OptionStyle>
        <h3>Options</h3>
        <ButtonStyle onClick={() => logout()}>Log out </ButtonStyle>
      </OptionStyle>
    </div>
  );
};

export { Options };
