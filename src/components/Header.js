import React, { useEffect, useState } from "react";
import classes from '../design/Header.module.css'
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(()=>{
    const loginCheck = () => {
      const token = localStorage.getItem('jwt')
      if (token) {
        setIsLoggedIn(true);
      }
    }
    loginCheck()
  },[])

  useEffect(()=>{
    const getUserInfoFromToken = (token) => {
      try {
        const decodedToken = atob(token.split('.')[1])
        const userInfo = JSON.parse(decodedToken)
        return userInfo
      } catch (error) {
        console.error('Error decoding JWT token:', error);
        return null;
      }
    }

    const token = localStorage.getItem('jwt');

    if (token) {
      const userInfo = getUserInfoFromToken(token);

      setUserData(userInfo);
    }

  }, [])

  const loginHandler = () => {
    navigate('/login')
  }

  const logoutHandler = () => {
    localStorage.removeItem('jwt')
    navigate('/login')
  }

  return (
   <div>
    {isLoggedIn ? (
      <div className={classes.header}>
        <div className={classes.user_info}>
          <label className={classes.username_id}>{userData.username} {userData.id}</label>
        </div>
        <div className={classes.links}>
          <nav>
            <a href="/"> Home </a>
            <a href="/products"> Products </a>
          </nav>
        </div>

        <div className={classes.action_button}>
          <button className={classes.logout_btn} onClick={logoutHandler}> LOGOUT </button>
        </div>
      </div>
      ) : (
        <div className={classes.header}>
          <div className={classes.links}>
            <nav>
              <a href="/"> Home </a>
            </nav>
          </div>
          <div className={classes.action_button}>
            <button onClick={loginHandler} className={classes.login_btn}> LOGIN </button>
          </div>
          
        </div>
      )}
  
   </div>
  )
}

export default Header