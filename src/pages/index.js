import React, { useEffect } from "react";
import { setMenu } from "@/features/menu/counterSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setMenu(0))
  })
  return (
    <div>
      <div className="text-[#00000000]">
      </div>
    </div>
  );
};

export default Home;
