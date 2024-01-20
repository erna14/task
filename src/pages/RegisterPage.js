import React, { Fragment, useEffect } from "react";
import RegisterForm from "../components/RegisterForm";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
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
      <RegisterForm/>
    </Fragment>
    
  )
}

export default RegisterPage