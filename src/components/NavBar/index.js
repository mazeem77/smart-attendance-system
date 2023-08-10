import React, { useState } from 'react'
import Notifications from "../Notifications";
import UserMenu from "../UserMenu";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

function NavBar() {
  const dispatch = useDispatch()
  const menu = useSelector(state => state.counter.menu);

  return (
    <div className="flex flex-col justify-between items-start h-20 bg-background dark:bg-darkBackground px-20 py-2">
      <div className="h-full w-full flex justify-between items-center">
        <div className="mr-2 text-secondary dark:text-darkSecondary text-[24px] cursor-pointer">
          <Link href={"/"}>Smart<strong className="ml-[2px] text-main">Attendance</strong></Link>
        </div>
        <div>
          <ul className="flex">
            <li className={"mr-6 flex flex-col justify-center items-center hover:text-main" + (menu === 0 ? " text-main" : " text-secondary dark:text-darkSecondary")}>
              <Link href={'/'}>
                Home
              </Link>
              <div className={"h-[2px] w-[16px] rounded-xl" + (menu === 0 ? " bg-main" : " bg-background dark:bg-darkBackground")}></div>
            </li>
            <li className={"mr-6 flex flex-col justify-center items-center hover:text-main" + (menu === 1 ? " text-main" : " text-secondary dark:text-darkSecondary")}>
              <Link href={'/qr'}>
                QR
              </Link>
              <div className={"h-[2px] w-[16px] rounded-xl" + (menu === 1 ? " bg-main" : " bg-background dark:bg-darkBackground")}></div>
            </li>
            <li className={"mr-6 flex flex-col justify-center items-center hover:text-main" + (menu === 2 ? " text-main" : " text-secondary dark:text-darkSecondary")}>
              <Link href={'/nfc'}>
                NFC
              </Link>
              <div className={"h-[2px] w-[16px] rounded-xl" + (menu === 2 ? " bg-main" : " bg-background dark:bg-darkBackground")}></div>
            </li>
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center justify-center w-10 h-10 p-2 rounded-full border border-[#64748b] hover:bg-gray100 dark:hover:bg-main cursor-pointer">
            <Notifications />
          </div>
          <div>
            <UserMenu />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
