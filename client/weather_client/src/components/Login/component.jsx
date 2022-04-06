import React, { useState } from 'react'

export default function LoginComponent(props){

    const { loginAccount, ErrorRequest, logout, IsLogged } = props
    const [getFields, setFields] = useState({})

    const updateFields = function(field_id, field_value){
        let obj = getFields
        obj[field_id] = field_value
        setFields(obj)
    }

    return (
        <div className="container">
            <div className="entry">
                <div className="row">
                    <div className="registry-box">
                        {
                            (!IsLogged) ?
                            <div className="col-md-12">
                            <h2>Login Page</h2>
                            <span className="error">{(ErrorRequest)? "Something is wrong, try out afterward again.": ""}</span>

                            <div className="form-group">
                                    <input
                                        className="form-control input-register"
                                        id="username"
                                        placeholder="Type username"
                                        onKeyUp={ev => updateFields(ev.target.id, ev.target.value)}
                                    />
                            </div>
                            <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control input-register"
                                        id="password"
                                        placeholder="Type password"
                                        onKeyUp={ev => updateFields(ev.target.id, ev.target.value)}
                                    />
                            </div>

                            <div className="form-group">
                                    <button 
                                        type="button" 
                                        onClick={(e) => loginAccount(getFields)}
                                        className="btn submit-button-register">
                                            Login
                                        </button>
                            </div>
                        </div>
                        :
                        <div className="col-md-12">
                            <h2>You are logged.</h2>
                            <div className="form-group">
                                    <button 
                                        type="button" 
                                        onClick={(e) => logout()}
                                        className="btn submit-button-register">
                                            Logout
                                        </button>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};