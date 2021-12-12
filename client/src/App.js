import './App.css';
import './bootstrap.css';

import { Routes, Route, BrowserRouter as Router} from "react-router-dom";

import NavBar from './Components/NavBar';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';


function App() {
  return (
    <div className = "app">
     <NavBar/>
     <div className="test">
       <Router >
         <Routes>
           <Route exact path = "/signup" element = {<Signup/>}></Route>
           <Route exact path = "/" element = {<Login/>}></Route>
           <Route exact path = "/login" element = {<Login/>}></Route>
           <Route exact path = "/dashboard" element = {<Dashboard/>}></Route>
           
         </Routes>
       </Router>
      
     </div>
     
    </div>
  );
}

export default App;
