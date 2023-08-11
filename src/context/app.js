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

  useEffect(() => {

  }, [loading]);

  const contextValues = { session, loading, user };

  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
}
