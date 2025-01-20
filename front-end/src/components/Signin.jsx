import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'

//function
import {handleSuccess,handleError} from "../functions/utils.js"

function Signin(){
    //creating state for information
    const [singinInfo,setSinginInfo] = useState({

        email:'',
        password:''
    })

    //navigation hook
    const navigate = useNavigate()
    
    //hadling on change function
    const handleOnChange = (event)=>{
        let {name,value} = event.target;
        
        //copying object of singupInfo
        let copysinginInfo = {...singinInfo}
        //seting data in copysingupInfo
        copysinginInfo[name] = value;
        //giving data in setSingupInfo
        setSinginInfo(copysinginInfo);
        
    }
    
    const handleSubmit = async (event)=>{
        //preventing page from refresing
        event.preventDefault()
        const {name,email,password} = singinInfo;

        //checkng if any filed is empty
        if(!email||!password)
        {
            return handleError("All field are required")
        }
        
        //if fileds are already filled 
        try
        {
            //api
            const url = "http://localhost:3001/auth/signin"

            //fetching api from backend
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify(singinInfo)
            })
        
            const result = await response.json()
            console.log(result)
            let {success,message,error,jwtToken,name}= result
            if(success)
            {
                localStorage.setItem("token",jwtToken)
                localStorage.setItem("name",name)
                handleSuccess(message)
                setTimeout(()=>{
                    navigate("/home")

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
            <h1>Signin</h1>
            <form onSubmit={handleSubmit}>

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
                    <Link to="/signup">Signup</Link>
                </span>

            </form>
            <ToastContainer/>
        </div>
    )


}

export default Signin