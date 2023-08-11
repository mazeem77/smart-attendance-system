import nfc from '../../public/images/svg/nfc.svg';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { setMenu } from "@/features/menu/counterSlice";
import Image from "next/image";

function App() {

  const dispatch = useDispatch()
  const [option, setOption] = useState()
  const [log, setLog] = useState("Scanning...")
  const [message, setMessage] = useState()
  const [serialNumber, setSerialNumber] = useState()

  const onReading = ({ message, serialNumber }) => {
    setSerialNumber(serialNumber);
    for (const record of message.records) {
      switch (record.recordType) {
        case "text":
          const textDecoder = new TextDecoder(record.encoding);
          setMessage(textDecoder.decode(record.data));
          break;
      }
    }
  };

  const onHandleAction = async (actions) => {
    if (actions === 0) {
      try {
        const ndef = new NDEFReader();
        ndef
          .scan()
          .then(() => {
            setLog("Scan started successfully.");
            ndef.onreadingerror = (event) => {
              setLog(
                `Error! Cannot read data from the NFC tag. Try a different one? ${event}`
              );
              onReading(event)
              console.log('Reading Error', event);
            };
            ndef.onreading = (event) => {
              setLog(`NDEF message read. ${typeof event} and ${JSON.stringify(event)}`);
              onReading(event)
              console.log('Reading Error', event);
            };
          })
          .catch((error) => {
            setLog(`Error! Scan failed to start: ${error}.`);
          });
      } catch (error) {
        setLog("Argh! " + error);
      }
    }
  }

  useEffect(() => {
    dispatch(setMenu(2))
    onHandleAction(0)
    setOption(0)

  }, [])

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
      Message: {message}
    </div>
  );
}

export default App;
