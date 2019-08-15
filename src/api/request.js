import axios from "axios";
import { baseUrl } from ".";

const defaultPath = "requests";

export default {
    getRequests: () => axios.get(`${baseUrl}/${defaultPath}`),

    getRequest: id => axios.get(`${baseUrl}/${defaultPath}/${id}`),

    createRequest: data => axios.post(`${baseUrl}/${defaultPath}`, data),

    deleteRequest: id => axios.delete(`${baseUrl}/${defaultPath}/${id}`)
};
