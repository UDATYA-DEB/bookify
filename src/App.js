import { Route, Routes } from 'react-router-dom';
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
        <Route path='/' element={<><div className='header-space'></div><Home /></>}/>
        <Route path='/login' element={<><div className='header-space'></div><Login /></>}/>
        <Route path='/register' element={<><div className='header-space'></div><Register /></>}/>
        <Route path='/books/new' element={<><div className='header-space'></div><NewBookInfo /></>}/>
      </Routes>
    </>
  );
}

export default App;
