import axios from "axios";
import chat from "./chat";
import user from "./user";

axios.defaults.baseUrl = "http://localhost:5000";
// axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Access-Content-Allow-Origin'] = '*';
// axios.defaults.headers.common['crossDomain'] = true;
// axios.defaults.headers.common['Content-Type'] = 'application/json';
console.log(axios.defaults);
export default { chat, user };
