import React from 'react';
import './Footer.css'
import { FaCopyright } from "react-icons/fa";
import { Google, Facebook, Twitter } from 'react-bootstrap-icons'
import { Button } from 'react-bootstrap';
function Footer() {
    return (
        <>

            <section id="footer" >
                <div className="d-flex justify-content-between ">
                    <p style={{ fontWeight: 600, fontSize: '27px' }}>Venue App</p>
                    <div>
                        <div className="my-1">
                            About us
                        </div>
                        <div className="my-1">
                            FAQ
                        </div>
                        <div className="my-1">
                            Terms and Conditions
                        </div>
                        <div className="my-1">
                            Services
                        </div>
                    </div>
                    <div>
                        <p className="my-3" style={{ fontWeight: 400 }}>CONTACT</p>
                        <div className="my-1">Email: venue@venue.com</div>
                        <div>Phone: 01234567788</div>
                        <p className="my-3" style={{ fontWeight: 400 }}>FOLLOW US</p>
                        <Google width="25px" height="25px" className="mr-4" />
                        <Facebook width="25px" height="25px" className="mx-4" />
                        <Twitter width="25px" height="25px" className="mx-4" />
                    </div>
                </div>

                <div className="myStyle" ></div>

                <div className="container">

                    <div>
                        <p><FaCopyright /><span> </span>
                            {new Date().getFullYear()} Venue App - All Right Reserver
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Footer;