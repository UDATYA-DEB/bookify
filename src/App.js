import { Route, Routes } from 'react-router-dom';
import { Button } from 'react-bootstrap';
//Components
import MyNavbar from './components/MyNavbar';
//Pages
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import NewBookInfo from './pages/NewBookInfo';
//CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <MyNavbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/books/new' element={<NewBookInfo />}/>
      </Routes>
    </>
  );
}

export default App;
