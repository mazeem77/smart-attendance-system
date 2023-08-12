import nfc from '../../public/images/svg/nfc.svg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setMenu } from "@/features/menu/counterSlice";
import Image from "next/image";
import { useApp } from "@/context/app";
import { Result } from "postcss";

function App() {

  const dispatch = useDispatch()
  const [log, setLog] = useState("Scanning...")
  const [message, setMessage] = useState(<></>)
  const [serialNumber, setSerialNumber] = useState(null)
  const [attendance, setAttendance] = useState("")
  const [registerButton, setRegisterButton] = useState(false)
  const user = useSelector(state => state.userData.userDetails);
  const jwt = useSelector(state => state.userData.jwt);
  const app = useApp()

  const markAttendance = async (id) => {
    setAttendance("Marking Your Attendance")
    const headerOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt
      },
      body: JSON.stringify({ action: 'mark', userId: id })
    }

    await fetch(`api/attendance`, headerOptions)
      .then(result => result.json()
        .then(response => {
          console.log(response)
          if (response.status) {
            setAttendance("Attendance Marked")
          } else {
            setAttendance("You have already Marked Attendance")
          }
        }
        ))
  }

  const verifySerialNumber = async (serialNumber) => {
    await fetch(`api/nfc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt
      },
      body: JSON.stringify({ action: 'verify', serialNumber })
    }).then(result => result.json().then(async response => {
      if (response.status) {
        setLog("Verified!")
        setMessage(<div className="text-start border-2 border-main p-8 rounded-xl">
          <p className="text-white"><strong className="text-main">Username: </strong>{response.message.username}</p>
          <p className="text-white"><strong className="text-main">Email: </strong>{response.message.email}</p>
          <p className="text-white"><strong className="text-main">Role: </strong>{response.message.role}</p>
        </div>)
        if (user.role == "student") {
          await markAttendance(response.message._id)
        }
      } else {
        setLog("Error!")
      }
    })).catch((error) => {
      console.log(error)
    })
  }

  const RegisterSerialNumber = async () => {
    await fetch(`api/nfc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt
      },
      body: JSON.stringify({ action: 'register', serialNumber: serialNumber })
    }).then(response => {
      console.log(response)
      if (response.status === 201) {
        setLog("Registered!")
        setRegisterButton(false)
      } else {
        setLog("Error!")
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  const onReading = ({ serialNumber }) => {
    setSerialNumber(serialNumber)
    if (user.nfc && serialNumber !== null) {
      setRegisterButton(false)
      verifySerialNumber(serialNumber)
    }
    else if (serialNumber !== null) {
      setRegisterButton(true)
      setLog("New User! Registering...")
    } else if (user.role === teacher) {
      setRegisterButton(false)
      verifySerialNumber(serialNumber)
    }
    else {
      setRegisterButton(false)
      setLog("Scanning...")
    }
  };

  const handleAction = async () => {
    try {
      const ndef = new NDEFReader();
      ndef
        .scan()
        .then(() => {
          setLog("Scan started successfully.");
          ndef.onreadingerror = (event) => {
            setLog(
              `Cannot read data from your NFC tag. Try a different one?`
            );
            onReading(event)
            console.log('Reading Error', event);
          };
          ndef.onreading = (event) => {
            setLog(`Scanned! Verifying...`);
            onReading(event)
          };
        })
        .catch((error) => {
          setLog(`Error! Scan failed to start: ${error}.`);
        });
    } catch (error) {
      setLog("Argh! " + error);
    }
  }

  useEffect(() => {
    dispatch(setMenu(2))
    handleAction()
  }, [registerButton])

  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <Image src={nfc} className="w-40 mb-8" alt="logo" />
      <h1 className="font-bold text-main text-2xl mb-8">Actions</h1>
      <div className="flex justify-center items-center mb-8">
      </div>
      {log}
      <br />
      SerialNumber: {serialNumber}
      <br />
      {
        registerButton ?
          <button className="bg-main text-white rounded-lg px-4 py-2 mt-4" onClick={() => {
            RegisterSerialNumber()
          }
          }>Register</button>
          : null
      }
      {message}
      {attendance ? <p className="text-white"><strong className="text-main">Message: </strong>{attendance}</p> : <></>}

    </div>
  );
}

export default App;
