import React, { useState } from "react";
import classes from '../design/RegisterForm.module.css'
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [gender, setGender] = useState('')
  const [status, setStatus] = useState('active')
  const [yearOfBirth, setYearOfBirth] = useState()
  const [subscribeToNewsLetter, setSubscribeToNewsLetter] = useState(false)

  const usernameInputHandler = event => {
    setUsername(event.target.value)
  }

  const passwordInputHandler = event => {
    setPassword(event.target.value)
  }

  const repeatPasswordInputHandler = event => {
    setRepeatPassword(event.target.value)
  }

  const genderInputHandler = event => {
    setGender(event.target.value)
  }

  const statusInputHandler = event => {
    setStatus(event.target.value)
  }

  const yearOfBirthInputHandler = event => {
    setYearOfBirth(+event.target.value)
  }

  const formSubmissionHandler = async (event) => {
    event.preventDefault()
    
    if (username.length<3 || username.length>20){
      console.error('Error: Username must be between 3 and 20 characters long.');
      return
    } else if (password.length<6 || password.length>20){
      console.error('Error: Password must be between 6 and 20 characters long.');
      return
    } else if (repeatPassword !== password){
      console.error('Error: Please enter the same password.')
      return
    } else if (yearOfBirth<1900 || yearOfBirth>2024){
      console.error('Error: Please enter a number between 1900 and 2024')
      return
    } 

    try {
      
      const response = await fetch('https://junior-test.mntzdevs.com/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' ,
        },
        body: JSON.stringify({
          username,
          password,
          repeatPassword,
          subscribeToNewsLetter,
          gender,
          status,
          yearOfBirth,
        }),
      });

      if (response.status === 201) {
        
        const loginResponse = await fetch('https://junior-test.mntzdevs.com/api/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        if (loginResponse.ok) {
          const data = await loginResponse.json();
          
          localStorage.setItem('jwt', data.jwt);
          
          navigate('/');
        } else {
          
          console.error('Login failed after registration');
        }
      } else {
        
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }

    console.log(username)
    console.log(password)
    console.log(repeatPassword)
    console.log(gender)
    console.log(status)
    console.log(yearOfBirth)
    console.log(subscribeToNewsLetter)
  }

  return (
    <div className={classes.container}>
      <form onSubmit={formSubmissionHandler}>
        <div className={classes.title}>
          REGISTER
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
          
          <div className={classes.div_info}>
            <input
              className={classes.user_input}
              name="repaetPassword"
              value={repeatPassword}
              onChange={repeatPasswordInputHandler}
              type="password"
              placeholder="Repeat password"
              required
            />
          </div>

          <div className={classes.div_info_select}>
            <label> 
              Gender:
              <label className={classes.radio_txt}>
                <input  
                  type="radio" 
                  name="gender"
                  value="male"
                  onChange={genderInputHandler}
                />
                Male
              </label>

              <label className={classes.radio_txt}>
                <input  
                  type="radio" 
                  name="gender"
                  value="female"
                  onChange={genderInputHandler}
                />
                Female
              </label>

              <label className={classes.radio_txt}>
                <input  
                  type="radio" 
                  name="gender"
                  value="other"
                  onChange={genderInputHandler}
                />
                  Other
                </label>
            </label>
            
          </div>

          <div className={classes.div_info_select}>
            <label> Status </label>
            <select
              name="status"
              required
            >
              <option value="active" onChange={statusInputHandler}> Active </option>
              <option value="inactive" onChange={statusInputHandler}> Inactive </option>
            </select>
          </div>

          <div className={classes.div_info_select}>
            <label> Year of Birth </label>
            <input
              className={classes.year_input}
              type="number"
              name="yearOfBirth"
              value={yearOfBirth}
              onChange={yearOfBirthInputHandler}
              placeholder="YYYY"
              required
            />
          </div>
          
          <div className={classes.div_info_select}>
            <label> 
              Subscribe to Newsletter 
              <input
                className={classes.checkbox}
                type="checkbox"
                name="subscribe"
                checked={subscribeToNewsLetter}
                onChange={()=>setSubscribeToNewsLetter(!subscribeToNewsLetter)}
              />
            </label>
            
          </div>

          <div className={classes.register_btn_div}>
            <button className={classes.rgst_btn} type="submit">REGISTER</button>
          </div>

        </div>

        </form>
    </div>
  )
}

export default RegisterForm