import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Navbar, Nav, Container} from "react-bootstrap";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Signup from "./pages/Signup";
import Login from "./pages/Login";


function App() {
  
  return (
    <div className="App">
      <Router>
        <Navbar sticky="top" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Groupomania</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/">Publications</Nav.Link>
                <Nav.Link href="/CreatePost">Créer une publication</Nav.Link>
                <Nav.Link href="/login">Se connecter</Nav.Link>
                <Nav.Link href="/signup">S'enregistrer</Nav.Link>
              </Nav>
          </Container>
        </Navbar>
        <br />

        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/CreatePost" exact component={CreatePost}/>
          <Route path="/Post/:id" exact component={Post}/>
          <Route path="/Signup" exact component={Signup}/>
          <Route path="/Login" exact component={Login}/>
        </Switch> 
      </Router>
      
     
      
    </div>
  );
}
export default App;

