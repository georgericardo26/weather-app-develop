import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import HistoryComponent from './component'

import configData from '../../config.json'

export default function HistoryContainer(props){
  const [ getPages, setPages ] = useState({
    previous: { disabled: true },
    next: {disabled: true }
  })
  const [ getHistoryData, setHistoryData ] = useState({})
  const [ getClickPage, setClickPage ] = useState("")
  const [cookies, setCookie] = useCookies(['token']);

  const clickPage = function(name){
      setClickPage(name)
  }

  const sendRequest = async function(getClickPage){
      if(!cookies.token){
        window.location.href = "/login"
      }
      let url = configData.LOADSMART_WEATHER_API.URL
      url += configData.LOADSMART_WEATHER_API.RESOURCES.HISTORY_WEATHER
      if (getClickPage){
        url = getHistoryData[getClickPage]
      }
      
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${cookies.token}`
        }
      })
      console.log(response.data)

      setHistoryData(response.data)
      setPages({
        previous: { disabled: (response.data.previous)? false : true },
        next: { disabled: (response.data.next)? false : true }
      })
  }

    useEffect(() => {
      sendRequest(getClickPage)
    }, [getClickPage])

    return (
      <HistoryComponent HistoryData={getHistoryData} Pages={getPages} clickPage={clickPage}/>
    )
};