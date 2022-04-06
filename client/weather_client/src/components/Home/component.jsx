import React, { useState, useRef, useEffect } from 'react'

export default function HomeComponent(props){
    // const { getValueField, Display } = props
    // const [getState, setState] = useState("")
    const { loadScript, handleScriptLoad, submitData, weatherData} = props
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);

    useEffect(() => {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
          () => handleScriptLoad(setQuery, autoCompleteRef)
        );
      }, []);

    return (
        <div className="container">
            <div className="entry">
                <div className="row">
                    <div className="col-md-6">
                        <div className="search-area">
                            <form>
                                <div className="form-group">

                                    <input
                                        className="form-control input-search"
                                        ref={autoCompleteRef}
                                        onChange={event => setQuery(event.target.value)}
                                        placeholder="Enter an address"
                                        value={query}
                                    />
                                </div>

                                <div className="form-group">
                                    <button 
                                        type="button" 
                                        onClick={(e) => submitData()}
                                        className="btn submit-button-weather">
                                            Show me the current temperature
                                            </button>
                                </div>
                               
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="entry-temp">
                            <div className="temperature-box">
                                <div className="text">
                                    <div className="city">{(weatherData)? (weatherData.data_info) ? `${weatherData.data_info.city}, ${weatherData.data_info.state}` : "City Name": ""}</div>
                                    <div className="temperature">{(weatherData) ? (weatherData.temp) ? `${weatherData.temp}° F` : "Temperature": ""}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};