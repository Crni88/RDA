import axios from 'axios';
import {
    ADD_POST,
    DELETE_POST,
    GET_ERRORS,
    POST_LOADING,
    GET_POSTS,
    GET_POST,
    CLEAR_ERRORS

}from './types';
// Add Post
export const addPost = postData => dispatch => {
    dispatch(clearErrors());
    axios
      .post('/api/posts', postData)
      .then(res =>
        dispatch({
          type: ADD_POST,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  //Add like
  export const addLike = id => dispatch => {
    //dispatch(clearErrors());
    axios
      .post(`/api/posts/like/${id}`, id)
      .then(res =>
        dispatch(getPosts())
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  //Remove like
  export const removeLike = id => dispatch => {
    //dispatch(clearErrors());
    axios
      .post(`/api/posts/unlike/${id}`, id)
      .then(res =>
        dispatch(getPosts())
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };


// Get Posts
export const getPosts = () => dispatch => {
    //dispatch(setPostLoading());
    axios
      .get('/api/posts')
      .then(res =>
        dispatch({
          type: GET_POSTS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_POSTS,
          payload: null
        })
      );
  };
// Get Post
export const getPost = id => dispatch => {
  //dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};
//ADD comment
export const addComment = (id,commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${id}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//Delete comment
export const deleteComment = (id,commentId) => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`/api/posts/comment/${id}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
  // Delete Post
export const deletePost = id => dispatch => {
    axios
      .delete(`/api/posts/${id}`)
      .then(res =>
        dispatch({
          type: DELETE_POST,
          payload: id
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  

//SET LOADING STATE 
export const setPostLoading=() =>{
    return {
        type:POST_LOADING
    }
}

//CLEAR ERROS 
export const clearErrors=() =>{
  return {
      type:CLEAR_ERRORS
  };
};
