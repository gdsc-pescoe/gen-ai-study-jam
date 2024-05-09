"use client"
import React, { useState, useRef, useEffect } from 'react'
import TableBody from './TableBody'
import dataArr from '../../public/data.json'
import Speedometer from "@/components/Speedometer";
import Image from "next/image";
// import Speedometer from './Speedometer';

function TableIndex() {
  // JSON file gone print here
  const Ref = useRef(null);

  const imported_data = JSON.stringify(dataArr);
  const data = JSON.parse(imported_data);
  const [Participationdata, setParticipationdata] = useState([...data]);
  const [EligibleforSwags, setEligibleforSwags] = useState(0);



  const calculateTotalEligibility = () => {
    let total = 0;
    data.forEach((ele) => {
      ele["All 3 Pathways Completed - Yes or No"] == "Yes" && total++;
    })
    setEligibleforSwags(total)
  }

  const searchname = (name) => {
    const newArr = [];
    for (let i = 0; i < data.length; i++) {
      let participant = data[i]["User Name"].toLowerCase();
      let match = participant.includes(name.toLowerCase());
      if (match) newArr.push(data[i]);

    }
    // console.log(newArr);
    setParticipationdata(newArr);
  }
  // const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState('00:00:00');

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total, hours, minutes, seconds
    };
  }

  const startTimer = (e) => {
    let { total, hours, minutes, seconds }
        = getTimeRemaining(e);
    if (total >= 0) {

      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
          (hours > 9 ? hours : '0' + hours) + ' HOURS |' +
          (minutes > 9 ? minutes : '0' + minutes) + ' MINUTES |'
          + (seconds > 9 ? seconds : '0' + seconds) + ' SECONDS'
      )
    }
  }

  const clearTimer = (e) => {

    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer('00:00:00');

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000)
    Ref.current = id;
  }

  const getDeadTime = () => {
    let deadline = new Date();

    return 'Tue May 28 2024 12:00:00 GMT+0530 (India Standard Time)';

  }


  useEffect(() => {
    calculateTotalEligibility();
    clearTimer(getDeadTime());

  }, [])


  return (
    <div className='w-full relative px-3'>

      <div className="sec m-auto my-10 space-y-8 w-1/2 mob:w-full flex flex-col">

        <div className="message bg-yellow-100 text-yellow-700 p-5 rounded-lg shadow-lg shadow-yellow-300/30 text-center border border-yellow-300/30">
          <p className="text-center">


            {/*<div className="message bg-yellow-100 text-yellow-700 p-5 rounded-lg shadow-lg shadow-yellow-300/30 text-center border border-yellow-300/30"><p className="text-center">⏰ Tick Tick Tick 🚀🎉</p>*/}
            {/*  <br></br>*/}
            {/*  <h2 className={'font-size:40px'} >{timer}</h2>*/}
            {/*</div>*/}
          </p>
          <br></br>
          {/*We appreciate your participation and dedication to learning about Google GEN AI technologies. We hope you*/}
          {/*enjoyed the sessions and learned something new. We are excited to see you all at the next campaign. <br></br>*/}


        </div>
        {/*<div class=" message bg-blue-100 text-yellow-700 p-5 rounded-lg shadow-lg shadow-blue-300/30 text-center border border-blue-300/30">*/}
        {/*  <div class="text-center">*/}
        {/*    <a href="https://certificate.gdscpescoe.tech/" target="_blank" rel="noopener noreferrer">*/}
        {/*    <p>  <Image*/}
        {/*        class={"m-auto"}*/}
        {/*          src="/assets/animation_lod91n0o_small.gif"*/}
        {/*          alt="me"*/}
        {/*          width="64"*/}
        {/*          height="64"*/}

        {/*      />*/}
        {/*    </p>*/}
        {/*      <p class="text-2xl font-semibold text-blue-700">Get Certificate</p>*/}
        {/*    </a>*/}
        {/*  </div>*/}
        {/*</div>*/}





        {/*<Speedometer*/}
        {/*  completion={EligibleforSwags}*/}
        {/*/>*/}

        <div className="info flex mob:flex-col mob:justify-center mob:items-center mob:space-y-10 mob:p-5 justify-evenly space-x-3 mob:space-x-0">
          <div className="eligibleforswag w-fit mob:w-full h-20 p-5 space-x-5 rounded-lg flex flex-row justify-evenly mob:justify-between items-center bg-green-50 shadow-lg shadow-green-300/30 border border-green-200">
            <p className="text-center mob:text-start text-sm text-green-400">No of Eligible <br /> Participants for Certification</p>
            <p className="no text-2xl border-l-2 border-l-green-700 pl-3 text-green-800">{EligibleforSwags}</p>
          </div>
          <div className="eligibleforswag w-fit mob:w-full h-20 p-5 space-x-5 rounded-lg flex flex-row justify-evenly mob:justify-between items-center bg-blue-50 shadow-lg shadow-blue-300/30 border border-blue-200">
            <p className="text-center mob:text-start text-sm text-blue-400">Total No of <br />Participants</p>
            <p className="no text-2xl border-l-2 border-l-blue-700 pl-3 text-blue-800">{data.length}</p>
          </div>
        </div>

        <div className="search m-auto mt-3 mob:py-3 py-2  space-x-5  flex justify-start items-center shadow-lg shadow-blue-400/30 bg-blue-50 w-full rounded-full">
          <div className="icon px-3 "><svg xmlns="http://www.w3.org/2000/svg" className='h-5' viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill="#3b82f6" /></svg></div>
          <div className="input w-full">
            <input
              onChange={(e) => {
                searchname(e.target.value)
              }}
              className='bg-transparent mob:text-lg text-base outline-none w-full' type="text" name="searchbar" id="searchbar" placeholder='Search Your Name Here' />
          </div>
        </div>
      </div>

      <table className='mx-auto table-fixed m-5 scroll-auto  ' >
        <thead className='shadow-md text-sm bg-blue-500 text-gray-200 sticky top-2 z-10'>
          <tr className='text-center'>
            <td className="rounded-ss-lg w-80 p-2 border-r-2 border-r-gray-300">Student Name</td>
            {/* <td className="p-2 border-r-2 border-r-gray-300">Email</td> */}
            <td className="p-2 border-r-2 border-r-gray-300">Course Redemption Status</td>
            <td className="mob:hidden p-2 px-10 border-r-2 border-r-gray-300">All 3 Pathways Completed</td>
            <td className="mob:hidden p-2 border-r-2 border-r-gray-300 max-w-[150px]">Prompt Design in Vertex AI Completion</td>
            <td className="mob:rounded-se-lg visible p-2 border-r-2 border-r-gray-300  max-w-[150px]"> Develop GenAI Apps with Gemini and Streamlit Completion </td>
            <td className="mob:hidden rounded-se-lg  p-2 border-r-2 border-r-gray-300 max-w-[150px]">Gen AI Arcade Game Completion</td>
            {/*<td className="mob:hidden p-2 max-w-[150px]">GenAI Completed</td>*/}
            {/* <td className="p-2 border-r-2 border-r-gray-300">Enroll Date & Time</td> */}
            {/* <td className="p-2 border-r-2 border-r-gray-300">Enroll. Status</td> */}
            {/* <td className='p-2 border-r-2 border-r-gray-300'>Profile URL</td> */}
          </tr>
        </thead>
        <TableBody
          Participationdata={Participationdata}
          setParticipationdata={setParticipationdata}
        />
      </table>

    </div>
  )
}

export default TableIndex
