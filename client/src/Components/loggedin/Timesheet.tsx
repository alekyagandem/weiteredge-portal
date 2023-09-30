
import React, { useEffect, useState } from "react";
import { useMyContext } from "./Mycontext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

  function createTable(Date: string, CheckIn: string, Checkout: string, Breaktime: string) {
    return { Date, CheckIn, Checkout:"00:00:00.00", Breaktime: "00:00:00.00" };
  }
interface TableRowType {
  Date: string;
  CheckIn: string;
  Checkout: string;
  Breaktime: string;
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const tableContainerSx = {
  border: "1px solid rgba(128,128,128,0.4)",
  width: "100",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "20px",
  borderRadius: 2,
  maxHeight: 500
};
const Timesheet = () => {
  const { formatTime, timeValue, checkoutValue, checkinValue,checkoutTime,updateBreakTime,breakValue} = useMyContext();

  //const breakTime = formatTime(timeValue);
  const breakTime=formatTime(breakValue)
  const checkouttime = formatTime(checkoutValue);
  const checkintime = formatTime(checkinValue);

  const formattedBreaktime = `${breakTime.hours}:${breakTime.minutes}:${breakTime.seconds}.${breakTime.centiseconds}`;
  const formattedCheckouttime = `${checkouttime.hours}:${checkouttime.minutes}:${checkouttime.seconds}.${checkouttime.centiseconds}`;
  const formattedCheckintime = `${checkintime.hours}:${checkintime.minutes}:${checkintime.seconds}.${checkintime.centiseconds}`;

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();

  // State to store rows
  
  const [rows, setRows] = useState<TableRowType[]>([]);

  // State to keep track of the previous checkin value
  const [prevCheckin, setPrevCheckin] = useState("");
  const [prevCheckout, setPrevCheckout] = useState("");
  const[prevBreaktime,setPrevBreaktime]=useState("");
  // const [currentSessionIndex, setCurrentSessionIndex] = useState<number | null>(null);

  useEffect(() => {
    if (prevCheckin !== formattedCheckintime) {
     
      const newRow = createTable(
        formattedDate,
        formattedCheckintime,
        "00:00:00.00", // Initiating checkout time with this value
        "00:00:00.00"  
      );
  
      // Add the new row to the rows state
      setRows((prevRows) => [...prevRows, newRow]);
      setPrevCheckin(formattedCheckintime);// Update the previous check-in value
      // updateBreakTime(0)
      // setPrevBreaktime("00:00:00.00");
    } else if (prevCheckout !== formattedCheckouttime) {
  
      const rowIndexToUpdate = rows.findIndex((row) => row.CheckIn === prevCheckin); // Finding the index of the row with the same check-in time
  
      if (rowIndexToUpdate !== -1) {
        
        const updatedRows = [...rows];// Updating the existing row's checkout time and break time
        updatedRows[rowIndexToUpdate].Checkout = formattedCheckouttime;
        
        setRows(updatedRows);
      }
      setPrevCheckout(formattedCheckouttime);// Update the previous checkout value
     
    }
    else if(prevBreaktime !== formattedBreaktime)
    {
      const rowIndexToUpdate = rows.findIndex((row) => row.CheckIn === prevCheckin);// Finding the index of the row with the same check-in time
      if (rowIndexToUpdate !== -1) {
        const updatedRows = [...rows];// Updating the existing row's checkout time and break time
        updatedRows[rowIndexToUpdate].Breaktime = formattedBreaktime;
        setRows(updatedRows);
      }
      setPrevBreaktime(formattedBreaktime);
    }
  }, [formattedDate, formattedCheckintime, formattedCheckouttime, formattedBreaktime, prevCheckin, prevCheckout,prevBreaktime,rows]);

  // useEffect(() => {
  //   console.log("FormattedCheckintime",formattedCheckintime);
  //   console.log("FormattedCheckouttime",formattedCheckouttime);
  //   console.log("FormattedBreaktime",formattedBreaktime)
  // }, [formattedCheckintime,formattedBreaktime,formattedCheckouttime]);
  
  return (
    <TableContainer component={Paper} sx={tableContainerSx}>
      <Table sx={{ minWidth: 250, height: 30, padding: 100 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="center">Checkin Time</StyledTableCell>
            <StyledTableCell align="center">Checkout Time</StyledTableCell>
            <StyledTableCell align="center">BreakTime</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.slice(1).map((row, index) => (
            <StyledTableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: "1px solid" } }}
            >
              <StyledTableCell component="th" scope="row" align="right">
                {row.Date}
              </StyledTableCell>  
              <StyledTableCell align="center">{row.CheckIn}</StyledTableCell>
              <StyledTableCell align="center">{row.Checkout}</StyledTableCell>
              <StyledTableCell align="center">{row.Breaktime}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Timesheet;
