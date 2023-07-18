import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUp.css'
import axios from 'axios'

export default function SignUp() {
    const [state,setState]=useState({
        uname:"",
        email:"",
        password:"",
        r_password:""
    })
    const navigate=useNavigate()
    const handleSubmit=async(e)=>
    { 

        e.preventDefault()
        const res=await axios.post("http://localhost:2020/signup",state)
        if(res.data.success==true && res.data.msg==="USER CREATED SUCCESSFULLY")
        {
            navigate('/')
        // alert(res.data.msg)
        toast.success('🦄 User Created Successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
      
        }
        else 
        {
            // alert(res.data.msg)
            toast.error('User registerd with this id', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    }

    const handleChange=(e)=>
    {
        e.preventDefault()
        setState({...state,[e.target.name]:e.target.value})
    }
  return (
    <>


<section class="w-100 px-4 py-5 gradient-custom" style={{"border-radius": ".5rem .5rem 0 0"}}>
     
      <div class="row justify-content-center">
        <div class="col-12 col-lg-9 col-xl-9">
          <div class="card shadow-2-strong card-registration" style={{"border-radius": "15px"}}>
            <div class="card-body p-4 p-md-5">
              <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">SIGNUP Form</h3>
              <form onSubmit={handleSubmit}>

                <div class="row">
                  <div class="col-md-6 mb-4">

                    <div class="form-outline">
                      <input type="text" id="firstName" class="form-control form-control-lg" name="uname" value={state.uname} onChange={handleChange} placeholder="Username" required="required"/>
                     
                    <div class="form-notch"><div class="form-notch-leading" style={{"width": "9px"}}></div><div class="form-notch-middle" style={{"width": "70.4px"}}></div><div class="form-notch-trailing"></div></div></div>

                  </div>
                 
                </div>

               

                <div class="row">
                  <div class="col-md-6 mb-4 pb-2">

                    <div class="form-outline">
                      <input type="email" id="emailAddress" class="form-control form-control-lg" name="email" value={state.email} onChange={handleChange} placeholder="Email Address" required="required"/>
                     
                    <div class="form-notch"><div class="form-notch-leading" style={{"width": "9px"}}></div><div class="form-notch-middle" style={{"width": "40px"}}></div><div class="form-notch-trailing"></div></div></div>

                  </div>
               
                </div>

                <div class="row">
                <div class="col-md-6 mb-4 pb-2">

<div class="form-outline">
  <input type="password" id="emailAddress" class="form-control form-control-lg" name="password" value={state.password} onChange={handleChange} placeholder="Password" required="required"/>
 
<div class="form-notch"><div class="form-notch-leading" style={{"width": "9px"}}></div><div class="form-notch-middle" style={{"width": "40px"}}></div><div class="form-notch-trailing"></div></div></div>

</div>
                </div>


                <div class="row">
                <div class="col-md-6 mb-4 pb-2">

<div class="form-outline">
  <input type="password" id="emailAddress" class="form-control form-control-lg" name="r_password" value={state.r_password} onChange={handleChange} placeholder="Confirm Password" required="required"/>
 
<div class="form-notch"><div class="form-notch-leading" style={{"width": "9px"}}></div><div class="form-notch-middle" style={{"width": "40px"}}></div><div class="form-notch-trailing"></div></div></div>

</div>
                </div>

                <div class="row">
                <div class="mt-4 pt-2">
                  <input class="btn btn-primary btn-lg" type="submit" value="SIGNUP "/>
                </div>
                </div>


                <div class="row">

                <div className="text-center">Already have an account? <Link to="/">Login here</Link></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
</>
  )
}
