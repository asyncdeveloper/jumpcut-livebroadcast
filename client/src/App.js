import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp";

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Switch>
                  <Route path='/signup' component={SignUp} />
              </Switch>
          </div>
      </BrowserRouter>
  );
}

export default App;
