import React, { useState } from "react";
import classes from '../design/LoginForm.module.css'
import { useNavigate } from "react-router-dom";

function LoginForm() { 
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const usernameInputHandler = event => {
    setUsername(event.target.value)
  }

  const passwordInputHandler = event => {
    setPassword(event.target.value)
  }

  const formSubmissionHandler = async (event) => {
    event.preventDefault()

    try {
      
      const response = await fetch('https://junior-test.mntzdevs.com/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }); 

      if (response.ok) {
        const data = await response.json();
        
        localStorage.setItem('jwt', data.jwt);
        console.log(localStorage)
        
        navigate('/');
      } else {
        
        console.error('Login failed');
        if (username.length<3 || username.length>20){
          console.error('Error: Username must be between 3 and 20 characters long.');
        } else if (password.length<6 || password.length>20){
          console.error('Error: Password must be between 6 and 20 characters long.');
        } 

      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  return (
    <div className={classes.container}>
      <form onSubmit={formSubmissionHandler}>
        <div className={classes.title}>
          LOGIN
        </div>

        <div className={classes.info_input}>

          <div className={classes.div_info}>
            <input
              className={classes.user_input}
              name="username"
              value={username}
              onChange={usernameInputHandler}
              type="text"
              placeholder="Username"
              required
            />
          </div>

          <div className={classes.div_info}>
            <input
              className={classes.user_input}
              name="password"
              value={password}
              onChange={passwordInputHandler}
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <div className={classes.login_btn_div}>
            <button className={classes.login_btn} type="submit">LOGIN</button>
          </div>

        </div>

        </form>
    </div>
  )
}

export default LoginForm