import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "shards-react";
import { Link, useLocation } from "react-router-dom";
import "./LoginPage.css";
import { Facebook, Google, House } from "react-bootstrap-icons";
import { API_USER } from "../../config";
import Axios from 'axios'
import { useHistory } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';


export default function LoginPage({ setIsLogin }) {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const location = useLocation()

  let { from } = location.state || { from: { pathname: "/" } };

  const onLoginSuccess = (id, token) => {
    console.log("heeeeee" + JSON.stringify(from))
    // history.push(this.state.from || "/")
    
    localStorage.setItem("id", id)
    localStorage.setItem("token", token)
    setLoading(false)
    setIsLogin(true)
    history.push(from.pathname);
  }

  const responseGoogle = (response) => {
    const username = response.profileObj.email;
    Axios.get(API_USER + "/username/" + username)
      .then((res) => {
        if (res.data.length === 0) { // No user
          setLoading(true)
          Axios.post(API_USER + "/signUp/withGoogle", {
            username: response.profileObj.email,
            name: response.profileObj.name,
            avatar: response.profileObj.imageUrl
          })
            .then((r) => {
              const id = r.data.message.substr(r.data.message.length - 1)
              onLoginSuccess(parseInt(id), response.tokenObj.access_token)
            }).catch(e => {
              alert(e)
              setLoading(false)
            })
        } else {
          onLoginSuccess(res.data[0].id, response.tokenObj.access_token)
        }

      })
  }
  return (
    <div className="SignUpLogin">
      <Button href="/" className="SignUpLogin__home" outline theme="light">
        Back to <House />{" "}
      </Button>
      <div className="SignUpLogin__description">
        <p className="brand-name" style={{ color: "white" }}>
          BRAND
        </p>
        <h3 style={{ color: "white" }}>Welcome back!</h3>
        <div className="SignUpLogin__switch">
          <h5 style={{ color: "#b8b8b8" }}>No account yet?</h5>
          <Link className="mylink" to="/signUp">
            <h5>Sign Up</h5>
          </Link>
        </div>
      </div>
      <div className="SignUpLogin__form">
        <h1>Login</h1>
        <MyLoginForm />

        <div className="Login__description">
          <div className="Login__line1"></div>
          or continue with
          <div className="Login__line1"></div>
        </div>
        {/* <Button
          style={{ marginTop: "10px", marginBottom: "10px" }}
          className="w-100"
          theme="primary"
        >
          <Facebook />{" "}
          <span style={{ marginLeft: "10px" }}>Login with Facebook</span>
        </Button> */}
        {loading ? <div>Loading ........</div> : <GoogleLogin
          render={renderProps => (
            <Button
              style={{ marginTop: "10px", marginBottom: "10px" }}
              className="w-100"
              theme="danger"
              onClick={renderProps.onClick} disabled={renderProps.disabled}
            >
              <Google />{" "}
              <span style={{ marginLeft: "10px" }}>Login with Google</span>
            </Button>
          )}
          clientId="554795900895-0t4buh0hdrn4gdnhabnrnpd3tksrdi8s.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'} />}

      </div>
    </div>
  );

  function MyLoginForm() {
    const [data, setData] = useState({
      username: "",
      password: "",
    });
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      Axios.post(API_USER + "/login", data)
        .then(res => {
          onLoginSuccess(res.data.id, res.data.accessToken)
        })
        .catch(e => alert("Invalid!"))
    };

    return (
      <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="username"
            value={data.username}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button
          style={{ marginTop: "10px", marginBottom: "10px" }}
          className="w-100"
          outline
          theme="secondary"
          type="submit"
        >
          Login
        </Button>
      </Form>
    );
  }
}
