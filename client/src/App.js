import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'; 
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {logoutUser, setCurrentUser} from './actions/authActions';
import Dashboard from './components/dashboard/Dashboard';
import { clearCurrentProfile } from './actions/profileActions';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/Profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/Post/Post';
import Crypto from './components/CryptoAPI/Crypto';

//Check for token 
if(localStorage.jwtToken){
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  //Check for expired token
  const currentTime = Date.now() /1000;
  if(decoded.exp < currentTime )
  {
    //Logout user 
    store.dispatch(logoutUser());
    //Clear current profile
    store.dispatch(clearCurrentProfile());

    //Redirect to login 
    window.location.href='/login';
  }
}
function App() {
  return (
    <Provider store={store}>
      <Router>
      <div className="App">
      <Navbar></Navbar>
      <Route exact path="/" component={Landing}></Route>
      <div className="container">
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/profiles" component={Profiles}></Route>
        <Route exact path="/profile/:handle" component={Profile}></Route>
        <Route exact path="/crypto-prices" component={Crypto}></Route>

<Switch>
<PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>

</Switch>
<Switch>
<PrivateRoute exact path="/create-profile" component={CreateProfile}></PrivateRoute>

</Switch>
<Switch>
<PrivateRoute exact path="/edit-profile" component={EditProfile}></PrivateRoute>

</Switch>
<Switch>
<PrivateRoute exact path="/add-experience" component={AddExperience}></PrivateRoute>

</Switch>

<Switch>
<PrivateRoute exact path="/add-education" component={AddEducation}></PrivateRoute>

</Switch>
<Switch>
<PrivateRoute exact path="/feed" component={Posts}></PrivateRoute>

</Switch>
<Switch>
<PrivateRoute exact path="/post/:id" component={Post}></PrivateRoute>

</Switch>

      </div>
      <Footer></Footer>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
