import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import axios from "axios";
import { getUsers, deleteUser ,reset} from "../../../components/features/adminSlice/adminSlice";
import { useSelector, useDispatch } from "react-redux";




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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch()
  // const fetchUsers = async () => {
  //   const data = await axios.get("/api/users");
  //   setUser(data.data);
  // };
  const { users, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.users);
    useEffect(() => { 
    console.log("users use effect");
    dispatch(getUsers())
    return ()=>{
      dispatch(reset())
    }
  }, []);
  

  // const delete = async (id) => {
  //    dispatch(deleteUser(id))
  // };
  const blockUser = async (id) =>{
    await axios.put(`/api/users/block/${id}`)
    console.log("lllllllllooooooooooo");
    fetchUsers();
  }
  const unBlockUser = async (id) =>{
    await axios.put(`/api/users/unBlock/${id}`)
    console.log("lllllllll");
    fetchUsers();
  }


  return (
    <Box flex={4} p={2} sx={{ width: { xs: "50%", sm: "100%" } }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="right">Block/Unblock</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.username}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.email}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.isBlock ? (
                    <Button
                      style={{ backgroundColor: "blue", color: "white" }}
                      onClick={() => unBlockUser(row._id)}
                    >
                      UnBlock
                    </Button>
                  ) : (
                    <Button
                      style={{ backgroundColor: "red", color: "white" }}
                      onClick={() => blockUser(row._id)}
                    >
                      Block
                    </Button>
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={() => dispatch(deleteUser(row._id))}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
