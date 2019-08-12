import axios from "axios";
import { baseUrl } from ".";

const defaultPath = "chats";

export default {
  getChats: () => axios.get(`/${baseUrl}/${defaultPath}`),

  searchChatByUsers: users =>
    axios.get(`/${baseUrl}/${defaultPath}/searching-chat?users=${users}`),

  getChat: id => axios.get(`/${baseUrl}/${defaultPath}/${id}`),

  createChat: data => axios.post(`/${baseUrl}/${defaultPath}`, data),

  addUserToChat: (id, user) =>
    axios.post(`/${baseUrl}/${defaultPath}/${id}`, user),

  removeUserToChat: (id, userId) =>
    axios.delete(`/${baseUrl}/${defaultPath}/${id}`, userId),

  deleteChat: id => axios.delete(`/${baseUrl}/${defaultPath}/${id}`)
};
