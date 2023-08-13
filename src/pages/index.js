import React, { useEffect, useState } from "react";
import { setMenu } from "@/features/menu/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "@/components/CustomeTable";

const Home = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userData.userDetails);
  const jwt = useSelector(state => state.userData.jwt);
  const [option, setOption] = useState(0)
  const [allStudents, setAllStudents] = useState([])
  const [classStudents, setClassStudents] = useState([])
  const [classes, setClass] = useState()
  const [data, setData] = useState([])
  const [reload, setReload] = useState(false)

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

  const tableHeadersTeacher = ["Sr No.", "Username", "Email"];
  const tableColumnsTeacher = [
    { property: "id", indexing: true },
    { property: "username" },
    { property: "email" }
  ];

  async function getStudentAttendance() {
    await fetch(`api/attendance?userId=${user._id}`, {
      method: 'GET',
      headers: { Authorization: jwt }
    }).then(result => result.json()).then(async response => {
      if (response.status) {
        setData(response.data)
      } else {
        console.log("Error!")
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  async function getTeacherClass() {
    await fetch(`api/classes?teacher=${user._id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: jwt }
    }).then(result => result.json()).then(async response => {
      if (response.status) {
        if (response.data.length > 0) {
          setClass(response.data[0]._id)
          getClassStudents(response.data[0]._id)
          setReload(!reload)
        }
      } else {
        console.log("Error!")
      }
    }).catch((error) => {
      console.log(error)
    })
  }
  async function createClass(event) {
    event.preventDefault()
    const data = {
      name: event.target.class.value,
      teacher: user._id
    }

    const headerOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: jwt },
      body: JSON.stringify(data)
    }

    await fetch(`api/classes`, headerOptions).then(result => result.json()).then(async response => {
      console.log(response)
      if (response.status) {
        setClass(response.data._id)
        getClassStudents(response.data._id)
        setReload(!reload)
      } else {
        console.log("Error!")
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  async function getClassStudents(classId) {
    await fetch(`api/classes/${classId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: jwt }
    }).then(result => result.json()).then(async response => {
      if (response.status) {
        setClassStudents(response.data)
      } else {
        console.log("Error!")
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  async function getAllStudents() {
    await fetch(`api/classes/students`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: jwt }
    }).then(result => result.json()).then(async response => {
      if (response.status) {
        setAllStudents(response.data)
      } else {
        console.log("Error!")
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  async function addToClass(studentId) {
    const data = {
      studentId: studentId
    }

    const headerOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: jwt },
      body: JSON.stringify(data)
    }

    const url = `api/classes/${classes}`

    console.log("url", url)

    await fetch(url, headerOptions).then(result => result.json()).then(async response => {
      console.log(response)
      if (response.status) {
        getClassStudents(classes)
        setReload(!reload)
      } else {
        console.log("Error!")
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    dispatch(setMenu(0))
    if (user.role === "student") {
      getStudentAttendance()
    }
    else {
      if (user.class) {
        getTeacherClass()
        getAllStudents()
      } else {
        getAllStudents()
      }
    }
  }, [classes, classStudents, allStudents, option])

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
        <div className="px-4 md:px-20 lg:px-32 xl:px-60 py-20 flex flex-col justify-center items-start w-full h-full">
          <div className="mt-8 w-full flex justify-between items-center">
            <p className="text-[32px] text-secondary dark:text-darkSecondary">CLASS <strong className="text-main">ATTENDANCE</strong></p>
            <div>
              <button onClick={() => setOption(0)} className={option ? "px-4 py-2 rounded-md bg-transparent text-white text-[18px]" : "px-4 py-2 rounded-md bg-main text-white text-[18px]"}>Class</button>
              <button onClick={() => setOption(1)} className={option ? "px-4 py-2 rounded-md bg-main text-white text-[18px] ml-4" : "px-4 py-2 rounded-md bg-transparent text-white text-[18px]"}>Students</button>
            </div>
          </div>
          {
            option == 0 ?
              <div className="mt-8 w-full flex justify-between items-center">
                {
                  user.class ?
                    <div className="flex flex-col">
                      <div>
                        <p className="text-[24px] whitespace-nowrap text-secondary dark:text-darkSecondary">All <strong className="text-main">Students:</strong></p>
                      </div>
                      <div className="mt-4">
                        {
                          allStudents.map((data, index) => (
                            <div key={index} className="flex justify-between items-center mb-2 w-60">
                              <p className="text-[18px] text-secondary dark:text-darkSecondary">{index + 1}. {" "}</p>
                              <p className="text-[18px] text-secondary dark:text-darkSecondary mx-2">{data.username}</p>
                              <button onClick={() => {
                                addToClass(data._id)
                              }} type="button" className="ml-4 bg-main text-white border-2 border-main hover:border-2 hover:border-main hover:bg-transparent rounded-md px-2 py-1 w-fit text-end"> Add </button>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    :
                    <div className="w-full">
                      <form onSubmit={createClass} className="px-20 flex w-full">
                        <input id="class" name="class" className="mt-2 mr-2 w-full border-white border-2 rounded-md p-2 text-[#CBD5E1] placeholder:text-gray400 bg-transparent focus:outline-none focus:border-main" placeholder="Class Name" />
                        <input type="submit" className="mt-2 w-fit whitespace-nowrap border-white border-2 rounded-md p-2 text-[#CBD5E1] placeholder:text-gray400 bg-transparent focus:outline-none focus:border-main" value={"Create Class"} />
                      </form>
                    </div>
                }
              </div>
              :
              <div className="mt-8 w-full">
                <CustomTable headers={tableHeadersTeacher} columns={tableColumnsTeacher} data={classStudents} />
              </div>
          }
        </div>
      </div>
    );
  }
};

export default Home;
