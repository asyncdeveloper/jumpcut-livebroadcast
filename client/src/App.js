import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateBroadcast from "./components/CreateBroadcast";
import ViewBroadcast from './components/ViewBroadcast';

const App = () => {
    return (
          <BrowserRouter>
              <div className="App">
                  <Navbar />
                  <Switch>
                      <Route exact path='/' component={Home} />
                      <Route path='/signup' component={SignUp} />
                      <Route path='/signin' component={SignIn} />
                      <Route path='/broadcast/:id' component={ViewBroadcast} />
                      <Route path='/broadcast' component={CreateBroadcast} />
                  </Switch>
              </div>
          </BrowserRouter>
    );
};

export default App;
