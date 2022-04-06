import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import HomeContainer from '../Home/container'
import HistoryContainer from '../History/container'
import LoginContainer from '../Login/container'
import RegisterContainer from '../Register/container'


export default function Routers(){
    return(
        <Switch>
            <Route exact path="/" component={HomeContainer}></Route>
            <Route exact path="/history" component={HistoryContainer}></Route>
            <Route exact path="/login" component={LoginContainer}></Route>
            <Route exact path="/register" component={RegisterContainer}></Route>
            <Redirect from="*" to="/"></Redirect>
        </Switch>
    )
}