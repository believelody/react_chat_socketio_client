import chat from "./chat";
import user from "./user";

export const baseUrl = process.env.REACT_APP_BASE_URL || `http://localhost:5000/api`;

export default { chat, user };
