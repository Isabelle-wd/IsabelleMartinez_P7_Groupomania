import React, { useState, useEffect } from "react";
import './Navbar.css';
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
//import PostAddIcon from '@mui/icons-material/PostAdd';

import { AuthContext } from "../../helpers/AuthContext";

function Navbar() { 
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

  const [authState, setAuthState] = useState({
    username:"", 
    id: 0, 
    status: false,
  });

  useEffect(() => {
    axios.get(
      "http://localhost:3001/auth/auth", {
          headers: { Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
      // eslint-disable-next-line
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  
    return (
        <div className="App">       
            <Router>              
               <nav className="navbar">
                    <div className="navbar-container">
                        <img
                            alt="logo"
                            src= "images/icon-left-font-monochrome-white.svg"                       
                            width="350"
                            className="icon-logo"
                        />
                         <div className="menu-icon" onClick={handleClick}>
                            <i className={click ? "fas fa-times" : "fas fa-bars"} />
                        </div>  
                        <AuthContext.Provider value={{ authState, setAuthState }}> 
                            <ul className={click ? "nav-menu active" : "nav-menu" }>         
                                {!authState.status ? (
                                <>
                                    <li className="nav-item">
                                        <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                                            Accueil
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                                            Connexion
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/signup" className="nav-links" onClick={closeMobileMenu}>
                                            Inscription
                                        </Link>
                                    </li>
                                </>
                                ) : (     
                                <>               
                                    <li className="nav-item">
                                        <Link to="/profile/:id" className="nav-links" onClick={closeMobileMenu}>
                                            <Avatar alt="photo utilisateur" src="images/profile_pic.png">{authState.username}</Avatar>
                                        </Link>
                                    </li>
    			                    <li className="nav-item">
                                        <Link to="/createPost" className="nav-links" onClick={closeMobileMenu}>
                                	        <span class="material-icons-outlined"></span>
                                        </Link>   
                                    </li>   
                                </>                      
                                )}                     
                                {authState.status && 
			                        <li className="nav-item" onClick={logout}>
			                            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                                            Deconnexion
                                        </Link>
			                        </li>} 
                            </ul>
                        </AuthContext.Provider> 
                    </div>
                </nav>
            </Router>          
        </div>
    );
  }

export default Navbar;
