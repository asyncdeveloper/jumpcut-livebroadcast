import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Switch>
                  <Route path='/signup' component={SignUp} />
                  <Route path='/signin' component={SignIn} />
              </Switch>
          </div>
      </BrowserRouter>
  );
}

export default App;
