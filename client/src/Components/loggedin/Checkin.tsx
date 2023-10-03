
// import React, { useState, useEffect } from "react";
// import { useMyContext } from "./Mycontext";
// import Breaktime from "./Breaktime";
// import TextField from '@mui/material/TextField';

// const buttonStyle = {
//   backgroundColor: '#906697', // Blue background color
//   color: '#fff', // White text color
//   border: 'none',
//   borderRadius: '4px',
//   padding: '10px 20px',
//   cursor: 'pointer',
// };
// const Checkin = () => {
//   const toMilliseconds = (hrs: number, min: number, sec: number, cs: number) =>
//     (hrs * 60 * 60 + min * 60 + sec) * 1000 + cs;

//   const now = new Date();
//   const day = now.getUTCDate();
//   const month = now.getUTCMonth() + 1; // Month is zero-based, so add 1
//   const year = now.getUTCFullYear();

//   const [time, setTime] = useState<number>(
//     toMilliseconds(
//       now.getHours(),
//       now.getMinutes(),
//       now.getSeconds(),
//       now.getMilliseconds()
//     )
//   );
//   // console.log("Checkin Timestamp",day,month,year)
//   const [running, setRunning] = useState<boolean>(false);//This state defines the activeness of the checkin button
//   const { formatTime, checkoutTime,checkinTime,checkoutValue } = useMyContext();
//   const [inTime, setCheckinTime] = useState(0);

//   useEffect(() => {
//    let interval: string | number | NodeJS.Timeout | undefined;

//     if (running) {
//       interval = setInterval(() => {
//         setTime((prevTime) => prevTime + 10);
//       }, 10);
//     } else if (!running) {
//       clearInterval(interval);
//     }

//     return () => {
//       clearInterval(interval);
//     };
//   }, [running]);

//   const handleCheckinCheckout = () => {
//     if (running) {
//       // Checking out
//       checkoutTime(time);//Here 'time' represents the current time,which is always updated through the above useEffect method and thus can be passed actively.
//     } else {
//       // Checking in
      
//       setCheckinTime(time);
    
//       checkinTime(time);
       
//     }

//     setRunning(!running);
//   };
//   //console.log("Checkout value",checkoutValue)


//   return (
//     <div className="checkin">
//       <div className="numbers">
//         <span>{formatTime(time).hours}:</span>
//         <span>{formatTime(time).minutes}:</span>
//         <span>{formatTime(time).seconds}:</span>
//         <span>{formatTime(time).centiseconds}:</span>
//       </div>

//       <div className="buttons">
//         <button onClick={handleCheckinCheckout} style={buttonStyle}>
//           {running ? "Checkout" : "Checkin"}
//         </button>
//       </div>

//       {/* {inTime !== null && (
//         <div>
//           <p>Check-in time:</p>
//           <p>
//             {formatTime(inTime).hours}:
//             {formatTime(inTime).minutes}:
//             {formatTime(inTime).seconds}.
//             {formatTime(inTime).centiseconds}
//           </p>
//         </div>
//       )} */}
//       <Breaktime checkinrun={running}/>
//     </div>
//   );
// };

// export default Checkin;
import React, { useState, useEffect } from "react";
import { useMyContext } from "./Mycontext";
import Breaktime from "./Breaktime";
import TextField from '@mui/material/TextField';

const buttonStyle = {
  backgroundColor: '#009DDA', // Blue background color
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
  const day = now.getUTCDate();
  const month = now.getUTCMonth() + 1; // Month is zero-based, so add 1
  const year = now.getUTCFullYear();

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []); // Start the timer once when the component mounts

  const handleCheckinCheckout = () => {
    if (!running) {
      // Checking in for the first time
      setCheckinTime(time);
      checkinTime(time);
    } else {
      // Checking out
      checkoutTime(time);
    }

    setRunning(!running);
  };

  useEffect(()=>{
    if(inTime!==null)
    console.log("InTime Value", formatTime(inTime));
  console.log("Running",running)
  },[inTime,running])
  return (
    <div className="checkin">
      <div className="numbers">
        <span>{formatTime(time).hours}:</span>
        <span>{formatTime(time).minutes}:</span>
        <span>{formatTime(time).seconds}</span>
      </div>

      <div className="buttons">
        <button onClick={handleCheckinCheckout} style={buttonStyle}>
          {running ? (inTime === null ? "Checkin" : "Checkout") : "Checkin"}
        </button>
      </div>

      {inTime !== null && (
        <div>
          <p>Check-in time:</p>
          <p>
            {formatTime(inTime).hours}:
            {formatTime(inTime).minutes}:
            {formatTime(inTime).seconds}
          </p>
        </div>
      )}
      <Breaktime checkinrun={running} />
    </div>
  );
};

export default Checkin;
