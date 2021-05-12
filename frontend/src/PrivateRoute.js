import React from 'react'
// import AuthService from './Services/AuthService'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, path, ...rest }) => {

  // Add your own authentication on the below line.
//   const isLoggedIn = AuthService.isLoggedIn()

  return (
    <Route
    path={path}
    {...rest}
      render={props =>
        localStorage.getItem("token") != null ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute