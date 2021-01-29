import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Pages/Home";
import Labs from "./components/Pages/Labs";
import About from "./components/Pages/About";
import Blog from "./components/Pages/Blog";
import Login from "./components/Pages/Login";
import Form from "./components/SignUP/Form";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/Labs' component={Labs} />
            <Route path='/About' component={About} />
            <Route path='/Blog' component={Blog} />
            <Route path='/Login' component={Login} />
          </Switch>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
