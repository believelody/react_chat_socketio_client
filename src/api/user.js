import axios from "axios";

export default {
  getUsers: () => axios.get(`/users`),

  getUser: id => axios.get(`/users/${id}`),

  login: (email, password) => axios.post(`/users/login`, { email, password }),

  register: (name, email, password) => axios.post(`/users/register`, { name, email, password }),

  updateUser: (id, data) => axios.post(`/users/${id}`, data),

  addFriend: (id, data) => axios.post(`/users/${id}`, data),

  blockFriend: (id, data) => axios.post(`/users/${id}`, data),

  requestFriend: (id, data) => axios.post(`/users/${id}`, data),

  searchUser: (id, userQuery) => axios.get(`/users/${id}/search-user?user=${userQuery}`),

  searchFriend: (id, friendQuery) => axios.get(`/users/${id}/search-friend?friend=${friendQuery}`),

  getChatList: id => axios.get(`/users/${id}/chat-list`),

  getFriendList: id => axios.get(`/users/${id}/friend-list`),

  getRequestList: id => axios.get(`/users/${id}/request-list`),

  getBlockedList: id => axios.get(`/users/${id}/blocked-list`),

  deleteChat: (id, chat) => axios.put(`/users/${id}`, {chat}),

  deleteFriend: (id, friend) => axios.put(`/users/${id}`, {friend}),

  deleteBlocked: (id, blocked) => axios.put(`/users/${id}`, {blocked}),

  deleteRequest: (id, request) => axios.put(`/users/${id}`, {request}),

  deleteUser: id => axios.delete(`/users/${id}`)
};
