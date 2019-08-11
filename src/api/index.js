import chat from "./chat";
import user from "./user";

export const baseUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

export default { chat, user };
