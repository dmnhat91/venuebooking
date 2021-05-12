import React, { Component } from 'react'
import {GoogleLogin} from 'react-google-login';

export default class Google extends Component {

    responseGoogle = (response) => {
        console.log(response);
        console.log(response.profile)


    }
    render() {
        return (
            <div>
                <GoogleLogin
                    clientId="554795900895-0t4buh0hdrn4gdnhabnrnpd3tksrdi8s.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        )
    }
}