import axios from "axios";
import { baseUrl } from "./";

export default {
  getUsers: () => axios.get(`${baseUrl}/users`),

  getUser: id => axios.get(`${baseUrl}/users/${id}`),

  login: (email, password) =>
    axios.post(`${baseUrl}/users/login`, { email, password }),

  register: (name, email, password) => axios.post(`${baseUrl}/users/register`, { name, email, password }),

  updateUser: (id, data) =>
    axios.post(`${baseUrl}/users/${id}`, data),

  searchUser: (id, userQuery) => axios.get(`${baseUrl}/users/${id}/search-user?user=${userQuery}`),

  searchFriend: (id, friendQuery) => axios.get(`${baseUrl}/users/${id}/search-friend?friend=${friendQuery}`),

  getChatList: id => axios.get(`${baseUrl}/users/${id}/chat-list`),

  getFriendList: id => axios.get(`${baseUrl}/users/${id}/friend-list`),

  getBlockedList: id => axios.get(`${baseUrl}/users/${id}/blocked-list`),

  deleteUser: id => axios.delete(`${baseUrl}/users/${id}`)
};
