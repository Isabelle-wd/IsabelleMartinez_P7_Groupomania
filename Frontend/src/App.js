import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./pages/Header";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <div className="App">
      
      <Router>
      <Header/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/CreatePost" exact component={CreatePost} />
        </Switch>
      </Router>   
      
    </div>
  );
}
export default App;

