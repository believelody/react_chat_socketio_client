import chat from "./chat";
import user from "./user";

export let baseUrl = process.env.NODE_ENV === 'production'
  ? `${process.env.REACT_APP_SERVER_URL}/api`
  : "http://localhost:5000/api";
export default { chat, user };
