import chat from "./chat";
import user from "./user";

export let baseUrl = process.env.REACT_APP_SERVER_URL
  ? process.env.REACT_APP_SERVER_URL
  : "http://localhost:5000/api";
export default { chat, user };
