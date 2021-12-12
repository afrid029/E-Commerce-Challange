import "../bootstrap.css";
import "../App.css";
import {React, useState } from "react";

function NavBar() {
    let [user, setUser] = useState('');
   
    setInterval(() => {
        let detail = localStorage.getItem("newuser");
        if(detail){
            detail = JSON.parse(detail);
            setUser(detail[0].name);
        } 
    }, 100);

    const logout = () => {
       localStorage.removeItem("newuser");
       localStorage.clear();
       window.location.replace("/login");
    }

    return ( 
        <div  className="head bg-primary">
            <h2 >Shopping Lanka</h2>
            {user ?
                <div className="user ">
                    <span>{user}</span>
                    <a onClick = {logout} href="#top" >Logout</a>
                </div> :
                <div className="user ">
                    <a  href="/login">Login</a>
                    <a  href="/signup">SignUp</a>
                </div> 
            }
                
        </div>
    );
} 
export default NavBar;
