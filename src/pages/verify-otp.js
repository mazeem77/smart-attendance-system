import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
function Otp() {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");
  const [val4, setVal4] = useState("");
  const email = useSelector(state => state.userData.email);

  let handleFocus = (event) => event.target.select();

  let handleSubmit = async event => {
    let val4 = document.getElementById('fourth').value;
    let otpValue = val1.toString() + val2.toString() + val3.toString() + val4.toString()
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = {
      email: email,
      otp: otpValue,
    }

    raw = JSON.stringify({
      data: raw
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    await fetch(`${process.env.BASE_URL}/auth/verify-otp`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result?.status) {
          window.location.href = '/'
        }
      })
      .catch(error => console.log('error', error))
  }

  useEffect(() => {
    // if (jwt !== null) {
    //   window.location.href = "/"
    // }
  }, [])

  return (
    <div className="flex justify-center items-center w-full h-screen bg-[#141D2B]">
      <div className="flex justify-center items-center w-full h-full flex-col">
        <h1 className="text-[#83c401] text-[28px] font-extrabold my-2 text-center">OTP Verification</h1>
        <p className="text-[#A4B1CD] text-[14px] font-bold my-2 text-center">We have sent a code to your email {email}</p>
        <div className="flex my-2">
          <div className="mx-2">
            <input type="text" id="first" autoFocus maxLength="1" onFocus={handleFocus} pattern="[0-9]*" value={val1} onChange={(e) => {
              setVal1((v) => (e.target.validity.valid ? e.target.value : v))
              document.getElementById("second").focus();
            }}
              className="bg-transparent focus:outline-none border border-[#A4B1CD] focus:ring-0 focus:ring-offset-0 focus:ring-transparent w-16 aspect-square rounded-xl text-[#A4B1CD] text-center text-[28px]" />
          </div>
          <div className="mx-2">
            <input type="text" id="second" maxLength="1" pattern="[0-9]*" onFocus={handleFocus} value={val2} onChange={(e) => {
              setVal2((v) => (e.target.validity.valid ? e.target.value : v))
              document.getElementById("third").focus();
            }} className="bg-transparent focus:outline-none border border-[#A4B1CD] focus:ring-0 focus:ring-offset-0 focus:ring-transparent w-16 aspect-square rounded-xl text-[#A4B1CD] text-center text-[28px]" />
          </div>
          <div className="mx-2">
            <input type="text" id="third" onFocus={handleFocus} maxLength="1" pattern="[0-9]*" value={val3} onChange={(e) => {
              setVal3((v) => (e.target.validity.valid ? e.target.value : v))
              document.getElementById("fourth").focus();
            }} className="bg-transparent focus:outline-none border border-[#A4B1CD] focus:ring-0 focus:ring-offset-0 focus:ring-transparent w-16 aspect-square rounded-xl text-[#A4B1CD] text-center text-[28px]" />
          </div>
          <div className="mx-2">
            <input type="text" id="fourth" onFocus={handleFocus} maxLength="1" pattern="[0-9]*" value={val4} onChange={(e) => {
              setVal4((v) => (e.target.validity.valid ? e.target.value : v))
              document.getElementById("verify").focus();
            }}
              className="bg-transparent focus:outline-none border border-[#A4B1CD] focus:ring-0 focus:ring-offset-0 focus:ring-transparent w-16 aspect-square rounded-xl text-[#A4B1CD] text-center text-[28px]" />
          </div>
        </div>
        <div className="flex my-2">
          <button id="verify" onFocus={() => {
            handleSubmit()
          }}
            onClick={handleSubmit} className="bg-[#83c401] text-white rounded-xl px-4 py-2 my-2">Verify</button>
        </div>
      </div>
    </div>
  );
}

export default Otp;