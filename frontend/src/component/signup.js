import React, {useState} from 'react';
import { useNavigate 
} from "react-router-dom";
function Signup(props) {
    let history=useNavigate()
    let [data, setdata] = useState({
        email:"",
        name:"",
        password:""
    })
    const handlechange=(e)=>{
        setdata({...data,[e.target.name]: e.target.value
        })
    };
    const handleclick=async(e)=>{
        
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/creatuser", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    "name": data.name,
                    "password": data.password,
                    "email": data.email
                })
            });
            const jsonResponse = await response.json();
            console.log(jsonResponse);

            if (!response.ok) {
                props.showalert("invalid credential","danger")
            }
            else{
                props.showalert("account created successfully","success")
                localStorage.setItem("token",jsonResponse.authtoken);
                history("/");
            }

            
            // If you receive an authentication token, you can store it in the authtoken variable.
            // authtoken = jsonResponse.token;

        } catch (error) {
            console.error('Error during fetch:', error.message);
        }
    };

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                    <input type="email" className="form-control"  name="email" id="exampleInputEmail1" value={data.email} onChange={handlechange} aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputName1" className="form-label">name</label>
                    <input type="name" className="form-control" name="name" value={data.name} onChange={handlechange}  id="exampleInputName1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={data.password} onChange={handlechange}  id="exampleInputPassword1"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleclick}>submit</button>
            </form>
        </div>
    )
}
export default Signup
