import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'

//function
import {handleSuccess,handleError} from "../functions/utils.js"

function Signup(){

    //creating state for information
    const [singupInfo,setSingupInfo] = useState({
        name:'',
        email:'',
        password:''
    })

    //navigation hook
    const navigate = useNavigate()
    
    //hadling on change function
    const handleOnChange = (event)=>{
        let {name,value} = event.target;
        
        //copying object of singupInfo
        let copysingupInfo = {...singupInfo}
        //seting data in copysingupInfo
        copysingupInfo[name] = value;
        //giving data in setSingupInfo
        setSingupInfo(copysingupInfo);
        
    }
    
    const handleSubmit = async (event)=>{
        //preventing page from refresing
        event.preventDefault()
        const {name,email,password} = singupInfo;

        //checkng if any filed is empty
        if(!name||!email||!password)
        {
            return handleError("All field are required")
        }
        
        //if fileds are already filled 
        try
        {
            //api
            const url = "http://localhost:3001/auth/signup"

            //fetching api from backend
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify(singupInfo)
            })
        
            const result = await response.json()
            console.log(result)
            let {success,message,error}= result
            if(success)
            {
                handleSuccess(message)
                setTimeout(()=>{
                    navigate("/signin")

                },1000)
            }
            else if(error)
            {
                let details = error.details[0].message
                handleError(details)
            }
            else if(!success)
            {
                handleError(message)
            }
        }
        catch(error)
        {
            console.log("api fetching error:",error)
        }
    }

    return(
        <div className='container-singup'>
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>   
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    autoFocus
                    onChange={handleOnChange}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleOnChange}
                />
                <label htmlFor="password">password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="password"  
                    onChange={handleOnChange}
                />
                <button type='submit' >Sign Up</button>
                <span>Already have an account ?
                    <Link to="/signin">Signin</Link>
                </span>

            </form>
            <ToastContainer/>
        </div>
    )

}

export default Signup