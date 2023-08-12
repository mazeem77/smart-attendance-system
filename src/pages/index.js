import React, { useEffect, useState } from "react";
import { setMenu } from "@/features/menu/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "@/components/CustomeTable";

const Home = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userData.userDetails);
  const jwt = useSelector(state => state.userData.jwt);
  const [data, setData] = useState([])

  const tableHeaders = ["Sr No.", "Date", "Status"];
  const tableColumns = [
    { property: "id", indexing: true },
    {
      property: "createdAt", transform: (data) => {
        const date = new Date(data)
        return date.toDateString()
      }
    },
    { property: "status", transform: (data) => data ? "Present" : "absent" }
  ];
  async function getStudentId() {

    await fetch(`api/attendance?userId=${user._id}`, {
      method: 'GET',
      headers: { Authorization: jwt }
    }).then(result => result.json()).then(async response => {
      if (response.status) {
        setData(response)
      } else {
        setData(response)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    dispatch(setMenu(0))
    getStudentId()
  }, [])

  if (user.role === "student") {
    return (
      <div className="px-4 md:px-20 lg:px-32 xl:px-60 py-20 flex flex-col justify-center items-start w-full h-full">
        <p className="text-[32px] text-secondary dark:text-darkSecondary">CLASS <strong className="text-main">ATTENDANCE</strong></p>
        <div className="mt-8 w-full">
          <CustomTable headers={tableHeaders} columns={tableColumns} data={data} />
        </div>
      </div>
    );
  }
  else {
    return (
      <div>
        <div className="text-[#00000000]">
        </div>
      </div>
    );
  }
};

export default Home;
