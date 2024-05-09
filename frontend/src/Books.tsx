import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface booksType{
  _id:string,
  name:string,
  author:string,
  details:string,
  price:number
}

export default function SimpleContainer() {  
  const [books, setBooks] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control the visibility of the confirmation dialog
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null); // State to store the ID of the book to be deleted
  const navagate = useNavigate();
  const fetchData = async () =>{
    try {
      const response = await axios.get(`http://localhost:8080/api/books`)
      setBooks(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAdd = () => {
    navagate(`/create`)
  };

  const handleDelete = async (id:string) => {
    setSelectedBookId(id); // Set the selected book ID
    setShowConfirmation(true); // Display the confirmation dialog
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/books/${selectedBookId}`);
      setShowConfirmation(false); // Hide the confirmation dialog after successful deletion
      setSelectedBookId(null); // Reset the selected book ID
      fetchData(); // Refetch data to update the book list
    } catch (error) {
      console.log(error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false); // Hide the confirmation dialog
    setSelectedBookId(null); // Reset the selected book ID
  };

  const handleEdit = (id:string) => {
    navagate(`/update/${id}`)
  };

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
      <Typography variant="h2" gutterBottom textAlign="center">
        Book List
      </Typography>
      <Box
      my={4}
      display="flex"
      alignItems="center"
      justifyContent="end"
      p={2}
    >
       <Button onClick={() => handleAdd()} variant="contained" startIcon={<AddCircleOutlineRoundedIcon/>} color="success">Add</Button>
    </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Author</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((row:booksType,index:number) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.author}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                  <DeleteIcon color="error" onClick={() => handleDelete(row._id)}/>
                  <EditIcon color="warning" onClick={() => handleEdit(row._id)}/>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Container>
      <Dialog open={showConfirmation} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this book?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmDelete} color="primary">
            Confirm
          </Button>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}