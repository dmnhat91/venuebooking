import React, { useState } from "react";
import "./SignUpPage.css";
import { Form } from "react-bootstrap";
import { Button } from "shards-react";
import { Link } from "react-router-dom";
import { House } from "react-bootstrap-icons";
import { API_USER } from "../../config";
import Axios from 'axios'
import { useHistory } from "react-router-dom";
export default function SignUpPage() {
  const history = useHistory()
  return (
    <div className="SignUpLogin">
      <Button href="/" className="SignUpLogin__home" outline theme="light">
        Back to <House />{" "}
      </Button>
      <div className="SignUpLogin__description">
        <p className="brand-name" style={{ color: "white" }}>
          BRAND
        </p>
        <h3 style={{ color: "white" }}>Join us to get better deals</h3>
        <div className="SignUpLogin__switch">
          <h5 style={{ color: "#b8b8b8" }}>Already have account? </h5>
          <Link className="mylink" to="/login">
            <h5>Login</h5>
          </Link>
        </div>
      </div>
      <div className="SignUpLogin__form">
        <h1>Sign up</h1>
        <MySignUpForm />
      </div>
    </div>
  );

  function MySignUpForm() {

    const initialData = {
      username: "",
      password: "",
      name: "",
      address: "",
      phone: "",
      role: "user",
    };

    const [data, setData] = useState(initialData);
    const [confirmPass, setConfirmPass] = useState("");
    const [invalid, setInvalid] = useState([false] * 5);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === "confirmPass") {
        setConfirmPass(value);
      } else {
        setData({ ...data, [name]: value });
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      var myInvalid = [];
      myInvalid.push(data.username === "" ? true : false);
      myInvalid.push(data.password === "" ? true : false);
      myInvalid.push(data.name === "" ? true : false);
      myInvalid.push(data.address === "" ? true : false);
      myInvalid.push(data.phone === "" ? true : false);
      console.log(data);
      setInvalid(myInvalid);
      // if (myInvalid.includes(true) || confirmPass !== data.confirmPass) {
      //   return;
      // }
      Axios.post(API_USER + "/signUp", data)
        .then(() => history.push("/login"))
        .catch(e => console.log(e))
    };
    return (
      <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Form.Group>
          <Form.Label>Email address / Username</Form.Label>
          <Form.Control
            isInvalid={invalid[0]}
            type="email"
            placeholder="Enter email address or username"
            name="username"
            value={data.username}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            isInvalid={invalid[1]}
            type="password"
            placeholder="Enter Password"
            name="password"
            value={data.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            isValid={data.password !== "" && confirmPass === data.password}
            type="password"
            placeholder="Re-enter Password"
            name="confirmPass"
            value={confirmPass}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Fullname</Form.Label>
          <Form.Control
            isInvalid={invalid[2]}
            type="text"
            placeholder="Enter fullname"
            name="name"
            value={data.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            isInvalid={invalid[3]}
            type="text"
            placeholder="Enter address"
            name="address"
            value={data.address}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            isInvalid={invalid[4]}
            type="tel"
            placeholder="Enter phone number"
            name="phone"
            value={data.phone}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button
          outline
          theme="secondary"
          type="submit"
          style={{ marginTop: "10px" }}
          className="w-100"
        >
          Create new account
        </Button>
      </Form>
    );
  }
}
