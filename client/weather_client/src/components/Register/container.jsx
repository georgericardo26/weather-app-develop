import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import RegisterComponent from './component'
import axios from 'axios';

import configData from '../../config.json'

export default function RegisterContainer(props){

  const [ getCreateUser, setCreateUser ] = useState({})
  const [ getRequestCreated, setRequestCreated ] = useState(false)
  const [ getOBJData, setOBJData ] = useState({})
  const [ getErrorRequest, setErrorRequest ] = useState(null)
  const [ getIsLogged, setIsLogged ] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const createAccount = function(obj){
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
      url += configData.LOADSMART_WEATHER_API.RESOURCES.CREATE_USER
      console.log(url)
      axios.post(url, {
        username: getOBJData.username,
        password: getOBJData.password
      }).then(function(response) {
        setCreateUser(response.data)
        console.log(response.data)
        setRequestCreated(false)
        setErrorRequest(null)
        window.location.href = "/login"
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
        <RegisterComponent 
          createAccount={createAccount} 
          ErrorRequest={getErrorRequest} 
          logout={logout} 
          IsLogged={getIsLogged}
        />
    )
};