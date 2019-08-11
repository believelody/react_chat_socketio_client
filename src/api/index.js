import axios from "axios";
import chat from "./chat";
import user from "./user";

axios.defaults.baseUrl =
  process.env.REACT_APP_SERVER_URL || "http://localhost:5000";
export default { chat, user };
