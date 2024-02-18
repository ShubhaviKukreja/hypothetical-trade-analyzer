import './App.css';
import Login from './Components/Login/login';
import SignUp from './Components/SignUp/SignUp.jsx'
import{
  BrowserRouter as Router , Routes,Route
} from 'react-router-dom'
import Profile from './Components/Profile/profile.jsx'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Profile/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Router>
      {/* <Login/> */}
      {/* <SignUp/> */}
    </div>
  );
}

export default App;
