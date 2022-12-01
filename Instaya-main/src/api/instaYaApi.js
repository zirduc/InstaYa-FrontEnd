import axios from "axios";

export const instaYaApi = axios.create({
    baseURL: 'https://rest-server-jz.herokuapp.com'
});

