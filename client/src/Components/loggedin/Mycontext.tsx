import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the type for your context value
type MyContextType = {
  timeValue: number;
  checkoutValue:number;
  checkinValue:number;
  breakValue: number;
  formatTime: (milliseconds: number) => {
    hours: string;
    minutes: string;
    seconds: string;
    centiseconds: string;
    
  };
  updateTime: (newArg: number) => void;
  checkoutTime: (newArg: number) => void;
  checkinTime:(newArg: number) => void;
  updateBreakTime: (newArg: (prevTime: number) => number) => void;
};

// Create a context with an initial value
const MyContext = createContext<MyContextType | undefined>(undefined);

type MyProviderProps = {
  children: ReactNode;
};

export function MyProvider({ children }: MyProviderProps) {
  const [timeValue, settimeValue] = useState<number>(0); 
    const[checkoutValue,setCheckoutValue]=useState<number>(0);
    const[checkinValue,setCheckinValue]=useState<number>(0);
    const [running, setRunning] = useState<boolean>(false);
    const[breakValue,setBreakValue]=useState(0);

  const formatTime = (milliseconds: number) => {
    //This function purpose is to take the time value which is passed in milliseconds and then derive the respective human readable format of it.
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds% 1000) / 10);
    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      centiseconds: String(centiseconds).padStart(3, '0'),
    };
    
  };
  
  const updateTime = (newArg: number) => {
    settimeValue(newArg); 
  };
  const checkoutTime =async (newArg: number) => {
    setCheckoutValue(newArg);
    
  };
  const checkinTime = (newArg: number) => {
    setCheckinValue(newArg); 
  };
  const updateBreakTime = (newArg: (prevTime: number) => number) => {
    setBreakValue((prevTime) => newArg(prevTime));
  };
  
  
  const contextValue: MyContextType = {
    formatTime,
    timeValue,
    updateTime,
    checkoutValue,
    checkoutTime,
    checkinTime,
    checkinValue,
    breakValue,
    updateBreakTime
    
    
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext(): MyContextType {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
}
