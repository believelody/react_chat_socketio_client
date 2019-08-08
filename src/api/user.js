import axios from "axios";
import { baseUrl } from "./";

export default {
  getUsers: () => axios.get(`${baseUrl}/users`),

  searchChatByUsers: users =>
    axios.get(`${baseUrl}/chats/searching-chat?users=${users}`),

  getUser: id => axios.get(`${baseUrl}/chats/${id}`),

  login: (email, password) =>
    axios.post(`${baseUrl}/chats/login`, { email, password }),

  register: data => axios.post(`${baseUrl}/chats/register`, data),

  addUserToChat: (id, user) => axios.post(`${baseUrl}/chats/${id}`, user),

  removeUserToChat: (id, userId) =>
    axios.delete(`${baseUrl}/chats/${id}`, userId),

  deleteChat: id => axios.delete(`${baseUrl}/chats/${id}`)
};
