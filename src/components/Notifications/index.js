import React, { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#757575",
    },
    secondary: {
      main: "#757575",
    },
  },

});


function Notifications() {

  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    <div className="relative">
      <button
        ref={trigger}
        className={`w-[20px] h-[20px] flex items-center justify-center transition duration-150 rounded-full ${dropdownOpen}`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only text-main">Notifications</span>
        <ThemeProvider theme={theme}>
          <NotificationsNoneIcon color="primary" />
        </ThemeProvider>
        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-main border-2 border-background dark:border-darkBackground rounded-full"></div>
      </button>

      <div
        className={dropdownOpen ? "origin-top-right z-10 absolute top-full right-0 -mr-48 sm:mr-0 w-96 max-w-max border border-gray200 bg-background dark:border-darkGray200 dark:bg-darkBackground py-1.5 rounded shadow-2xl overflow-hidden mt-3" : "hidden"}
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="text-xs font-semibold uppercase pt-1.5 pb-2 text-main px-4">Notifications</div>
          <ul>
            <li className="border-b border-t border-gray200 dark:border-darkGray200 last:border-0">
              <Link
                className="block py-2 px-4 hover:bg-gray100 dark:hover:bg-darkGray100"
                href={"#0"}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="block text-sm mb-2 text-secondary dark:text-darkSecondary">📣 <span className="font-medium text-secondary dark:text-darkSecondary">Notification 1: </span> No New Notification</span>
                <span className="block text-xs font-medium text-secondary dark:text-darkSecondary">Today</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Notifications;