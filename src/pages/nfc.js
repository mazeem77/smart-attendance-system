import nfc from '../../public/images/svg/nfc.svg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setMenu } from "@/features/menu/counterSlice";
import Image from "next/image";
import { useApp } from "@/context/app";
import Loader from "@/components/shared/loader";
import { CancelOutlined, CheckCircle } from "@mui/icons-material";

function App() {

  const dispatch = useDispatch()
  const [log, setLog] = useState(<Loader />)
  const [logData, setLogData] = useState("Scanning")
  const [message, setMessage] = useState(<></>)
  const [serialNumber, setSerialNumber] = useState(null)
  const [attendance, setAttendance] = useState(null)
  const [registerButton, setRegisterButton] = useState(false)
  const user = useSelector(state => state.userData.userDetails);
  const jwt = useSelector(state => state.userData.jwt);
  const app = useApp()

  const markAttendance = async (id) => {
    setAttendance(<Loader />)
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
            setAttendance(<CheckCircle />)
          } else {
            setAttendance(<CheckCircle />)
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
        setLog(<CheckCircle />)
        setLogData("Verified!")
        setMessage(<div className="text-start border-2 border-main p-8 rounded-xl">
          <p className="text-white"><strong className="text-main">Username: </strong>{response.message.username}</p>
          <p className="text-white"><strong className="text-main">Email: </strong>{response.message.email}</p>
          <p className="text-white"><strong className="text-main">Role: </strong>{response.message.role}</p>
        </div>)
        if (user.role == "teacher") {
          await markAttendance(response.message._id)
        }
      } else {
        setLog(<CancelOutlined />)
        setLogData("Error!");
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
        setLog(<CheckCircle />)
        setLogData("Registered!")
        setRegisterButton(false)
      } else {
        setLog(<CancelOutlined />)
        setLogData("Error!");
      }
    }).catch((error) => {
      setLog(<CancelOutlined />)
      setLogData(error);
    })
  }

  const onReading = ({ serialNumber }) => {
    setSerialNumber(serialNumber)
    if (user.role === "teacher") {
      setRegisterButton(false)
      verifySerialNumber(serialNumber)
    }
    else if (user.role === "student") {
      if (user.nfc && serialNumber !== null) {
        setRegisterButton(false)
        verifySerialNumber(serialNumber)
      }
      else if (serialNumber !== null) {
        setRegisterButton(true)
        setLog(<Loader />);
        setLogData("New User Detected! Registering")
      }
    }
    else {
      setRegisterButton(false)
      setLog(<Loader />);
      setLogData("Scanning")
    }
  };

  const handleAction = async () => {
    try {
      const ndef = new NDEFReader();
      ndef
        .scan()
        .then(() => {
          setLog(<Loader />);
          setLogData("Scanning")
          ndef.onreadingerror = (event) => {
            setLog(<CancelOutlined />)
            setLogData(
              `Cannot read data from your NFC tag. Try a different one?`
            );
            onReading(event)
          };
          ndef.onreading = (event) => {
            setLog(<Loader />)
            setLogData(`Scanned! Verifying...`);
            onReading(event)
          };
        })
        .catch((error) => {
          setLog(<CancelOutlined />)
          setLogData(`Error! Scan failed to start: ${error}.`);
        });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    dispatch(setMenu(2))
    handleAction()
  }, [registerButton])

  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <Image src={nfc} className="w-40 mb-8" alt="logo" />
      <h1 className="font-bold text-main text-2xl mb-8">Attendance by NFC</h1>
      <div className="flex flex-col justify-center items-center mb-8 text-start w-96">
        <div className="flex flex-col justify-center items-center text-center w-full text-main">
          {log}
          {logData}
        </div>
        {/* <p className="text-white mt-4"><strong className="text-main">Tag Serial No: </strong>{serialNumber}</p> */}
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
        {attendance !== null ? <p className="text-white mt-4 text-center flex justify-center items-center h-4"><strong className="text-main whitespace-nowrap mr-4">Attendance Status: </strong>{attendance}</p> : <></>}
      </div>
    </div>
  );
}

export default App;
