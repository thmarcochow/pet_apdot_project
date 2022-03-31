import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Dogs from './dogs/Dogs'
import Login from './auth/Login'
import Register from './auth/Register'
import Shelter from './shelter/Shelter'
import NotFound from './utils/NotFound'

function Pages() {
  return (
    <Switch>
      <Route path="/" exact component={Dogs}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/shelter" exact component={Shelter}/>

      <Route path="*" exact component={NotFound}/>
    </Switch>

    // <div>
    //   Main Pages componet
    // </div>
  )
}

export default Pages
