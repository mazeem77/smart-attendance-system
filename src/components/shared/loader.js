import React from "react";
import spinner from '../../../public/images/svg/spinner.svg'
import Image from "next/image";

function Loader() {
  return (
    <div className="flex justify-center items-center h-full w-full z-10">
      <div className="flex justify-center items-center h-full w-full">
        <Image className="w-6" src={spinner} alt="spinnerLogo" required priority />
      </div>
    </div>
  )
}

export default Loader