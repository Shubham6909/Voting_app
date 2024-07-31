import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './register/RegisterPage';
import Home from './components/Home';
import Login from './components/Login';
import VotingPage from './register/VotingPage'
import Protectedroute from './Protectedroute';
import Admin from './components/Admin';
import Add from './components/Add';
import Delete  from './components/Delete';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
           <Route path='/signup' element={<RegisterPage/>}/>
           <Route path="/home" element={<Home/>}/>
           <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Protectedroute/>}>
          <Route path="/vote" element={<VotingPage/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path='/candidate' element={<Add/>}/>
          <Route path='/delete' element={<Delete/>}/>
          </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
