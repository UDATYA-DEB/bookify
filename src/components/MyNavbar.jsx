import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useFirebase } from '../context/firebase';

const MyNavbar = () => {
  const firebaseContext = useFirebase();
  return (
    <div>
      <Navbar bg="dark" variant="dark" fixed='top'>
        <Container>
          <Navbar.Brand href="/">Bookify.com</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {
              firebaseContext.isLoggedIn && <Nav.Link href="/books/new">Add Book</Nav.Link>
            }
            {
              firebaseContext.isLoggedIn && <Nav.Link href='/'>{firebaseContext.user.email}</Nav.Link>
            }
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default MyNavbar;