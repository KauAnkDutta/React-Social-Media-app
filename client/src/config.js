import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://react-js-tribe-app.herokuapp.com/"
})