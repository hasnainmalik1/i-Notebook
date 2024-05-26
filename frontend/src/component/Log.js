import React, {useState} from 'react'
import { useNavigate 
  } from "react-router-dom";
const Log=(props)=> {
    let [datd, setdatd] = useState({
        email:"",
        password:""
    })
    let history=useNavigate();
    const handlechange=(e)=>{
        setdatd({...datd,[e.target.name]: e.target.value
        })
    };
    const handleclick=async(e)=>{
         e.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{
                'Content-Type': "application/json"
            },
            body: JSON.stringify({password:datd.password,email:datd.email})
              
        });
        const json=await  response.json()
        if(json.success){
            localStorage.setItem("token",json.authtoken);
            props.showalert("login successfully","success")
            history("/");
        }
        else{
            props.showalert("invalid credential","danger")
        }
        console.log(json)
        console.log(datd.email,datd.password)
    }
    return (
        <div className='container'>
            <h1>Login</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                    <input type="email" className="form-control"  name="email" id="exampleInputEmail1" value={datd.email} onChange={handlechange} aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={datd.password} onChange={handlechange}  id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleclick}>submit</button>
            </form>
        </div>
    )
}

export default Log
