import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';

interface booksType{
  _id:string,
  name:string,
  author:string,
  details:string,
  price:number
}

export default function SimpleContainer() {
  const {id} = useParams()
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [details, setDetails] = useState('');
  const [price, setPrice] = useState('');
  const [nameError, setNameError] = useState('');
  const [authorError, setAuthorError] = useState('');
  const [detailsError, setDetailsError] = useState('');
  const [priceError, setPriceError] = useState('');
  const navagate = useNavigate();

  const fetchData = async () =>{
    try {
      const response = await axios.get(`http://localhost:8080/api/books/${id}`)
      console.log(response.data)
      setName(response.data.name)
      setAuthor(response.data.author)
      setDetails(response.data.details)
      setPrice(response.data.price)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);// eslint-disable-line react-hooks/exhaustive-deps
  
  const checkDuplicateName = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/books');
      const books = response.data; // assuming response.data is an array of book objects
      const isDuplicate = books.some((book:booksType) => book.name === name && book._id !== id);
      return isDuplicate;
    } catch (error) {
      console.error('Error checking duplicate name:', error);
      return false; // assuming no duplicate check is better than blocking due to an error
    }
  };

  const handleSubmit = async (e:React.SyntheticEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const isDuplicate = await checkDuplicateName();
        if (isDuplicate) {
          setNameError('This name already exists. Please choose another name.');
          return;
        }
        const response = await axios.put(`http://localhost:8080/api/books/${id}`, {name,author,details,price})
        console.log(response)  
        navagate(`/`)
      } catch (error) {
        console.log(error)
      }
    }
  }  

  const validateForm = () => {
    let isValid = true;
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    if (!author.trim()) {
      setAuthorError('Author is required');
      isValid = false;
    } else {
      setAuthorError('');
    }
    if (!details.trim()) {
      setDetailsError('Details are required');
      isValid = false;
    } else {
      setDetailsError('');
    }
    const priceString = price.toString(); // Convert price to string
    if (!priceString.trim()) {
      setPriceError('Price is required');
      isValid = false;
    }else {
      setPriceError('');
    }
    return isValid;
  };

  const handleBack = () => {
    navagate(`/`)
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
      <Typography variant="h2" gutterBottom textAlign="center">
        Update Book
      </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField required id="name" value={name} label="Name" variant="outlined" fullWidth onChange={(e)=>setName(e.target.value)} 
              error={!!nameError}
              helperText={nameError}/>
            </Grid>
            <Grid item xs={12}>
              <TextField required id="author" value={author} label="Author" variant="outlined" fullWidth onChange={(e)=>setAuthor(e.target.value)} 
              error={!!authorError}
              helperText={authorError}/>
            </Grid>
            <Grid item xs={12}>
              <TextField required id="details" value={details} label="Details" variant="outlined" fullWidth onChange={(e)=>setDetails(e.target.value)} 
              error={!!detailsError}
              helperText={detailsError}/>
            </Grid>
            <Grid item xs={12}>
              <TextField required id="price" value={price} label="Price" variant="outlined" fullWidth onChange={(e)=>setPrice(e.target.value)} 
              error={!!priceError}
              helperText={priceError}/>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" gap={1}>
                <Button variant="contained" color="success" type="submit">Update</Button>
                <Button variant="contained" color="primary" onClick={handleBack}>Back</Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}