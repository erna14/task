import React, { Fragment, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem("jwt")

    if(token){
      navigate('/')
    }
  })

  return (
    <Fragment>
      <Header/>
      <LoginForm/> 
    </Fragment>
   
  )
}

export default LoginPage