import axios from 'axios';
import {GET_ERRORS,SET_CURRENT_USER} from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//Register a user 
export const registeruser = (userData,history) => dispatch =>{
      axios
      .post('/api/users/register',userData)
      .then(res =>history.push('/login') )
      .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        );  
}


//Login - get user token

export const loginUser = (userData) => dispatch =>{
  axios.post('/api/users/login', userData)
  .then(res => {
    //Save to local storage 
    const {token} = res.data;
    //Set token to local storage
    localStorage.setItem('jwtToken',token); //Only saves strings
    //Set token to Auth header
    setAuthToken(token);
    //Decode token to get user data 
    const decoded = jwt_decode(token);//Stores the user data 
    //Set current user 
    dispatch(setCurrentUser(decoded)); // Dispatches to the function
  })
  .catch(err => {
    dispatch({
     type:GET_ERRORS,
      payload:err.response.data
    })    
  })
};

//Set logged in user

export const setCurrentUser = (decoded) => {
  return {
    type:SET_CURRENT_USER,
    payload:decoded //User info
  }
}

//Log user out

export const logoutUser = () =>dispatch=>{
    //Remove the token from the local storage 
    localStorage.removeItem('jwtToken');
    //Remove the auth header for future requests 
    setAuthToken(false);

    //Set the current user to { } which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}