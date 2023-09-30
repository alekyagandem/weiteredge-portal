// Checkout.tsx
import React, { useState, useEffect } from "react";
import { useMyContext } from "./Mycontext";

interface CheckoutProps {
  checkoutTime: (time: number) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ checkoutTime }) => {
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
  const { formatTime } = useMyContext();

  // useEffect(() => {
  //   let interval: string | number | NodeJS.Timeout | undefined;

  //   if (running) {
  //     interval = setInterval(() => {
  //       setTime((prevTime) => prevTime + 10);
  //     }, 10);
  //   } else if (!running) {
  //     clearInterval(interval);
  //   }

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [running]);

  // const handleCheckout = () => {
  //   if (running) {
  //     // Checking out
  //     checkoutTime(time);
  //   }

  //   setRunning(!running);
  // };
  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        setTime((prevTime) => prevTime + 10);
      }
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []); // Start the timer once when the component mounts

  const handleCheckout = () => {
    if (running) {
      // Checking out
      checkoutTime(time);
    }

    setRunning(!running);
  };

  return (
    <div className="checkout">
      <div className="numbers">
        <span>{formatTime(time).hours}:</span>
        <span>{formatTime(time).minutes}:</span>
        <span>{formatTime(time).seconds}:</span>
        <span>{formatTime(time).centiseconds}:</span>
      </div>

      <div className="buttons">
        <button onClick={handleCheckout}>
          {running ? null : "Checkin"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
