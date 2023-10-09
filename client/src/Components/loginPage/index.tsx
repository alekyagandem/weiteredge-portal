import React, { useState } from "react";
import {
  LockOutlined as LockOutlinedIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";
import { connect, DispatchProp } from "react-redux";
import { useUserContext } from "./Usercontext";


const MainDiv = styled.div({
  backgroundColor: "black",
  display: "flex",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
});
const FormContainer = styled(Container)({
  color: "white",
  backgroundColor: "#1F1F1F",
  padding: 70,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  margin: "75px",
  a: {
    textDecoration: "none",
  },
  input: {
    color: "white",
    borderColor: "white",
  },
});

interface LoginRouteProps {
  dispatch: DispatchProp['dispatch']; 
  
}

const LoginRoute: React.FC<LoginRouteProps> = ({ dispatch }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const handleFormChange = (field: string, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
    console.log(form);
  };

  const loggingIn = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:2700/auth/login/`, {
        _id: form.email,
        password: form.password,
      });

      const data = await response;
      const userData=data.data.data
      setUser(userData)
      console.log(data.status,data);
      console.log("Print data",data.data)
      console.log("ROLE",data.data.data.role)
      if (data.status == 200 && data.data.data.role.role_type == "user") {
        localStorage.setItem("role_id", data.data.data.role.role_type);
        localStorage.setItem("loggedIn", "true");
        dispatch({ type: "ROLE", payload: "user" });
        // console.log(localStorage.getItem("role_id"))
        navigate("/options")
      }
      else if(data.status == 200 && data.data.data.role.role_type == "admin")
      {
        localStorage.setItem("role_id", data.data.data.role.role_type);
        localStorage.setItem("loggedIn", "true");
        dispatch({ type: "ROLE", payload: "admin" });
        console.log("Role_id for admin",localStorage.getItem("role_id"))
        navigate("/table")

      }
    } catch (error) {
      console.log(error);
      // window.alert("Can't Assign Same Track Name")
    }
  };

  return (
    <MainDiv>
      <FormContainer maxWidth="sm">
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {/*@ts-ignore*/}
        <Box noValidate sx={{ mt: 1 }}>
          <FormControl variant="outlined" fullWidth required sx={{ my: 2 }}>
            <InputLabel htmlFor="email-input" sx={{ color: "white" }}>
              Email
            </InputLabel>
            <OutlinedInput
              onChange={(e) => handleFormChange("email", e.target.value)}
              value={form.email}
              autoFocus
              id="email-input"
              label="Email"
            />
          </FormControl>

          <FormControl variant="outlined" fullWidth required sx={{ my: 2 }}>
            <>
              <InputLabel htmlFor="password-input" sx={{ color: "white" }}>
                Password
              </InputLabel>
              <OutlinedInput
                onChange={(e) => handleFormChange("password", e.target.value)}
                value={form.password}
                type={showPassword ? "text" : "password"}
                id="password-input"
                label="Password"
                color="primary"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon sx={{ fill: "white" }} />
                      ) : (
                        <VisibilityOffIcon sx={{ fill: "white" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox defaultChecked value="remember" color="secondary" />
            }
            label="Remember me"
          />
          <Button
            onClick={loggingIn}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/">
                <Typography color="secondary">Forgot password?</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register">
                <Typography color="secondary">
                  {"Don't have an account? Sign Up"}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </FormContainer>
    </MainDiv>
  );
};

export default connect()(LoginRoute);
