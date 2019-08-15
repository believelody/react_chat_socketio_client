import axios from "axios";
import { baseUrl } from "./";

const defaultPath = "users";

export default {
  getUsers: () => axios.get(`${baseUrl}/${defaultPath}`),

  getUser: id => axios.get(`${baseUrl}/${defaultPath}/${id}`),

  login: (email, password) =>
    axios.post(`${baseUrl}/${defaultPath}/login`, { email, password }),

  register: (name, email, password) =>
    axios.post(`${baseUrl}/${defaultPath}/register`, { name, email, password }),

  updateUser: (id, data) => axios.post(`${baseUrl}/${defaultPath}/${id}`, data),

  addFriend: (contactId, userId) => axios.post(`${baseUrl}/${defaultPath}/${userId}/new-friend`, { contactId }),

  blockFriend: (id, data) =>
    axios.post(`${baseUrl}/${defaultPath}/${id}/new-blocked`, data),

  requestFriend: (contactId, userId) =>
    axios.post(`${baseUrl}/${defaultPath}/${userId}/new-request`, {contactId}),

  searchUser: (id, userQuery) =>
    axios.get(`${baseUrl}/${defaultPath}/${id}/search-user?user=${userQuery}`),

  searchFriend: (id, friendQuery) =>
    axios.get(
      `${baseUrl}/${defaultPath}/${id}/search-friend?friend=${friendQuery}`
    ),

  getChatList: id => axios.get(`${baseUrl}/${defaultPath}/${id}/chat-list`),

  getFriendList: id => axios.get(`${baseUrl}/${defaultPath}/${id}/friend-list`),

  getRequestList: id =>
    axios.get(`${baseUrl}/${defaultPath}/${id}/request-list`),

  getBlockedList: id =>
    axios.get(`${baseUrl}/${defaultPath}/${id}/blocked-list`),

  deleteChat: (id, chatId) => axios.delete(`${baseUrl}/${defaultPath}/${id}/delete-chat?chatId=${chatId}`),

  deleteFriend: (id, friendId) => axios.delete(`${baseUrl}/${defaultPath}/${id}/delete-friend?friendId=${friendId}`),

  deleteBlocked: (id, blockedId) => axios.delete(`${baseUrl}/${defaultPath}/${id}/delete-blocked?blockedId=${blockedId}`),

  deleteRequest: (contactId, userId) => axios.delete(`${baseUrl}/${defaultPath}/${userId}/delete-request?contactId=${contactId}`),

  cancelFriendRequest: (contactId, userId) => axios.delete(`${baseUrl}/${defaultPath}/${userId}/cancel-request?contactId=${contactId}`),

  deleteUser: id => axios.delete(`${baseUrl}/${defaultPath}/${id}`),

  dropFriend: () => axios.delete(`${baseUrl}/${defaultPath}/drop-friend`),

  dropRequest: () => axios.delete(`${baseUrl}/${defaultPath}/drop-request`),
};
