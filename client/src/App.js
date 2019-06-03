import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Navbar />
              <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/signup' component={SignUp} />
                  <Route path='/signin' component={SignIn} />
              </Switch>
          </div>
      </BrowserRouter>
  );
}

export default App;
