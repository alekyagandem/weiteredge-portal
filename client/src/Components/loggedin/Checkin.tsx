import React, { useState, useEffect } from "react";
import { useMyContext } from "./Mycontext";
import Breaktime from "./Breaktime";
import TextField from '@mui/material/TextField';
import { useUserContext } from "../loginPage/Usercontext";
import axios from "axios";

const buttonStyle = {
  backgroundColor: '#906697', // Blue background color
  color: '#fff', // White text color
  border: 'none',
  borderRadius: '4px',
  padding: '10px 20px',
  cursor: 'pointer',
};

const Checkin = () => {
  const toMilliseconds = (hrs: number, min: number, sec: number, cs: number) =>
    (hrs * 60 * 60 + min * 60 + sec) * 1000 + cs;

  const now = new Date();
  // const day = now.getUTCDate();
  //const month = now.getUTCMonth() + 1; // Month is zero-based, so add 1
  const day = now.getUTCDate().toString().padStart(2, '0');

  const month = (now.getUTCMonth() + 1).toString().padStart(2, '0');

  const year = now.getUTCFullYear();
const currentDate=year+'-'+month+'-'+day
//console.log("currentDate",currentDate)
  const [time, setTime] = useState<number>(
    toMilliseconds(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    )
  );

  const { formatTime, checkoutTime, checkinTime, checkoutValue } = useMyContext();
  const [inTime, setCheckinTime] = useState<number | null>(null);
  const [running, setRunning] = useState<boolean>(false); // This state defines the activeness of the check-in button

  const { user } = useUserContext();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []); // Start the timer once when the component mounts

  const handleCheckinCheckout =async () => {
    if (!running) {
      // Checking in for the first time
      setCheckinTime(time);
      checkinTime(time);
    } else {
      // Checking out
      console.log("Else block")
       checkoutTime(time);
      console.log("updated checkouvalue",formatTime(checkoutValue))
    }

    setRunning(!running);
  };


  useEffect(() => {
    console.log("Updated checkoutValue in Checkin:", formatTime(checkoutValue));
  }, [checkoutValue])


  useEffect(()=>{
    if(inTime!==null)
    console.log("InTime Value", formatTime(inTime));
  console.log("Running",running)
  },[inTime,running])

  const [checkindata, setcheckinData] = useState({}); // You can define your state structure
  const [checkoutdata, setcheckoutData] = useState({}); 

  const postCheckinData = async () => {
    try {
      const response = await axios.post<ResponseType>(`http://localhost:2700/user/checkIn/`, {
        // Your request data goes here
       user_id:user?.user_id
      });

      // Handle the response data
      setcheckinData(response.data);
    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
    }
  };


  const postCheckoutData = async () => {
    const checkouttime = formatTime(checkoutValue);
    const formattedCheckouttime = `${checkouttime.hours}:${checkouttime.minutes}:${checkouttime.seconds}.${checkouttime.centiseconds}`;
    const final = `${currentDate}T${formattedCheckouttime}`;
    const id = user?.user_id;
    console.log("formatted checkin time from checkin",checkouttime)
    try {
      const response = await axios.put<ResponseType>(`http://localhost:2700/user/checkOut/${id}`, {
        checkout_date: final,
      });

      // Handle the response data
      setcheckoutData(response.data);
    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
    }
  };

  const handleClick = async () => {
   await  handleCheckinCheckout()
      if (running) 
      {
      if (inTime === null) {
       postCheckinData();
      } else {
        postCheckoutData();
      }
    } 
    else {
       postCheckinData();
    }
    
  };
    
  
  return (
    <div className="checkin">
      <div className="numbers">
        <span>{formatTime(time).hours}:</span>
        <span>{formatTime(time).minutes}:</span>
        <span>{formatTime(time).seconds}:</span>
        <span>{formatTime(time).centiseconds}:</span>
      </div>

      <div className="buttons">
        <button onClick={handleClick} style={buttonStyle}>
          {running ? (inTime === null ? "Checkin" : "Checkout") : "Checkin"}
        </button>
      </div>

      {inTime !== null && (
        <div>
          <p>Check-in time:</p>
          <p>
            {formatTime(inTime).hours}:
            {formatTime(inTime).minutes}:
            {formatTime(inTime).seconds}.
            {formatTime(inTime).centiseconds}
          </p>
        </div>
      )}
      <Breaktime checkinrun={running} />
    </div>
  );
};

export default Checkin;
