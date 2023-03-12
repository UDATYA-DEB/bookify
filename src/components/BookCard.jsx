import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/firebase';

const BookCard = ({name, isbn, price, imageURL}) => {
    const firebaseContext = useFirebase();
    const [imageUrl, setImageUrl] = useState("");
    useEffect(()=>{
        firebaseContext.getImage(imageURL)
        .then((url)=>setImageUrl(url))
    },[])

    return (
        <Card style={{ width: '18rem', margin: '25px' }}>
          <Card.Img variant="top" src={imageUrl} style={{objectFit: 'cover', width: '100%', height: '250px'}} />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              The name of the book is {name} and its ISBN is {isbn} and its price is Rs. {price}.
            </Card.Text>
            <Button variant="primary">More Info</Button>
          </Card.Body>
        </Card>
      );
}

export default BookCard