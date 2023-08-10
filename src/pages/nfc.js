import nfc from '../../public/images/svg/nfc.svg';
import Scan from '../containers/Scan';
import Write from '../containers/Write';
import { useEffect, useState } from 'react';
import { ActionsContext } from '../context/context';
import { useDispatch } from "react-redux";
import { setMenu } from "@/features/menu/counterSlice";
import Image from "next/image";

function App() {

  const dispatch = useDispatch()
  const [option, setOption] = useState()
  const [log, setLog] = useState("Loading")

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
            };
            ndef.onreading = (event) => {
              setLog("NDEF message read.");
            };
          })
          .catch((error) => {
            setLog(`Error! Scan failed to start: ${error}.`);
          });
      } catch (error) {
        setLog("Argh! " + error);
      }
    }
    else {
      try {
        const ndef = new NDEFReader();
        ndef.onreading = (event) => setLog("We read a tag!");

        function write(data, { timeout } = {}) {
          return new Promise((resolve, reject) => {
            const ctlr = new AbortController();
            ctlr.signal.onabort = () => reject("Time is up, bailing out!");
            setTimeout(() => ctlr.abort(), timeout);

            ndef.addEventListener(
              "reading",
              (event) => {
                ndef.write(data, { signal: ctlr.signal }).then(resolve, reject);
              },
              { once: true },
            );
          });
        }

        await ndef.scan();
        try {
          await write("Hello World", { timeout: 5_000 });
        } catch (err) {
          setLog("Something went wrong", err);
        } finally {
          setLog("We wrote to a tag!");
        }

      } catch (error) {
        setLog("Argh! " + error);
      }
    }
  }

  useEffect(() => {
    dispatch(setMenu(2))
  }, [])

  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <Image src={nfc} className="w-40 mb-8" alt="logo" />
      <h1 className="font-bold text-main text-2xl mb-8">Actions</h1>
      <div className="flex justify-center items-center mb-8">
        <button onClick={() => {
          onHandleAction(0)
          setOption(0)
        }} className={option === 0 ? "text-main px-8 border-b-2 border-main" : " px-8 border-b-2 border-background"}>Scan</button>
        <button onClick={() => {
          onHandleAction(1)
          setOption(1)
        }} className={option === 1 ? "text-main px-8 border-b-2 border-main" : " px-8 border-b-2 border-background"}>Write</button>
      </div>
      {log}
    </div>
  );
}

export default App;
