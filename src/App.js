import { BrowserRouter, Route, Routes ,Navigate} from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import LogIn from './component/LogIn';
import Register from './component/Register';
import AddOrder from './component/AddOrder';
import { useEffect, useState } from 'react';
import GetOrder from './component/GetOrder';
import NavvBar from './component/NavBar';

function App() {

  const [user , setUser] = useState();

  useEffect( () => {
    console.log("User state in APP",user);
  })

  return (
    <div className="App">
      
      <BrowserRouter >
      <NavvBar user = {user}  handleUser = {setUser}/>
        <Routes>
          <Route path='/' element={ user? <Home user={user} handleUser = {setUser}/> : <Navigate to='/login-user' /> } />
          <Route path='/login-user' element={ <LogIn handleUser = {setUser}/> }/>
          <Route path='/add-user' element={ <Register /> }/>
          <Route path='/add-order' element={user ? <AddOrder user = {user}/> : <Navigate to='/login-user'/> }/>
          <Route path='/get-order/:id' element={user ? <GetOrder user = {user}/> : <Navigate to='/login-user'/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
