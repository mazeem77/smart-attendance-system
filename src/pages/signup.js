import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from '../../public/images/png/logoCTFL.png'
import Link from "next/link";
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import discordIcon from '../../public/images/svg/discord.svg'
import { ThemeProvider, createTheme } from "@mui/material";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#64748ba4",
    },
    secondary: {
      main: "#64748ba4",
    },
  },

});

function Signup() {
  const jwt = useSelector(state => state.userData.jwt);
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [notification, setNotification] = useState("Login Success")

  const handleClick = () => { setOpen(true) };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  function signupForm(event) {
    event.preventDefault()
    const username = event.target.username.value
    const email = event.target.email.value
    const password = event.target.password.value
    const confirmPassword = event.target.confirmPassword.value

    if (password === confirmPassword) {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "username": username,
        "password": password,
        "email": email
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`${process.env.BASE_URL}/v1/signup`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            setSeverity("success")
            setNotification("Signup Success")
            handleClick()
            window.location.href = '/signin'
          } else {
            setSeverity("warning")
            setNotification(result.detail[0].msg)
            handleClick()
          }
        })
        .catch(error => console.log('error', error));
    } else {
      setSeverity("error")
      setNotification("Password and Confirm Password don't match")
      handleClick()
    }
  }

  useEffect(() => {
    if (jwt !== null) {
      window.location.href = "/"
    }
  }, [])

  return (
    <main className="bg-background dark:bg-darkBackground flex justify-center items-center w-full h-screen py-10">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {notification}
        </Alert>
      </Snackbar>
      <div className="bg-tertiary p-10 rounded-xl w-[36%]">
        <div>
          <div className="mr-2 mb-4 text-center text-[#CBD5E1] dark:text-[#CBD5E1] text-[48px]">
            <p>neorix<strong className="ml-[2px] text-main">CTF</strong></p>
          </div>
          <div>
            <h1 className="font-[600] text-[36px] text-[#CBD5E1] mb-1">Sign up</h1>
            <h3 className="text-gray400 text-[16px] mb-6">{`Already have an account?`} <Link className="text-main font-[10px]" href={"signin"}>Sign in</Link></h3>
            <div className="">
              <form onSubmit={signupForm}>
                <div className="mb-5">
                  <label htmlFor="username" className="text-gray400 font-[600]">User Name</label>
                  <input type="text" name="username" id="username" placeholder="username" className="mt-2 w-full border-white border-2 rounded-md p-2 text-[#CBD5E1] placeholder:text-gray400 bg-transparent focus:outline-none focus:border-main" />
                </div>
                <div className="mb-5">
                  <label htmlFor="email" className="text-gray400 font-[600]">Email</label>
                  <input type="email" name="email" placeholder="Email" id="email" className="mt-2 w-full border-white border-2 rounded-md p-2 text-[#CBD5E1] placeholder:text-gray400 bg-transparent focus:outline-none focus:border-main" />
                </div>
                <div className="mb-5">
                  <label htmlFor="password" className="text-gray400 font-[600]">Password</label>
                  <input type="password" name="password" id="password" placeholder="Password" className="mt-2 w-full border-white border-2 rounded-md p-2 text-[#CBD5E1] placeholder:text-gray400 bg-transparent focus:outline-none focus:border-main" />
                </div>
                <div className="mb-5">
                  <label htmlFor="confirmPassword" className="text-gray400 font-[600]">Confirm Password</label>
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" id="confirmPassword" className="mt-2 w-full border-white border-2 rounded-md p-2 text-[#CBD5E1] placeholder:text-gray400 bg-transparent focus:outline-none focus:border-main" />
                </div>
                <div>
                  <button type="submit" className="bg-main text-white border-2 border-main hover:border-2 hover:border-main hover:bg-transparent rounded-md p-2 w-full">Create New Account</button>
                </div>
              </form>
            </div>
            <div className="mt-5">
              <hr className="w-full h-[1px] bg-[#64748ba4] border-[#64748ba4]" />
            </div>
            <div className="flex justify-center items-center mt-8">
              <div className="ml-2">
                <div className="flex items-center justify-center w-9 h-9 p-2 rounded-md border border-[#64748ba4] hover:bg-[#0E172A] cursor-pointer">
                  <ThemeProvider theme={theme}>
                    <TwitterIcon color="primary" />
                  </ThemeProvider>
                </div>
              </div>
              <div className="ml-2">
                <div className="flex items-center justify-center w-9 h-9 p-2 rounded-md border border-[#64748ba4] hover:bg-[#0E172A] cursor-pointer">
                  <ThemeProvider theme={theme}>
                    <FacebookSharpIcon color="primary" />
                  </ThemeProvider>
                </div>
              </div>
              <div className="ml-2">
                <div className="flex items-center justify-center w-9 h-9 p-2 rounded-md border border-[#64748ba4] hover:bg-[#0E172A] cursor-pointer">
                  <ThemeProvider theme={theme}>
                    <GitHubIcon color="primary" />
                  </ThemeProvider>
                </div>
              </div>
              <div className="ml-2">
                <div className="flex items-center justify-center w-9 h-9 p-2 rounded-md border border-[#64748ba4] hover:bg-[#0E172A] cursor-pointer">
                  <ThemeProvider theme={theme}>
                    <LinkedInIcon color="primary" />
                  </ThemeProvider>
                </div>
              </div>
              <div className="ml-2">
                <div className="flex items-center justify-center w-9 h-9 p-2 rounded-md border border-[#64748ba4] hover:bg-[#0E172A] cursor-pointer">
                  <Image src={discordIcon} alt="Discord Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Signup;