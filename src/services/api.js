import axios from "axios";

const api = axios.create({
    baseURL: "https://student-course-management-api-13d8.onrender.com/api/",
});

export default api;