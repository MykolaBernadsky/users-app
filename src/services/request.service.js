import axios from "axios";

const userActions = {
  getUsers: () => {
    return axios.get('https://jsonplaceholder.typicode.com/users');
  },

  getUserPosts: userId => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  },
  getPostDetails: postId => {
    return axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  },

  createPost: payload => {
    return axios.post('https://jsonplaceholder.typicode.com/posts', payload);
  },

  updatePost: (postId, payload) => {
    return axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, payload);
  },

  deletePost: postId => {
    return axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId} `);
  }
}

export { userActions };