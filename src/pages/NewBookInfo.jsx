import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';

const NewBookInfo = () => {
    const [bookInfo, setBookInfo] = useState({name: "", isbn: "", price: "", coverPic: ""})
    const firebaseContext = useFirebase();
    const navigate = useNavigate();
    // console.log(firebaseContext.isLoggedIn)
    // useEffect(()=>{
    //     if (!firebaseContext.isLoggedIn){
    //         navigate('/')
    //     }
    // },[firebaseContext.isLoggedIn, navigate])

    const handleInput = (e)=>{
        e.preventDefault();
        e.target.name === 'coverPic' ? setBookInfo({...bookInfo, [e.target.name]: e.target.files[0]}) : setBookInfo({...bookInfo, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (firebaseContext.isLoggedIn){
            await firebaseContext.addNewBookDataToFirebase(bookInfo);
        } else {
            alert('You are not signed in')
            navigate('/')
        }
    }

  return (
    <div className="container mt-5">
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Book Name</Form.Label>
                <Form.Control type="text" name ='name' value={bookInfo.name} onChange={(e)=>handleInput(e)} placeholder="Enter Book Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>ISBN</Form.Label>
                <Form.Control type="text" name ='isbn' value={bookInfo.isbn} onChange={(e)=>handleInput(e)} placeholder="ISBN" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" name ='price' value={bookInfo.price} onChange={(e)=>handleInput(e)} placeholder="Price" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Cover Picture</Form.Label>
                <Form.Control type="file" name ='coverPic' onChange={(e)=>handleInput(e)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
  )
}

export default NewBookInfo