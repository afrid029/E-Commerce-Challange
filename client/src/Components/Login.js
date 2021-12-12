import {React , useEffect, useState} from 'react';
import { useNavigate } from 'react-router';
import Axios from "axios";
import bcrypt from "bcryptjs";
import "../App.css";
import "../bootstrap.css";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passErr, setPassErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    let history = useNavigate();

    useEffect(()=> {
        if(localStorage.getItem('newuser')){
            history("/dashboard");
        } 
    })

    const log = () => {
        console.log(email, password);
        Axios.post("http://localhost:3001/loginWithCred",{mail:email, pwd:password}).then((res)=>{
            const resource = res;
            if(res.data.length > 0){
                bcrypt.compare(password,res.data[0].password).then((re)=>{
                    if(re){
                        localStorage.setItem("newuser",JSON.stringify(resource.data));
                        history("/dashboard");
                    }else{
                        setPassErr(true);
                    }
                })
            
            }else{
                setEmailErr(true)
            }
        })
    }
    return ( 
        <div className="signup">
            <div className="myform-head">
                <h4>Login</h4>
            </div>
            <div className="mycard">
                <div className="mt-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" onChange={(e) => { if (emailErr) { setEmailErr(false); } setEmail(e.target.value); } } id="email" className="form-control" />
                    {emailErr && <small style={{ color: 'red' }}>Wrong Email</small>}
                </div>
                <div className="mt-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" onChange={(e) => { if (passErr) { setPassErr(false); } setPassword(e.target.value); } } id="password" className="form-control" />
                    {passErr && <small style={{ color: 'red' }}>Wrong Password</small>}
                </div>

                <div className="mt-3 mb-3">
                    <button onClick={log} className="btn-primary btn-sm">Login</button>
                </div>

            </div>    
        </div> 

);
}

export default Login;