import './App.css';
import HomePage from './Pages/HomePage/HomePage'
import SearchPage from './Pages/SearchPage/SearchPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import SignUpPage from './Pages/SignUpPage/SignUpPage'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import NavBar2 from './components/NavBar2';
import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import TestPage from './Pages/TestPage/TestPage';
import VenueInformationPage from './Pages/VenueInformationPage/VenueInformationPage'
import CheckOutPage from './Pages/CheckOutPage/CheckOutPage';
import ProfilePage from './Pages/MyProfile/ProfilePage';
import Google from './components/Google'
import {GoogleLogin} from 'react-google-login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';




const AppContainer = withRouter(({ location }) => {
  const authPage = () => location.pathname === "/login" || location.pathname === "/signUp" 


  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogin, setIsLogin] = useState(false)
  // const [isAuthPage, setIsAuthPage] = useState(authPage())

  
  useEffect(() => {
    if (token !== null && token !== "") {
      setIsLogin(true)
      console.log("true")
    } else {
      setIsLogin(false)
      console.log("false")
    }
  }, [token])

  return (
    <div style={authPage() ? {margin: 0} : {margin: 25}}>
      {authPage() || <NavBar2 isLogin={isLogin} setIsLogin={setIsLogin} />}
      <Switch>
        <Route exact path="/" component={() => <HomePage isLogin={isLogin}/>} />
        <PublicRoute exact path="/login" component={() => <LoginPage setIsLogin={setIsLogin} />} isLogin={isLogin} />
        <PublicRoute exact path="/signUp" component={SignUpPage} isLogin={isLogin}/>
        <Route exact path="/search" component={()=> <SearchPage/>} />
        <Route exact path="/test" component={() => <TestPage/>}/>
        <Route exact path="/restaurants/:resId" component={VenueInformationPage}/>
        <PrivateRoute exact path="/checkout/:resId/:venueId" component={CheckOutPage} isLogin={isLogin}/>
        <PrivateRoute exact path="/me/profile" component={ProfilePage}  isLogin={isLogin}/>
      </Switch>

      {authPage() || <Footer />}
    </div>
  );
})

const App = () => {
  return (
    <div >
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </div>
    // <div >
    //   <VenueInformationPage/>
    // </div>
  )
}

export default App;
