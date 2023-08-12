import { deleteAll, setUserDetails } from "@/features/user/userData";
import { useRouter } from "next/router";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

const AppContext = React.createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  return context;
}

export const AppProvider = ({ children }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const jwt = useSelector(state => state.userData.jwt);
  const [user, setUser] = useState();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getUserDetails() {
    await fetch(`api/user`, {
      method: 'GET',
      headers: { Authorization: jwt }
    }).then(response => {
      console.log(response)
      if (response.status === 200) {
        setSession(true)
        dispatch(setUserDetails(response.data))
        setUser(response.data)
      } else {
        setSession(false)
        dispatch(deleteAll())
        router.push("signin")
      }
    }).catch((error) => {
      console.log(error)
    }).finally(
      setLoading(false)
    )
  }

  useEffect(() => {
    getUserDetails()
  }, []);

  const contextValues = { session, loading, user };

  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
}
