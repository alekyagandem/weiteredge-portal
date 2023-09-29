import React, { useState, useEffect } from 'react';
import {
    FormGroup,
    FormControlLabel,
    Switch,
    FormControl,
    FormLabel
} from '@mui/material'

import { useMyContext } from './Mycontext';

const ToggleStyle = {
    color: '#906697',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    
}

interface Running {
    checkinrun: boolean;
}//checkinrunning is used to define the state of the Checkin

const Breaktime: React.FC<Running> = ({ checkinrun }) => {
    const [running, setRunning] = useState(false);
    const [checked, setChecked] = useState(false);
    const { formatTime, updateTime, checkinValue, checkoutValue, updateBreakTime, breakValue } = useMyContext();
    const [breakStartTime, setBreakStartTime] = useState<number | null>(null);
    const [breakEndTime, setBreakEndTime] = useState<number | null>(null);

    useEffect(() => {
        // When checkinValue changes, reset the time to 0
    
        updateBreakTime((prevTime) => 0); // Reset breakValue to 0
        setChecked(false);
        setRunning(false);
    }, [checkinValue]);
    //This has to be changed because of the asynchronous nature of the function
   // console.log("Break time after time set to zero",breakValue);
    const handleChange = () => {
        setChecked((prevChecked) => !prevChecked);
        if (!checked && (checkoutValue !== null || 0)) {
            setRunning(true); // Store the start time of the break,which can be formatted into required style later.
             setBreakStartTime(Date.now());// Clear the break end time to indicate that it hasn't been set yet and parallely sets to null for every new row or day
             setBreakEndTime(null);
        } 
        else {
            setRunning(false);
            
            updateTime(breakValue); // Update time with breakValue
            if (breakStartTime !== null && breakEndTime === null) {
                console.log("entered into the breakend time ")
                const elapsedTime = Date.now() - breakStartTime;  // Calculate the elapsed time during the break
                setBreakEndTime(Date.now());// Update the breakEndTime with the current time,This gives the Breakended time 
                updateBreakTime((prevTime) => prevTime + elapsedTime); // Update the breakValue with the elapsed time
                setBreakStartTime(null);// Clear the breakStartTime to indicate that the break has ended
              }
            
        }
    };

    useEffect(() => {
        console.log("Break Start Time", breakStartTime);
      }, [breakStartTime]);
      
    useEffect(() => {
        console.log("Break End Time", breakEndTime);
      }, [breakEndTime]);
    useEffect(() => {
        console.log("Checked", checked);
      }, [checked]);
      

   useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
  
    if (running && checkinrun) {
      interval = window.setInterval(() => {
        updateBreakTime((prevTime: number) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
  
      if (!checkinrun) {
        console.log("Not running");
        
      }
    }
  
    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [running, checkinrun]);
  useEffect(() => {
    // When checkinValue changes, reset the time to 0

     // Reset breakValue to 0
    setChecked(false);
    setRunning(false);
}, [checkoutValue]);
useEffect(() => {
    console.log("checkinrun",checkinrun)
}, [checkinrun]);

    const showSwitch = (checkinrun === true);
    useEffect(() => {
        console.log("showSwitch",showSwitch)
    }, [showSwitch]);

    return (
        <div className="stopwatch">
            {checkinrun && checkinValue === 0 ? (
                <div className="numbers">
                    <span>{formatTime(breakValue).hours}:</span>
                    <span>{formatTime(breakValue).minutes}:</span>
                    <span>{formatTime(breakValue).seconds}:</span>
                    <span>{formatTime(breakValue).centiseconds}:</span>
                </div>
            ) : (
                <p></p>
            )}

            {showSwitch && (
                <FormControl component="fieldset">
                    <FormLabel component="legend"></FormLabel>
                    <FormGroup aria-label="position" row>
                        <FormControlLabel
                            value="Break"
                            control={
                                <Switch
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    style={ToggleStyle}
                                />
                            }
                            label="Break"
                            labelPlacement="end"
                        />
                    </FormGroup>
                </FormControl>
            )}
        </div>
    );
};

export default Breaktime;

