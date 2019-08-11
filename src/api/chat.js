import axios from "axios";

export default {
  getChats: () => axios.get(`/chats`),

  searchChatByUsers: users =>
    axios.get(`/chats/searching-chat?users=${users}`),

  getChat: id => axios.get(`/chats/${id}`),

  createChat: data => axios.post(`/chats`, data),

  addUserToChat: (id, user) => axios.post(`/chats/${id}`, user),

  removeUserToChat: (id, userId) =>
    axios.delete(`/chats/${id}`, userId),

  deleteChat: id => axios.delete(`/chats/${id}`)
};
