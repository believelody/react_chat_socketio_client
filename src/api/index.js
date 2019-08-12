import chat from "./chat";
import user from "./user";

export let baseUrl = process.env.REACT_APP_SERVER_URL
  ? `${process.env.REACT_APP_SERVER_URL}/api`
  : "https://react-chat-socketio-server.herokuapp.com/api";
export default { chat, user };
