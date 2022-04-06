import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios';

import LoginComponent from './component'
import configData from '../../config.json'

export default function LoginContainer(props){

  const [ getLoginUser, setLoginUser ] = useState({})
  const [ getRequestCreated, setRequestCreated ] = useState(false)
  const [ getOBJData, setOBJData ] = useState({})
  const [ getErrorRequest, setErrorRequest ] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [ getIsLogged, setIsLogged ] = useState(false)

  const loginAccount = function(obj){
        console.log(obj)
        setOBJData(obj)
        setRequestCreated(true)
  }

  const logout = function(){
    setIsLogged(false)
    removeCookie('token')
  }

  const sendRequest = async function(getRequestCreated){
    if(getRequestCreated){
      let url = configData.LOADSMART_WEATHER_API.URL
      url += configData.LOADSMART_WEATHER_API.RESOURCES.AUTH
      console.log(url)
      axios.post(url, {
        client_id: process.env.REACT_APP_LOADSMART_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_LOADSMART_API_CLIENT_SECRET,
        grant_type: "password",
        username: getOBJData.username,
        password: getOBJData.password
      }).then(function(response) {
        setLoginUser(response.data)
        console.log(response.data)
        setRequestCreated(false)
        setErrorRequest(null)
        setCookie('token', response.data.access_token, { 
          path: '/', 
          expires: new Date(Date.now() + response.data.expires_in)
        });
        window.location.href = "/"
      }).catch(function(error){
        console.log(error)
        setErrorRequest(error)
        setRequestCreated(false)
      });

    }
  }

    useEffect(() => {
      if(cookies.token){
        setIsLogged(true)
      }
      sendRequest(getRequestCreated)
    }, [getRequestCreated])

    return (
      <LoginComponent loginAccount={loginAccount} logout={logout} IsLogged={getIsLogged} />
    )
};