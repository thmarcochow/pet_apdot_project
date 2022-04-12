import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [user, setUser]=useState({
    username: '', email:'', password:''
  })

  const onChangeInput = e => {
    const {username, value} = e.target;
    setUser({...user, [username]:value})
  }

  const registerSubmit = async e =>{
    e.preventDefault()
    try{
      await axios.post('/user/register', {...user})

      localStorage.setItem('firstLogin', true)

      window.location.href = "/";
    }catch(err){
      alert(err.response.data.msg)
    }
  }
  return (
    <div className='login-page'>
      <form onSubmit={registerSubmit}>
        <h2>Register</h2>
        <input type="text" name="name" required
        placeholder='Name' value={user.username} onChange={onChangeInput}/>

        <input type="email" name="email" required
        placeholder='Email' value={user.email} onChange={onChangeInput}/>

        <input type="password" name="password" required autoComplete='on'
        placeholder='Password' value={user.password} onChange={onChangeInput}/>
        
        <div className='row'>
          <button type="submit">Register</button>
          <Link to="/login">Login</Link>

        </div>
      </form>
      Register component
    </div>
  )
}

export default Register
