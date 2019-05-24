import React from 'react'
import {Route,Switch} from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import SingleRoom from './pages/SingleRoom'
import Error from './pages/Error'

export default function App({appname}){
  return (
    <>
      <Navbar appname={appname}/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/rooms" component={Rooms}/>
        <Route exact path="/rooms/:slug" component={SingleRoom}/>
        {/* Show 404 error page if page not found */}
        <Route component={Error}/>
      </Switch>
    </>
  )
}