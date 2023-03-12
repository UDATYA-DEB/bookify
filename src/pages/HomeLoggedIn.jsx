import React, {useState, useEffect} from 'react'
import { useFirebase } from '../context/firebase'
import BookCard from '../components/BookCard';
import { Button } from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup';

const HomeLoggedIn = () => {
    const firebaseContext = useFirebase();
    const [books, setBooks] = useState([])
    useEffect(()=>{
        firebaseContext.listAllBooks()
        .then((book)=>setBooks(book.docs))
    },[])

    return (
    <div className='container mt-5'>
        <Button variant='danger' onClick={firebaseContext.logOut}>Log Out</Button>
        <div className='container mt-5'>
            {
                books.length === 0 ? <p>No Books Available</p> : <CardGroup>
                {
                books.map((book)=>{
                    return <div key={book.id}><BookCard {...book.data()}/></div>
                })
                }
                </CardGroup>
            }
        </div>
    </div>
  )
}

export default HomeLoggedIn