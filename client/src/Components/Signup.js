import { useState } from "react";
import "../App.css";
import "../bootstrap.css";
import Axios from "axios"
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router";

const salt = bcrypt.genSaltSync(10);

const Signup = () => {
    const history = useNavigate();
    const [user, setUser] = useState({name:'', email: '', password: ''});
    const [alert, setAlert] = useState(false)

    const register = () => {
        Axios.post("http://localhost:3001/signUp",{newUser: user}).then((res)=>{
            setAlert(true);
            setTimeout(() => {
                history("/login");
            }, 3000);
        });
    }

    const userDetail = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name] : value
        }));
       
    }
    const userPassword = (e) => {
        const value = e.target.value;
        const hashedValue = bcrypt.hashSync(value,salt);

        setUser(prevState=> ({
            ...prevState,
            password:hashedValue
        }))
    }
   
    return ( 
        <div className="signup">
            {alert && <div className="alert alert-success" role="alert">
                You Have Successfully Registered
                <small style = {{display:'block'}}>You will be redirected to Login page shortley</small>
            </div>}
            <div className="myform-head">
                <h4 >Register Yourself Here</h4>
            </div>
            
            <div className="mycard">
                <div className="mt-4">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" id ="name" name="name" className="form-control" onChange = {userDetail} />
                </div>
                <div className="mt-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id = "email" name="email" className="form-control" onChange = { (e)=>userDetail(e) } />
                </div>
                <div className="mt-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" id = "password"className="form-control" onChange = {userPassword} />
                </div>

                <div className="mt-3 mb-3">
                    <button onClick = {register} className="btn-primary btn-sm">Register</button>
                </div>
                
            </div>
        </div>
     );
}
 
export default Signup;