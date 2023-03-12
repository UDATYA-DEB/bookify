import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const firebaseContext = useFirebase();
    const [user, setUser] = useState({email: "", pass: ""})
    const navigate = useNavigate();
    useEffect(()=>{
        if (firebaseContext.isLoggedIn){
            navigate('/')
        }
    }, [firebaseContext, navigate])

    const handleInput = (e)=>{
        e.preventDefault()
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        firebaseContext.loginUser(user)
        .then((reply)=>{
            alert("SignIn successful")
            console.log(reply)
        })
        .catch((err)=>{
            alert(err)
        })
        setUser({email: "", pass: ""})
    }

    const handleGoogleAuth = ()=>{
        firebaseContext.googleAuth()
        .then((result)=>{
            console.log(result)
        })
        .catch((err)=>{
            alert(err)
        })
    }

  return (
    <div className="container mt-5">
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name ='email' value={user.email} onChange={(e)=>handleInput(e)} placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name ='pass' value={user.pass} onChange={(e)=>handleInput(e)} placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
        <h1 className="mt-5 mb-5">OR</h1>
        <Button variant='danger' onClick={handleGoogleAuth}> <img src="https://cdn-teams-slug.flaticon.com/google.jpg" style={{height: '20px', width: '20px', borderRadius: '25px'}}/> Sign In with Google</Button>
    </div>
  )
}

export default Login