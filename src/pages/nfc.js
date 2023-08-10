import nfc from '../../public/images/svg/nfc.svg';
import Scan from '../containers/Scan';
import Write from '../containers/Write';
import { useEffect, useState } from 'react';
import { ActionsContext } from '../context/context';
import { useDispatch } from "react-redux";
import { setMenu } from "@/features/menu/counterSlice";
import Image from "next/image";

function App() {

  const [actions, setActions] = useState(null);
  const { scan, write } = actions || {};
  const dispatch = useDispatch()
  const [option, setOption] = useState()
  const [log, setLog] = useState("Loading")

  const actionsValue = { actions, setActions };

  const onHandleAction = async (actions) => {
    if (actions === 0) {
      try {
        const ndef = new NDEFReader();
        await ndef.scan();
        setLog("> Scan started");

        ndef.addEventListener("readingerror", () => {
          setLog("Argh! Cannot read data from the NFC tag. Try another one?");
        });

        ndef.addEventListener("reading", ({ message, serialNumber }) => {
          setLog(`> Serial Number: ${serialNumber}`);
          setLog(`> Records: (${message.records.length})`);
        });
      } catch (error) {
        setLog("Argh! " + error);
      }
    }
    else {
      try {
        const ndef = new NDEFReader();
        await ndef.write("Hello world!");
        setLog("> Message written");
      } catch (error) {
        setLog("Argh! " + error);
      }
    }
  }

  useEffect(() => {
    if (scan) {
      setActions({ scan: null, write: null });
    }
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
