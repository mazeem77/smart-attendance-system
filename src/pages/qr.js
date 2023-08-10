import React, { useEffect } from 'react';
import { useQRCode } from 'next-qrcode';
import { useDispatch } from "react-redux";
import { setMenu } from "@/features/menu/counterSlice";

function Scan() {
  const { Canvas } = useQRCode();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setMenu(1))
  })
  return (
    <div className="border-2 border-main w-fit rounded-xl">
      <Canvas
        text={'234'}
        options={{
          errorCorrectionLevel: 'M',
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            dark: '#0EB8D0',
            light: '#00000000',
          },
        }}
      />
    </div>
  );
}

export default Scan;
