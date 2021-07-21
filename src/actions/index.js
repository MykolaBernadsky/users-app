import types from "../types";
import {requestServices} from "../services";

const getUsersList = () => async dispatch => {
  const res = await requestServices.userActions.getUsers();

  dispatch({type: types.GET_USERS, payload: res.data})
}

const getUsersPosts = userId => async dispatch => {
  const res = await requestServices.userActions.getUserPosts(userId);

  dispatch({type: types.GET_USERS_POSTS, payload: { data: res.data, userId}});
}

const getPostDetails = postId => async dispatch => {
  const res = await requestServices.userActions.getPostDetails(postId);

  dispatch({type: types.GET_POST_DETAILS, payload: res.data});
}

const createPost = payload => async dispatch => {
  const res = await requestServices.userActions.createPost(payload);

  dispatch({type: types.CREATE_POST, payload: res.data});
}

const updatePost = (postId, payload) => async dispatch => {
  const res = await requestServices.userActions.updatePost(postId, payload);

  dispatch({type: types.UPDATE_POST, payload: res.data});
}

const deletePost = payload => async dispatch => {
  const res = await requestServices.userActions.deletePost(payload.id);

  dispatch({type: types.DELETE_POST, payload});
}

export { getUsersList, getUsersPosts, getPostDetails, deletePost, createPost, updatePost };