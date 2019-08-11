import axios from "axios";
import chat from "./chat";
import user from "./user";

axios.defaults.baseUrl = "http://localhost:5000/api";
export default { chat, user };
