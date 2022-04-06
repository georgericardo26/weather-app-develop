import React, {useState, useEffect} from 'react'
import { useCookies } from 'react-cookie';
import HomeComponent from './component'
import configData from '../../config.json'
import axios from 'axios';

export default function HomeContainer(props){

  const [ getAddress, setAddress ] = useState([])
  const [ getReadyToSend, setReadyToSend ] = useState(false)
  const [ getQueryType, setQueryType ] = useState("")
  const [ getWeatherData, setWeatherData ] = useState({})
  const [ getAddressData, setAddressData ] = useState({})
  const [cookies, setCookie] = useCookies(['token']);

  let autoComplete;

  const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current
    );
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery)
    );
  }

  async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
    setAddress(addressObject.address_components);
  }

  const submitData = function(){
    let zipcode;
    let country;
    let state;
    let city;
    
    getAddress.forEach(function(item){
        if(item.types.includes("country")){
          country = item.short_name
        }
        if(item.types.includes("postal_code")){
          zipcode = item.long_name
        }
        if(item.types.includes("administrative_area_level_2") || item.types.includes("locality")){
          city = item.long_name
        }
        if(item.types.includes("administrative_area_level_1")){
          state = item.short_name
        }

    })

    if (country.toLowerCase() === "us"){
      setQueryType(`zip=${zipcode},${country}`)
      
    }
    else {
      setQueryType(`q=${city},${country}`)
    }

    setAddressData({
      city: city,
      state: state,
      country: country,
      zipcode: zipcode
    })
    setReadyToSend(true)

  }

  const sendRequest = async function(getReadyToSend){
    if(!cookies.token){
      window.location.href = "/login"
    }
    if (getReadyToSend){
      let url = configData.LOADSMART_WEATHER_API.URL
      url += configData.LOADSMART_WEATHER_API.RESOURCES.SEARCH_WEATHER
      url += `?${getQueryType}&lang=pt_br&units=imperial`
      console.log(url)
      setReadyToSend(false)
      const response = await axios.get(url, { 
        headers: {
          'Authorization': `Bearer ${cookies.token}`
        }
      })
      console.log(response.data)

      setWeatherData({
        temp: response.data.main.temp.toFixed(1),
        data_info: getAddressData
      })
    }
  }

  useEffect(() => {
    sendRequest(getReadyToSend)
  }, [getReadyToSend])

  return (
      <HomeComponent 
        loadScript={loadScript} 
        handleScriptLoad={handleScriptLoad} 
        submitData={submitData} 
        weatherData={getWeatherData}
        />
  )
};