import "./NavBar.css";
import React, { useEffect, useState } from "react";
// import { Navbar, Button, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";

import { Image } from "react-bootstrap";
import Axios from "axios";
import { API_USER } from "../config";
import Avatar from '../img/avatar.png'
// import { Link } from 'rea';

function NavBar2({ isLogin, setIsLogin }) {
  const [userData, setUserData] = useState();
  // const [openDrop, setOpenDrop] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isLogin) {
      var userId = localStorage.getItem("id");

      Axios.get(API_USER + "/" + userId)
        .then((res) => setUserData(res.data))
        .catch((e) => {
          alert("User token is incorrect: " + e);
          localStorage.clear();
          setIsLogin(false);
        });
    } else {
      setUserData(null);
    }
  }, [isLogin]);

  const handleLogout = () => {
    handleChecked();
    localStorage.clear();
    setIsLogin(false);
  };

  const handleChecked = () => {
    setChecked(false);
  };

  function setDefaultImage(ev) {
    ev.target.src = Avatar;
}
  return (
    <div classNameName="navigation">
      <input
        type="checkbox"
        className="navigation__checkbox"
        id="navi-toggle"
        checked={checked}
        onClick={() => setChecked(!checked)}
      />

      <label for="navi-toggle" className="navigation__button">
        <span className="navigation__icon">&nbsp;</span>
      </label>

      <div className="navigation__background">&nbsp;</div>

      <nav className="navigation__nav" 
      // style={checked? {} : {display: 'none'}}
      >
        {isLogin ? (
          userData != null && (
            <ul className="navigation__list">
                <li className="navigation__item">
                <Link
                  to="/me/profile"
                  className="navigation__link"
                  onClick={handleChecked}
                >
                 <span><Image src={userData.avatar == null ? Avatar : userData.avatar} width="40px" height="40px" roundedCircle onError={setDefaultImage}/></span>
                 {userData.username}
                </Link>
              </li>
              <li className="navigation__item">
                <Link
                  to="/"
                  className="navigation__link"
                  onClick={handleChecked}
                >
                  <span>01</span> Homepage
                </Link>
              </li>

              
              <li className="navigation__item">
                <Link
                  className="navigation__link"
                  onClick={handleLogout}
                >
                  <span>02</span> Log out
                </Link>
              </li>
            </ul>
          )
        ) : (
          <ul className="navigation__list">
            <li className="navigation__item">
              <Link to="/" className="navigation__link" onClick={handleChecked}>
                <span>01</span> Homepage
              </Link>
            </li>

            <li className="navigation__item">
              <Link
                to="/login"
                className="navigation__link"
                onClick={handleChecked}
              >
                <span>02</span> Login
              </Link>
            </li>
            <li className="navigation__item">
              <Link
                to="/signUp"
                className="navigation__link"
                onClick={handleChecked}
              >
                <span>03</span> Sign up
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}

export default NavBar2;
