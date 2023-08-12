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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import { setJwt, setUserDetails } from "@/features/user/userData";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#64748b",
    },
    secondary: {
      main: "#64748b",
    },
  },

});

function Signin() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [notification, setNotification] = useState("Login Success")
  const jwt = useSelector((state) => state.userData.jwt);

  const handleClick = () => { setOpen(true) };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  async function getUserDetails(jwt) {
    try {
      const response = await fetch(`api/user`, {
        method: 'GET',
        headers: { Authorization: jwt }
      });

      const data = await response.json();
      dispatch(setUserDetails(data))
      setSeverity("success")
      setNotification("Login Success")
      handleClick()
      window.location.href = "/"
    } catch (error) {
      console.log(error);
    }
  }

  async function signinForm(event) {
    event.preventDefault()
    setLoader(true)
    const email = event.target.email.value
    const password = event.target.password.value

    const response = await fetch(`api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, action: 'signin' }),
    });

    const data = await response.json();
    if (data.token) {
      dispatch(setJwt(data.token))
      getUserDetails(data.token)
    }
    else {
      setSeverity("error")
      setNotification(data.message)
      handleClick()
    }
  }

  useEffect(() => {
    if (jwt !== null) {
      window.location.href = "/"
    }
  }, [])

  return (
    <main className="bg-background dark:bg-darkBackground flex justify-center items-center w-full h-screen pt-10">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {notification}
        </Alert>
      </Snackbar>
      <div className="bg-tertiary p-10 rounded-xl w-[36%]">
        <div>
          <div className="mr-2 mb-4 text-center text-[#CBD5E1] dark:text-[#CBD5E1] text-[48px]">
            <p>Smart <strong className="ml-[2px] text-main">Attendance</strong></p>
          </div>
          <div>
            <h1 className="font-[600] text-[36px] text-[#CBD5E1] mb-1">Sign in</h1>
            <h3 className="text-gray400 text-[16px] mb-6">{`Don't have a account?`} <Link className="text-main font-[10px]" href={"signup"}>Sign up</Link></h3>
            <div className="">
              <form onSubmit={signinForm}>
                <div className="mb-5">
                  <label htmlFor="email" className="text-gray400 font-[600]">Username or email</label>
                  <input type="text" name="email" placeholder="Username or email" id="email" className="mt-2 w-full border-white border-2 rounded-md p-2 text-[#CBD5E1] placeholder:text-gray400 bg-transparent focus:outline-none focus:border-main" />
                </div>
                <div className="mb-5">
                  <label htmlFor="password" className="text-gray400 font-[600]">Password</label>
                  <input type="password" name="password" id="password" placeholder="Password" className="mt-2 w-full border-white border-2 rounded-md p-2 text-[#CBD5E1] placeholder:text-gray400 bg-transparent focus:outline-none focus:border-main" />
                </div>
                <div className="mb-5">
                  <Link href={""} className="text-main font-[10px]">Forgot your password?</Link>
                </div>
                <div>
                  <button type="submit" className="bg-main border-2 border-main hover:border-2 hover:border-main hover:bg-transparent text-white rounded-md p-2 w-full">Sign in</button>
                </div>
              </form>
            </div>
            <div className="mt-5">
              <hr className="w-full h-[1px] bg-[#64748ba4] border-[#64748ba4]" />
            </div>
            <div className="flex justify-center items-center mt-8">
              <div className="ml-2">
                <div className="flex items-center justify-center w-9 h-9 p-2 rounded-md border border-[#64748ba4] hover:bg-main cursor-pointer">
                  <ThemeProvider theme={theme}>
                    <TwitterIcon color="primary" />
                  </ThemeProvider>
                </div>
              </div>
              <div className="ml-2">
                <div className="flex items-center justify-center w-9 h-9 p-2 rounded-md border border-[#64748ba4] hover:bg-main cursor-pointer">
                  <ThemeProvider theme={theme}>
                    <FacebookSharpIcon color="primary" />
                  </ThemeProvider>
                </div>
              </div>
              <div className="ml-2">
                <div className="flex items-center justify-center w-9 h-9 p-2 rounded-md border border-[#64748ba4] hover:bg-main cursor-pointer">
                  <ThemeProvider theme={theme}>
                    <GitHubIcon color="primary" />
                  </ThemeProvider>
                </div>
              </div>
              <div className="ml-2">
                <div className="flex items-center justify-center w-9 h-9 p-2 rounded-md border border-[#64748ba4] hover:bg-main cursor-pointer">
                  <ThemeProvider theme={theme}>
                    <LinkedInIcon color="primary" />
                  </ThemeProvider>
                </div>
              </div>
              <div className="ml-2">
                <div className="flex items-center justify-center w-9 h-9 p-2 rounded-md border border-[#64748b] hover:bg-main cursor-pointer">
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

export default Signin;