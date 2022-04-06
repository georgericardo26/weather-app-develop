import React from 'react';
import { HashRouter } from 'react-router-dom'

import Router from './routes'

import "./style.css";

export default function (props){
    const {children} = props;
    return( 
            <div className='app-container'>
                {children}
            </div>
    )        

}