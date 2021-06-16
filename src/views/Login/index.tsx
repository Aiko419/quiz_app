import * as React from 'react';

import LoginForm from './LoginForm/Login';
import { Redirect } from "react-router-dom";

import './styles.scss';



const LoginPage: any = () => {
  const loggedInUser = localStorage.getItem("token");
  if (loggedInUser) {
    return (<Redirect to='/' />)
  };
  return (
    <div className='wrapper-login-page'>
      <LoginForm />
    </div>
  )
}


export default LoginPage;