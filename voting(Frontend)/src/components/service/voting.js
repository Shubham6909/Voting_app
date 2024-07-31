import axios from "axios";

export const voting=axios.create({
    baseURL:"http://localhost:8080/api/users"
})