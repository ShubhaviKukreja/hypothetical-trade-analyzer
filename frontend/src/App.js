import './App.css';
<<<<<<< HEAD
import Login from '../src/Components/Login/login.jsx'
import SignUp from '../src/Components/SignUp/SignUp.jsx'
// import StockList from './Components/MainPage/mainpage.jsx'
// import Main from '../src/Components/ParticularStock/particularStock.js'
import{
  BrowserRouter as Router , Routes,Route
} from 'react-router-dom'
import Profile from '../src/Components/Profile/profile.jsx'
import NavBar from '../src/Components/NavBar/navbar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Main  from '../src/Components/ParticularStock/stock.js';
=======
import Login from './Components/Login/login';
import SignUp from './Components/SignUp/SignUp.jsx'
import StockList from './Components/MainPage/mainpage.jsx'
import Main from './Components/ParticularStock/particularStock.js'
import{
  BrowserRouter as Router , Routes,Route
} from 'react-router-dom'
// import Profile from './Components/Profile/profile.jsx'
>>>>>>> origin/main

function App() {
  return (
    <div>
      <NavBar/>
      <Router>
        <Routes>
          {/* <Route path='/' element={<Profile/>} /> */}
<<<<<<< HEAD
          {/* <Route path='/getlist' element={<StockList/>} /> */}
          <Route path='/' element={<Main/>} />
          {/* <Route path='/login' element={<Login/>} /> */}
          {/* <Route path='/signup' element={<SignUp />} /> */}
=======
          <Route path='/getlist' element={<StockList/>} />
          <Route path='/st1' element={<Main/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp />} />
          
>>>>>>> origin/main
        </Routes>
      </Router>
      <Login/>
      {/* {<StockList/>} */}
      {/* {<Main/>} */}
      {/* <SignUp/> */}
    </div>
  );
}

export default App;
