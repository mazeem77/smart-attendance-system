import React, { useContext } from 'react';
import { ActionsContext } from '../../context/context'
import Loader from "../shared/loader";
import { Close } from "@mui/icons-material";

const Scanner = () => {
  const { actions, setActions } = useContext(ActionsContext);
  return (
    <div className="w-[20%] min-w-[200px] border-2 border-white flex flex-col justify-start items-center h-[400px]">
      <div className="w-full">
        <p className="text-end p-4"><Close onClick={() => setActions({ ...actions, scan: null })} className="cursor-pointer text-main hover:text-red" /></p>
      </div>
      <div className="w-full flex flex-col justify-center items-center mt-20">
        <Loader />
        <p className="scanner-text">
          Scanning...
        </p>
      </div>
    </div >
  );
};

export default Scanner;