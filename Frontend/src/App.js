import React, { Component} from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { NoMatch } from "./pages/NoMatch";
import { Layout } from "./components/Layout";
import { NavigationBar } from "./components/NavigationBar";


class App extends Component {
  render() {
    return (
      <div className="App">
      <NavigationBar/>
      <Layout>
        <Router>   
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/CreatePost" component={CreatePost}/>
            <Route path="/Post/:id" component={Post}/>
            <Route path="/Signup" component={Signup}/>
            <Route path="/Login" component={Login}/>
            <Route component={NoMatch}/>
          </Switch> 
        </Router>
      </Layout>      
      </div>
    );
  }
}
export default App;

