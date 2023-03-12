import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'
import { useFirebase } from '../context/firebase'
import { useNavigate } from 'react-router-dom'
import HomeLoggedIn from './HomeLoggedIn'

const Home = () => {
    const firebaseContext = useFirebase();
    const navigate = useNavigate()
  return (
    <div className='container mt-5'>
        {
        firebaseContext.isLoggedIn ? <div>
            <h1>Welcome</h1>
            <HomeLoggedIn />
        </div> : <div>
        <h1>Login or Register</h1>
            <Button className='mt-5' onClick={()=>navigate('/register')}>Register</Button><br />
            <Button className='mt-5' onClick={()=>navigate('/login')}>Log In</Button>
        </div>
        }
    </div>
  )
}

export default Home
