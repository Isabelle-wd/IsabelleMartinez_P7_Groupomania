import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppBar from "./components/AppBar"
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { NoMatch } from "./pages/NoMatch";

function App() { 
  
    return (
      <div className="App">         
            <Router>              
              <AppBar />           
              <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/CreatePost" exact component={CreatePost}/>
                <Route path="/Post/:id" exact component={Post}/>
                <Route path="/Signup" exact component={Signup}/>
                <Route path="/Login" exact component={Login}/>
                <Route path="/basicinfo/:id" exact component={Profile}/>
                <Route path="*" exact component={NoMatch}/>
              </Switch> 
            </Router>                     
      </div>
    );
  }

export default App;

