import React,{useEffect,useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//This component is used to individual timesheet data of employees
interface TableRowType{
    userId:string,
    username:string,
    date:string
    checkintime:string,
    checkouttime:string,
    breaktime:string
}
interface ResponseType {
    user_id: string;
    name: string; 
  date:string
  checkIn_time:string,
  checkOut_time:string,
  totalbreak_time:string   
}
function createTable(userId:string,username:string, date:string,checkintime:string,
    checkouttime:string,breaktime:string){
    return{ userId,username,date,
        checkintime
        ,checkouttime,breaktime}
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
//   function formatDateTime(isoString: string | number | Date) {
//     const date = new Date(isoString);
//     const utcString = date.toISOString(); // Convert to UTC ISO string
//     return utcString.replace('T', ' ').replace('Z', ''); // Format as desired
//   }
function formatDateTime(dateTimeStr: string | number | Date) {
    const date = new Date(dateTimeStr);
    // Adjust date and time formatting as needed
    const formattedDate = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`;
    const formattedTime = `${date.getUTCHours().toString().padStart(2, '0')}:${date
      .getUTCMinutes()
      .toString()
      .padStart(2, '0')}:${date.getUTCSeconds().toString().padStart(2, '0')}`;
  
    return { formattedDate, formattedTime };
  }
  
  function DateandTime(utcString: string | number | Date){
    const date = new Date(utcString);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // Month is zero-based, so add 1
    const day = date.getUTCDate();
    return {year,month,day}
  }
  
  
export const Candidateinfo=()=>{
    const { userId } = useParams<{ userId: string }>();
    const [rows, setRows] = useState<TableRowType[]>([]);
    useEffect(() => {
        const empDetails = async () => {
          try {
            const response1= await axios.get<{ message: string; data: ResponseType[] }>(`http://localhost:2700/admin/getEmployeeDetails/${userId}`, {
            });
            const response2= await axios.get(`http://localhost:2700/admin/getUserbyId/${userId}`, {
            });
            
            // Wait for all requests to complete
            const data1 = response1.data.data;
            const data2 = response2.data.data;
            // Handle the response data
            if (Array.isArray(data1)) {
                console.log("inside")
                const newRows = data1.map((item1, index) => {
                 //const item2 = data2[index];
                  const { formattedDate, formattedTime } = formatDateTime(item1.checkIn_time);
                  return createTable(
                    data2.user_id,
                    data2.name,
                    formattedDate,
                    formatDateTime(item1.checkIn_time).formattedTime,
                    formatDateTime(item1.checkOut_time).formattedTime,
                    formatDateTime(item1.totalbreak_time).formattedTime
                  );
                });
                setRows(newRows);
              }
      
            console.log("response data", response1.data);
          } catch (error) {
            // Handle errors here
            console.error('Error:', error);
          }
        };
      
        // Call the userDetails function
        empDetails();
      }, []);
      return (
        <TableContainer component={Paper} sx={tableContainerSx}>
          <Table sx={{ minWidth: 250, height: 30, padding: 100 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="right">userId</StyledTableCell>
                <StyledTableCell align="center">Username</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">CheckinTime</StyledTableCell>
                <StyledTableCell align="center">Checkouttime</StyledTableCell>
                <StyledTableCell align="center">breaktime</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.slice(0).map((row, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: "1px solid" } }}
                >
                  <StyledTableCell component="th" scope="row" align="right" >
                    {row.userId}
                  </StyledTableCell>  
                  <StyledTableCell  component="th" scope="row" align="center">{row.username}</StyledTableCell>
                  <StyledTableCell  component="th" scope="row" align="center">{row.date}</StyledTableCell>
                  <StyledTableCell  component="th" scope="row" align="center">{row.checkintime}</StyledTableCell>
                  <StyledTableCell  component="th" scope="row" align="center">{row.checkouttime}</StyledTableCell>
                  <StyledTableCell  component="th" scope="row" align="center">{row.breaktime}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );

}