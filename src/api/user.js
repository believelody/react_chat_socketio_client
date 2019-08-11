import axios from "axios";
import { baseUrl } from "./";

export default {
  getUsers: () => axios.get(`${baseUrl}/users`),

  getUser: id => axios.get(`${baseUrl}/users/${id}`),

  login: (email, password) => axios.post(`${baseUrl}/users/login`, { email, password }),

  register: (name, email, password) => axios.post(`${baseUrl}/users/register`, { name, email, password }),

  updateUser: (id, data) => axios.post(`${baseUrl}/users/${id}`, data),

  addFriend: (id, data) => axios.post(`${baseUrl}/users/${id}`, data),

  blockFriend: (id, data) => axios.post(`${baseUrl}/users/${id}`, data),

  requestFriend: (id, data) => axios.post(`${baseUrl}/users/${id}`, data),

  searchUser: (id, userQuery) => axios.get(`${baseUrl}/users/${id}/search-user?user=${userQuery}`),

  searchFriend: (id, friendQuery) => axios.get(`${baseUrl}/users/${id}/search-friend?friend=${friendQuery}`),

  getChatList: id => axios.get(`${baseUrl}/users/${id}/chat-list`),

  getFriendList: id => axios.get(`${baseUrl}/users/${id}/friend-list`),

  getRequestList: id => axios.get(`${baseUrl}/users/${id}/request-list`),

  getBlockedList: id => axios.get(`${baseUrl}/users/${id}/blocked-list`),

  deleteChat: (id, chat) => axios.put(`${baseUrl}/users/${id}`, {chat}),

  deleteFriend: (id, friend) => axios.put(`${baseUrl}/users/${id}`, {friend}),

  deleteBlocked: (id, blocked) => axios.put(`${baseUrl}/users/${id}`, {blocked}),

  deleteRequest: (id, request) => axios.put(`${baseUrl}/users/${id}`, {request}),

  deleteUser: id => axios.delete(`${baseUrl}/users/${id}`)
};
