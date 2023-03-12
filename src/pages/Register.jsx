import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const firebaseContext = useFirebase();
    const [newUser, setNewUser] = useState({email: "", pass: "", rePass: ""})

    const navigate = useNavigate();
    useEffect(()=>{
        if (firebaseContext.isLoggedIn){
            navigate('/')
        }
    }, [firebaseContext, navigate])

    const handleInput = (e)=>{
        e.preventDefault()
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if (newUser.pass === newUser.rePass){
            firebaseContext.createUser(newUser)
            .then((reply)=>{
                alert("SignUp successful")
                console.log(reply)
            })
            .catch((err)=>{
                alert(err)
            })
            setNewUser({email: "", pass: "", rePass: ""})
        } else {
            alert('Password entered DO NOT Match. Please Check')
        }
    }

  return (
    <div className="container mt-5">
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name ='email' value={newUser.email} onChange={(e)=>handleInput(e)} placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name ='pass' value={newUser.pass} onChange={(e)=>handleInput(e)} placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Re-type Password</Form.Label>
                <Form.Control type="password" name ='rePass' value={newUser.rePass} onChange={(e)=>handleInput(e)} placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Create Account
            </Button>
        </Form>
    </div>
  )
}

export default Register