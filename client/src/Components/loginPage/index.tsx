import React, { useState } from 'react';
import {
  LockOutlined as LockOutlinedIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { useMutation } from 'react-query';
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
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const MainDiv = styled.div({
  backgroundColor: 'black',
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center'
})
const FormContainer = styled(Container)({
  color: 'white',
  backgroundColor: '#1F1F1F',
  padding: 70,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  margin: '75px',
  a: {
    textDecoration: 'none',
  },
  input: {
    color: 'white',
    borderColor: 'white',
  },
});

const database = [
  {
    email: "user1",
    password: "pass1"
  },
  {
    email: "user2",
    password: "pass2"
  }
];
const LoginRoute = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const handleFormChange = (field: string, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
    console.log(form)
  };

  const handleSubmit = () => {
    const User = database.find((user) => user.email === form.email)

    if(User){
      if(User.password === form.password){
        console.log('logged In successfully')
      }
    }
  }

  return (
    <MainDiv>
      <FormContainer maxWidth="sm" >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {/*@ts-ignore*/}
        <Box noValidate sx={{ mt: 1 }}>
          <FormControl variant="outlined" fullWidth required sx={{ my: 2 }}>
            <InputLabel htmlFor="email-input" sx={{ color: 'white' }}>
              Email
            </InputLabel>
            <OutlinedInput
              onChange={(e) => handleFormChange('email', e.target.value)}
              value={form.email}
              autoFocus
              id="email-input"
              label="Email"
            />
          </FormControl>

          <FormControl variant="outlined" fullWidth required sx={{ my: 2 }}>
            <>
              <InputLabel htmlFor="password-input" sx={{ color: 'white' }}>
                Password
              </InputLabel>
              <OutlinedInput
                onChange={(e) => handleFormChange('password', e.target.value)}
                value={form.password}
                type={showPassword ? 'text' : 'password'}
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
                        <VisibilityIcon sx={{ fill: 'white' }} />
                      ) : (
                        <VisibilityOffIcon sx={{ fill: 'white' }} />
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
            onClick={() => handleSubmit()}
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

export default LoginRoute;
