import React, { useEffect, useState } from "react";
import hacker from '../../../public/images/png/hacker.png'
import Image from "next/image";
import { useApp } from "@/context/app";

function UserInfo() {
  const app = useApp()
  const jwt = app.jwt
  let teamId = app.user.team_id
  const [solved, setSolved] = useState([])
  const [unsolved, setUnSolved] = useState([])
  const [rank, setRank] = useState("#")
  const [loader, setLoader] = useState(false)

  const getSolvedChallenges = async () => {
    let token = `Bearer ${jwt}`
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${process.env.BASE_URL}/v1/solved`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setSolved(result.data)
        }
        else {
          setSolved([])
        }
      })
      .catch(error => console.log('error', error));
  }

  const getUnSolvedChallenges = async () => {
    let token = `Bearer ${jwt}`
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${process.env.BASE_URL}/v1/unsolved`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setUnSolved(result.data)
        }
        else {
          setUnSolved([])
        }
      })
      .catch(error => console.log('error', error));
  }

  const getRank = async () => {
    setLoader(true)
    let token = `Bearer ${jwt}`
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    await fetch(`${process.env.BASE_URL}/v1/scoreboard`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          const number = result.data.findIndex(item => item.id === teamId);
          setRank(number + 1)

        }
      })
      .catch(error => console.log('error', error));
    setLoader(false)
  }


  useEffect(() => {
    getSolvedChallenges()
    getUnSolvedChallenges()
    getRank()
  }, [])
  return (
    <div className="grid sm:grid-cols-5 w-full text-white">
      <div className="bg-main flex flex-col justify-center items-center py-8">
        <div className="text-[32px] font-[200]">RANK</div>
        <div className="text-[36px] font-[500]">{rank}</div>
      </div>
      <div className="bg-tertiary flex flex-col justify-center items-center py-8">
        <div className="text-[24px] font-[300]">{solved.length + unsolved.length}</div>
        <div className="text-[16px] font-[200]">Total</div>
      </div>
      <div className="bg-tertiary flex flex-col justify-center items-center py-8">
        <div className="text-[24px] font-[300]">{solved.length}</div>
        <div className="text-[16px] font-[200]">Solved</div>
      </div>
      <div className="bg-tertiary flex flex-col justify-center items-center py-8">
        <div className="text-[24px] font-[300]">{unsolved.length}</div>
        <div className="text-[16px] font-[200]">Unsolved</div>
      </div>
      <div className="sm:relative sm:h-full bg-tertiary flex flex-col justify-end items-center">
        <Image src={hacker} className="sm:absolute sm:w-full w-[60%]" alt="Hacker Image" aria-required priority />
      </div>
    </div>
  )
}

export default UserInfo