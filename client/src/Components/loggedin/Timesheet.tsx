import React,{useEffect,useState} from "react";

import { useMyContext } from "./Mycontext";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createTable(
    Date: String,
    CheckIn: String,
    Checkout: String,
    Breaktime: String
){
    return { Date,CheckIn,Checkout,Breaktime};
}


const Timesheet=()=>{

    const {formatTime,timeValue,checkoutValue,checkinValue}= useMyContext();
  
    const breakTime=formatTime(timeValue);
    const checkoutTime=formatTime(checkoutValue);
    const checkinTime=formatTime(checkinValue);
    console.log("display time value and checkout time",breakTime.centiseconds)
    const formattedBreaktime = `${breakTime.hours}:${breakTime.minutes}:${breakTime.seconds}.${breakTime.centiseconds}`;
    const formattedCheckouttime=`${checkoutTime.hours}:${checkoutTime.minutes}:${checkoutTime.seconds}.${checkoutTime.centiseconds}`;
    const formattedCheckintime=`${checkinTime.hours}:${checkinTime.minutes}:${checkinTime.seconds}.${checkinTime.centiseconds}`;

    const currentDate=new Date();
    const formattedDate=currentDate.toLocaleString();
    console.log("Dateeeeeeeeeee",formattedDate)
    const rows=[
        createTable(formattedDate,formattedCheckintime,formattedCheckouttime,formattedBreaktime)
];
    return(

        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Date</TableCell>
              <TableCell align="center">Checkin Time</TableCell>
              <TableCell align="center">Checkout Time</TableCell>
              <TableCell align="center">BreakTime</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: '1px solid'  } }}
              >
                <TableCell component="th" scope="row" align="right">
                  {row.Date}
                </TableCell>
                <TableCell align="center">{row.CheckIn}</TableCell>
                <TableCell align="center">{row.Checkout}</TableCell>
                <TableCell align="center">{row.Breaktime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        // <div>
        //     <h3>BreakTime</h3>
        //     <span>{formatTime(timeValue).hours}</span>
        //     <span>{formatTime(timeValue).minutes}:</span>
        //     <span>{formatTime(timeValue).seconds}:</span>
        //     <span>{formatTime(timeValue).centiseconds}</span>
        
        //     <h3>Checkout Time</h3>
        //    <span>{formatTime(checkoutValue).hours}:</span>
        //    <span>{formatTime(checkoutValue).minutes}:</span>
        //    <span>{formatTime(checkoutValue).seconds}:</span>
        //    <span>{formatTime(checkoutValue).centiseconds}:</span>
        // </div>

    )
}
export default Timesheet;