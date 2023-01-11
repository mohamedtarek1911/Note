import axios from 'axios';
import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom';



export function Login() {
  const [user, setUser] = useState({"email":" ","password":""})
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    let navigate= useNavigate();
    function getdata(e){
        // console.log({...user,[e.target.name]:e.target.value});
        setUser({...user,[e.target.name]:e.target.value});
    }
  
  async function signin(e){
    e.preventDefault();
    setLoading(true);
    let {data} =await axios.post("https://sticky-note-fe.vercel.app/signin",user)
    setLoading(false);
    // console.log(data.message);
    console.log(data)
    if(data.message==="success"){
      localStorage.setItem("token",data.token)
      localStorage.setItem("userid",data.user._id)
        navigate("/home")
    }
    else{
        setError(data.message);
    }
  }

  return <>
    <div className="container my-5 py-5">
      <div className="col-md-5 m-auto text-center">
          <form onSubmit={signin}>
              
              <div className="form-group">
                  <input  onChange={getdata} placeholder="Enter email" type="email" name="email" className="form-control" />
              </div>
              <div className="form-group my-2">
                  <input  onChange={getdata} placeholder="Enter you password" type="password" name="password" className=" form-control" />
              </div>
              <button type="submit" className={'btn btn-info w-100'+ (loading?" disabled":"")}>{loading?<i className='fa fa-spin fa-spinner'></i>:"Signin"}  </button>
            {/* {
                error?<div className='alert alert-danger mt-2' >{error}</div>:""
            } */}
            {
                error&&<div className='alert alert-danger mt-2' >{error}</div>
            }
             
          </form>
      </div>
    </div>
  </>
}
