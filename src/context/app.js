import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAll, setUserDetails } from "@/features/user/userData";
import { useRouter } from "next/router";

const AppContext = React.createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  return context;
}

export const AppProvider = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getUserDetails() {
    let token = `Bearer ${jwt}`
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    await fetch(`${process.env.BASE_URL}/v1/user`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          dispatch(setUserDetails(result.data))
          setUser(result.data)
        }
        else {
          console.log("error")
        }
      })
      .catch(error => console.log('error', error));
    setLoading(false)
  }


  useEffect(() => {
    // getUserDetails()
  }, [loading]);

  const contextValues = { session, loading, user };

  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
}
