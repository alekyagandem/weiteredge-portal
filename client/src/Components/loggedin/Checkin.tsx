
// import React, { useState, useEffect } from "react";
// import { useMyContext } from "./Mycontext";
// const Checkin = () => {

 
//   const toMilliseconds = (hrs: number, min: number, sec: number, cs: number) =>
//   (hrs * 60 * 60 + min * 60 + sec) * 1000 + cs;

// const now = new Date();

// const milliseconds = toMilliseconds(
//   now.getHours(),
//   now.getMinutes(),
//   now.getSeconds(),
//   now.getMilliseconds()
// );

// console.log("Current time in milliseconds:", milliseconds);

//     const [time, setTime] = useState(milliseconds);
//     const [running, setRunning] = useState(false);
//     const {formatTime , checkoutTime}= useMyContext();
//     if(!running)
//     {
//     checkoutTime(time);
//     }
//     // const formatTime = (milliseconds: number) => {
//     //   const hours = Math.floor(milliseconds / 3600000);
//     //   const minutes = Math.floor((milliseconds % 3600000) / 60000);
//     //   const seconds = Math.floor((milliseconds % 60000) / 1000);
//     //   const centiseconds = Math.floor((milliseconds% 1000) / 10);
//     //   return {
//     //     hours: String(hours).padStart(2, '0'),
//     //     minutes: String(minutes).padStart(2, '0'),
//     //     seconds: String(seconds).padStart(2, '0'),
//     //     centiseconds: String(centiseconds).padStart(2, '0'),
//     //   };
      
//     // };

//     useEffect(() => {
      
//       let interval: string | number | NodeJS.Timeout | undefined;
//       if (running) {
//         console.log("To print running interval",interval)
//         interval = setInterval(() => {
//           setTime((prevTime) => prevTime + 10);
//         }, 10);
//       } else if (!running) {
//         clearInterval(interval);
//       }
//       return () => clearInterval(interval);
//     }, [running]);
//     return (
       
//       <div className="checkin">
//         <div className="numbers">
//         <span>{formatTime(time).hours}:</span>
//           <span>{formatTime(time).minutes}:</span>
//           <span>{formatTime(time).seconds}:</span>
//           <span>{formatTime(time).centiseconds}:</span>
//         </div>
        
//         <div className="buttons">

            
//                     {running ? (
//             <button onClick={() => setRunning(false)}>Checkout</button>
//             ) : (
//             <button onClick={() => setRunning(true)}>Checkin</button>
//             )}
            
            
//           {/* <button onClick={() => setRunning(true)}>Checkin</button>
//           <button onClick={() => setRunning(false)}>Checkout</button>
//           <button onClick={() => setTime(0)}>Reset</button>        */}
//         </div>
//       </div>

      
      
//     );
//   };
// export default Checkin;

import React, { useState, useEffect } from "react";
import { useMyContext } from "./Mycontext";

const Checkin = () => {
  const toMilliseconds = (hrs: number, min: number, sec: number, cs: number) =>
    (hrs * 60 * 60 + min * 60 + sec) * 1000 + cs;

  const now = new Date();

  const [time, setTime] = useState<number>(
    toMilliseconds(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    )
  );
  const [running, setRunning] = useState<boolean>(false);
  const { formatTime, checkoutTime,checkinTime } = useMyContext();
  const [inTime, setCheckinTime] = useState(0);

  useEffect(() => {
   let interval: string | number | NodeJS.Timeout | undefined;

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [running]);

  const handleCheckinCheckout = () => {
    if (running) {
      // Checking out
      checkoutTime(time);
    } else {
      // Checking in
      
      setCheckinTime(time);
      checkinTime(time);
       
    }

    setRunning(!running);
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
        <button onClick={handleCheckinCheckout}>
          {running ? "Checkout" : "Checkin"}
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
    </div>
  );
};

export default Checkin;
