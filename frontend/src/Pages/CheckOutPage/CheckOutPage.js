import React, { useEffect, useState } from 'react';
import './CheckOutPage.css'
import logo from '../../img/CheckOutPage/check-out-128.png'
import { FaCopyright } from "react-icons/fa";
import {InputGroup, FormControl, Form, Row, Col} from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_PATH } from '../../config';
import { useHistory } from 'react-router-dom';

export default function CheckOutPage() {

    const history = useHistory();

    const {resId,venueId} = useParams()
    console.log(useParams())
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [address,setAddress] = useState("")
    const [paymentMethod,setPaymentMethod] = useState("")
    const [nameOnCard,setNameOnCard] = useState("")
    const [cardNumber,setCardNumber] = useState("")
    const [expiration,setExpiration] = useState("")
    const [cvv,setCvv] = useState("")

    const checkout = () => {
        fetch("http://localhost:8082/bookings", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: localStorage.getItem("id"),
                resId: resId,
                venueId: venueId,
                firstName: firstName,
                lastName: lastName,
                email: email,
                address: address,
                paymentMethod: paymentMethod,
                nameOnCard: nameOnCard,
                cardNumber: cardNumber,
                expiration: expiration,
                cvv: cvv
            })
        })
    }

    return (
        <div>
            <div className="container">
                <div className="py-5 text-center">
                    <img className="mb-4 d-block mx-auto" src={logo} />
                    <h1>Checkout Form</h1>
                    <p className="lead">Below is an example form built entirely with Bootstrap’s form controls. 
                    Each required form group has a validation state that can be triggered by attempting to submit 
                    the form without completing it.</p>
                </div>
            </div>
            <div className="container">
                <h4 className="mb-3">Billing address</h4>
                <form>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <label for="firstName" className="form-label"> First Name</label>
                            <input type="text" placeholder="First Name" className="form-control"  onChange={(e)=>setFirstName(e.target.value)}/>
                        </div>
                        <div className="col-sm-6">
                            <label for="lastName" className="form-label">Last Name</label>
                            <input type="text" placeholder="Last Name" className="form-control" onChange={(e)=>setLastName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label for="firstName" className="form-label">Email</label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                <InputGroup.Text>@</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="inlineFormInputGroupUsername" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                            </InputGroup>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label for="address" className="form-label">Address</label>
                            <InputGroup>
                                <FormControl id="inlineFormInputGroupUsername" placeholder="1234 Main St" onChange={(e)=>setAddress(e.target.value)}/>
                            </InputGroup>
                        </div>
                    </div>
                    {/* <div className="row mb-3">
                        <div className="col-sm-6">
                            <label for="city" className="form-label">City</label>
                            <Form.Control
                                as="select"
                                className="my-1 mr-sm-2"
                                id="inlineFormCustomSelectPref"
                                custom
                            >
                                <option value="0">Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Control>
                        </div>
                        <div className="col-sm-6">
                            <label for="state" className="form-label">State</label>
                            <Form.Control
                                as="select"
                                className="my-1 mr-sm-2"
                                id="inlineFormCustomSelectPref"
                                custom
                            >
                                <option value="0">Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Control>
                        </div>
                    </div> */}
                </form>
                <h4 className="mb-3">Payment Method</h4>
                <fieldset>
                    <Form.Group as={Row}>
                    <Col sm={10}>
                        <Form.Check
                        type="radio"
                        label="Credit Card"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        onChange={(e)=>setPaymentMethod("Credit Card")}
                        />
                        <Form.Check
                        type="radio"
                        label="Debit Card"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        onChange={(e)=>setPaymentMethod("Debit Card")}
                        />
                        <Form.Check
                        type="radio"
                        label="Paypal"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                        onChange={(e)=>setPaymentMethod("Paypal")}
                        />
                    </Col>
                    </Form.Group>
                </fieldset>
                <form>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <label for="" className="form-label">Name on card</label>
                            <input type="text" placeholder="" className="form-control" onChange={(e)=>setNameOnCard(e.target.value)}/>
                            <small className="text-muted">Full name as displayed on card</small>
                        </div>
                        <div className="col-sm-6">
                            <label for="" className="form-label">Card Number</label>
                            <input type="text" placeholder="" className="form-control" onChange={(e)=>setCardNumber(e.target.value)}/>
                        </div>
                    </div>
                </form>
                <form>
                    <div className="row mb-3">
                        <div className="col-sm-2">
                            <label for="" className="form-label">Expiration</label>
                            <input type="text" placeholder="" className="form-control" onChange={(e)=>setExpiration(e.target.value)}/>
                        </div>
                        <div className="col-sm-2">
                            <label for="" className="form-label">CVV</label>
                            <input type="text" placeholder="" className="form-control" onChange={(e)=>setCvv(e.target.value)}/>
                        </div>
                    </div>
                </form>
            </div>
            <div className="container text-center mb-4">
                <button className="w-50 btn btn-primary btn-lg" onClick={(e)=>{checkout();history.push("/me/profile")}}>Check Out</button>
            </div>
        </div>
        
        
    )
}