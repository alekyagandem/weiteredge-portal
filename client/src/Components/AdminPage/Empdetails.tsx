import React,{useState,useEffect} from "react";
import { useUserContext } from "../loginPage/Usercontext";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

//This component helps to display the profiles of all the working employees
interface TableRowType{
    userId:number,
    username:string
}
interface ResponseType {
  user_id: number;
  name: string;
}

 function createTable(userId:number,username:string){
    return{ userId,username}
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
export const Employeetable=()=>{
//const {user}= useUserContext;
const [userdata, setuserData] = useState<ResponseType>();
const [rows, setRows] = useState<TableRowType[]>([]);

useEffect(() => {
  const userDetails = async () => {
    try {
      const response = await axios.get<{ message: string; data: ResponseType[] }>('http://localhost:2700/admin/getAllDetails/', {
      });

      // Handle the response data
      if (Array.isArray(response.data.data)) {
        const newRows = response.data.data.map((item) => createTable(item.user_id, item.name));
        setRows(newRows);
      }

      console.log("response data", response.data);
    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
    }
  };

  // Call the userDetails function
  userDetails();
}, []);

return (
    <TableContainer component={Paper} sx={tableContainerSx}>
      <Table sx={{ minWidth: 250, height: 30, padding: 100 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="right">userId</StyledTableCell>
            <StyledTableCell align="center">Username</StyledTableCell>

          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.slice(0).map((row, index) => (
            <StyledTableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: "1px solid" } }}
            >
              <StyledTableCell component="th" scope="row" align="right" >
                <Link to={`/empdetails/${row.userId}`}>
                {row.userId}
                </Link>
                
              </StyledTableCell>  
              <StyledTableCell  component="th" scope="row" align="center">{row.username}</StyledTableCell>
             
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};