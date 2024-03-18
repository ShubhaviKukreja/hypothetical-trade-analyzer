import './App.css';
import Login from '../src/Components/Login/login.jsx'
import SignUp from '../src/Components/SignUp/SignUp.jsx'
import StockList from './Components/MainPage/mainpage.jsx'
// import Main from '../src/Components/ParticularStock/particularStock.js'
import{
  BrowserRouter as Router , Routes,Route
} from 'react-router-dom'
import Profile from '../src/Components/Profile/profile.jsx'
import NavBar from '../src/Components/NavBar/navbar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Main  from '../src/Components/ParticularStock/stock.js';

function App() {
  return (
    <div>
      <NavBar/>
      <Router>
        <Routes>
          <Route path='/' element={<Profile/>} />
          {/* <Route path='/getlist' element={<StockList/>} /> */}
          {/* <Route path='/' element={<Main/>} /> */}
          {/* <Route path='/login' element={<Login/>} /> */}
          {/* <Route path='/signup' element={<SignUp />} /> */}

        </Routes>
      </Router>
      {/* <Login/> */}
      {/* {<StockList/>} */}
      {/* {<Main/>} */}
      {/* <SignUp/> */}
    </div>
  );
}

export default App;
