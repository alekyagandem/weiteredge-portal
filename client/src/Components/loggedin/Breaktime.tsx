import React, { useState, useEffect } from 'react';
import{
    FormGroup,
    FormControlLabel,
    Switch,
    FormControl,
    FormLabel
}from '@mui/material'

import { useMyContext } from './Mycontext';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

const Breaktime = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [checked, setChecked] = React.useState(false);
    const {formatTime , updateTime}= useMyContext();
    
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setChecked(event.target.checked);
if(!checked)
{
    setRunning(true)
}
else{
setRunning(false);
updateTime(time)
}
};

// if(!running)
// updateTime(time);
// const formatTime = (milliseconds: number) => {
//     const hours = Math.floor(milliseconds / 3600000);
//     const minutes = Math.floor((milliseconds % 3600000) / 60000);
//     const seconds = Math.floor((milliseconds % 60000) / 1000);
//     const centiseconds = Math.floor((milliseconds% 1000) / 10);
//     return {
//       hours: String(hours).padStart(2, '0'),
//       minutes: String(minutes).padStart(2, '0'),
//       seconds: String(seconds).padStart(2, '0'),
//       centiseconds: String(centiseconds).padStart(2, '0'),
//     };
    
//   };
  const timeValue = formatTime(time);
  const secondsValue = timeValue.seconds;
  console.log("Seconds Value",secondsValue)

  //   const hrs = Math.floor(time / 3600000);
  //   const min = Math.floor((time % 3600000) / 60000);
  //   const ss = Math.floor((time % 60000) / 1000);
  //   const cs = Math.floor((time % 1000) / 10);
  //  const hours= String(hrs).padStart(2, '0'),
  //     minutes= String(min).padStart(2, '0'),
  //     seconds=String(ss).padStart(2, '0'),
  //     centiseconds = String(cs).padStart(2, '0')    
  //   console.log("hours",hours,centiseconds,minutes,seconds)
  
 
  
    useEffect(() => {
      let interval: string | number | NodeJS.Timeout | undefined;
      if (running) {
        interval = setInterval(() => {
            
          setTime((prevTime) => prevTime + 10);
          
        }, 10);
      } else if (!running) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [running]);
    return (
       
      <div className="stopwatch">
        <div className="numbers">
          {/* <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span> */}
          <span>{formatTime(time).hours}:</span>
          <span>{formatTime(time).minutes}:</span>
          <span>{formatTime(time).seconds}:</span>
          <span>{formatTime(time).centiseconds}:</span>
        </div>
        {/* <Switch
  checked={checked}
  onChange={handleChange}
  inputProps={{ 'aria-label': 'controlled' }}
/> */}


    <FormControl component="fieldset">
  <FormLabel component="legend"></FormLabel>
  <FormGroup aria-label="position" row>
  
    <FormControlLabel
      value="Break"
      control={ <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />}
      label="Break"
      labelPlacement="end"
    />
     
   
   
   
  </FormGroup>
</FormControl>



        {/* <div className="buttons">
          <button onClick={() => setRunning(true)}>Start</button>
          <button onClick={() => setRunning(false)}>Stop</button>
          <button onClick={() => setTime(0)}>Reset</button>       
        </div> */}
      </div>

      
      
    );
  };

export default Breaktime;
