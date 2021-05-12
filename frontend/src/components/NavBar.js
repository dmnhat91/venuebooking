import React, { useEffect, useState } from "react";
// import { Navbar, Button, Nav } from 'react-bootstrap'
// import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "shards-react";

import { Image } from "react-bootstrap";
import Axios from "axios";
import { API_USER } from "../config";

export default function NavBar({ isLogin, setIsLogin }) {
  // const [navBackground, setNavBackground] = useState('pink')
  // // const navRef = React.useRef()
  // // navRef.current = navBackground
  // useEffect(() => {
  //   const handleScroll = () => {
  //     console.log("fhjj")
  //     const show = window.scrollY > 100
  //     if (show) {
  //       setNavBackground('white')
  //     } else {
  //       setNavBackground('pink')
  //     }
  //   }
  //   document.addEventListener('scroll', handleScroll)
  //   return () => {
  //     document.removeEventListener('scroll', handleScroll)
  //   }
  // }, [])

  const [userData, setUserData] = useState();
  const [openDrop, setOpenDrop] = useState(false);

  useEffect(() => {
    if (isLogin) {
      var userId = localStorage.getItem("id");

      Axios.get(API_USER + "/" + userId)
      .then((res) => setUserData(res.data))
      .catch(e => {
        alert("User token is incorrect: " + e)
        localStorage.clear()
        setIsLogin(false)
      });
    } else {
      setUserData(null);
    }
  }, [isLogin]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <Navbar variant="dark" sticky="top" style={{ backgroundColor: "#f1f1f6" }}>
      <NavbarBrand href="/" style={{ color: "black", fontWeight: "bold" }}>
        Venue Booking
      </NavbarBrand>
      <Nav>
        <NavItem>
          <NavLink href="/" style={{ color: "black" }}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/" style={{ color: "black" }}>
            Explore
          </NavLink>
        </NavItem>
      </Nav>
      {isLogin ? (
        <Nav className="ml-auto">
          {userData != null && (
            <NavItem>
              <Dropdown
                open={openDrop}
                toggle={() => setOpenDrop((o) => !o)}
                inNavbar={true}
              >
                {console.log(userData)}
                <DropdownToggle theme="light">
                  {userData.username}
                  <Image src={userData.avatar} roundedCircle />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => console.log("dd")}>
                    My Profile
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout} style={{ color: "red" }}>
                    Log out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
          )}
        </Nav>
      ) : (
        <Nav className="ml-auto">
          <NavItem>
            <NavLink href="/login" style={{ color: "black" }}>
              Login
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/signUp" style={{ color: "black" }}>
              Sign Up
            </NavLink>
          </NavItem>
        </Nav>
      )}
    </Navbar>
  );
}
