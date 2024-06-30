import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { useContext, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { DataContext } from "../Config/DataProvider";
const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
  margin-top: 64px;
  @media (max-width:450px){
  width:300px;
  }
  @media (max-width:350px){
  width:250px;
  }
  @media (max-width:260px){
  width:150px;
  }
`;
const Image = styled("img")({
  width: "100px",
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
  text-transform: none;
  background: #f57c00;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;
const Error = styled(Typography)`
font-size:10px;
margin-top:10px;
line-height:0;
font-weight:600;
`
const SignUpButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: 2474f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/20%);
  @media (max-width:260px){
  height:79px;
  }
`;
const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
  display:flex;
  justify-content:center;
`;
const signupInitialvalue = {
  name: "",
  username: "",
  password: "",
};

const loginInitialvalue = {
  username1: "",
  password1: ""
};

export default function Login({isUserAuthenticated}) {
  const [account, setAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialvalue);
  const [login, setLogin] = useState(loginInitialvalue);
  const [error, setError] = useState()
  const {setAccount1}=useContext(DataContext)
  const navigate = useNavigate();

  function onchangesignup(e) {
    setSignup({ ...signup, [e.target.name]: e.target.value });
    // console.log(signup)
  }

  function onchangelogin(e) {
    // console.log(login)
    setLogin({ ...login, [e.target.name]: e.target.value })
  }
  const loginuser = async () => {
    try {
      console.log(login)
      let result = await axios.post('http://localhost:5000/login', login);//{ withCredentials: true });
      
      sessionStorage.setItem('access_token',`${result.data.access_token}`);
      // console.log(result)
      setAccount1({name:result.data.name,username:result.data.username});
      isUserAuthenticated(true);
      navigate('/');
      // setError()
      // console.log('navigation')
      setLogin(loginInitialvalue);
    }
    catch (error) {
      if (error.response) {
        console.log(error.response)
        setError(error.response.data.message); // Update error state with backend message
      } else {
        setError("Something went wrong. Please try again."); // Handle other errors (e.g., network issues)
      }
    }
  }


  const signupuser = async () => {
    try {
      console.log(signup)
      let response = await axios.post('http://localhost:5000/signup', signup);
      setSignup(signupInitialvalue)
      setError("")
      console.log("Api called successfully")
      setAccount('login')
    }
    catch (error) {
      if (error.response) {
        setError(error.response.data.message); // Update error state with backend message
      } else {
        setError("Something went wrong. Please try again."); // Handle other errors (e.g., network issues)
      }
    }
  }

  
  const toggleButton = () => {
    account === "signup" ? setAccount("login") : setAccount("signup");
    setSignup(signupInitialvalue)
    setLogin(loginInitialvalue)
    setError("")
  };

  return (
    <Component>
      <Box>
        <Image
          src="https://cdn.icon-icons.com/icons2/1945/PNG/512/iconfinder-blog-4661578_122455.png"
          alt="Logo"
        />
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              value={login.username1}
              name="username1"
              onChange={onchangelogin}
              label="Enter Username"
            />
            <TextField
              variant="standard"
              onChange={onchangelogin}
              value={login.password1}
              name="password1"
              label="Enter Password"
            />
            <LoginButton variant="contained" onClick={loginuser}>Login</LoginButton>
            <Text>OR</Text>
            <SignUpButton onClick={() => toggleButton()} variant="text">
              Create an account
            </SignUpButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={onchangesignup}
              name="name"
              value={signup.name}
              label="Enter Name"
            />
            <TextField
              variant="standard"
              onChange={onchangesignup}
              name="username"
              value={signup.username}
              label="Enter Username"
            />
            <TextField
              variant="standard"
              onChange={onchangesignup}
              value={signup.password}
              name="password"
              label="Enter Password"
            />
            {error && <Error>{error}</Error>}
            <SignUpButton variant="text" onClick={signupuser}>Signup</SignUpButton>
            <Text>OR</Text>
            <LoginButton onClick={() => toggleButton()} variant="contained">
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
}
