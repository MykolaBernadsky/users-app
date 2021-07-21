import types from "../types";

const initialState = {
  list: [],
  postDetails: [],
  activePost: {}
};

export default function userReducer (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case types.GET_USERS :
      return {...state, list: payload}
    case types.GET_USERS_POSTS:
      return setPosts(state, payload);
    case types.GET_POST_DETAILS:
      return {...state, postDetails: payload};
    case types.CREATE_POST:
      return addPost(state, payload);
    case types.UPDATE_POST:
      return updatePost(state, payload);
    case types.DELETE_POST:
      return deletePost(state, payload);
    case types.SET_ACTIVE_POST:
      return {...state, activePost: payload}
      default:
      return state
  }
};

const setPosts = (state, payload) => {
  const { list } = state;
  const { data, userId } = payload;
  const newList = list.map(item => {
    if (item.id === userId){
      item.posts = data;
    }
    return item;
  });

  return {...state, list: newList};
}

const addPost = (state, payload) => {
  const { id, userId, post } = payload;
  const { list } = state;

  const updatedList = list.map(item => {
    if (item.id === userId) {
      item.posts.push({ title: post, id, userId });
    }
    return item;
  });


  return {...state, list: updatedList };
}

const updatePost = (state, payload) => {
  const { activePost } = state;

  const newActivePost = {...activePost, title: payload.post}

  return {...state, activePost: newActivePost};
}

const deletePost = (state, payload) => {
  const {list, activePost} = state;

  const updatedList = list.map(item => {
    if (item.id === activePost.userId) {
      const newPosts = item.posts.filter(item => item.id !== activePost.id)

      return {...item, posts: newPosts};
    }
    return item;
  });

  return {...state, list: updatedList };
}