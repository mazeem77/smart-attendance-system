import React, { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { deleteAll } from '../../features/user/userData';
import Image from "next/image";
import Person from "../../../public/images/svg/person.svg";

function UserMenu() {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(state => state.userData.userDetails);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative inline-flex ml-3">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group bg-white dark:bg-darkBackground rounded-full w-10 h-10 border border-[#64748b] hover:bg-gray100 dark:hover:bg-main"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <Image priority src={Person} alt="User" />
      </button>

      <div
        className={dropdownOpen ? "origin-top-right z-10 absolute top-full right-0 min-w-[180px] border border-gray200 bg-background dark:bg-darkBackground py-1.5 rounded shadow-lg overflow-hidden mt-1" : "hidden"}
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray200">
            <div className="font-medium text-main">{data.username}</div>
            <div className="text-xs text-secondary dark:text-darkSecondary italic">{data.is_captain ? "Captain" : "Player"}</div>
          </div>
          <ul>
            <li
              onClick={() => {
                setDropdownOpen(!dropdownOpen)
                window.location.href = '/'
              }
              } className="hover:bg-main dark:hover:bg-main cursor-pointer"
            >
              <div
                className="font-medium text-sm text-secondary dark:text-darkSecondary hover:text-text dark:hover:text-darkText flex items-center py-1 px-3"
                href={"/"}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Settings
              </div>
            </li>
            <li
              onClick={() => {
                setDropdownOpen(!dropdownOpen)
                dispatch(deleteAll())
                window.location.href = '/signin'
              }
              } className="hover:bg-main dark:hover:bg-main cursor-pointer">
              <div
                className="font-medium text-sm text-secondary dark:text-darkSecondary hover:text-text dark:hover:text-darkText flex items-center py-1 px-3"
              >
                Sign Out
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div >
  )
}

export default UserMenu;