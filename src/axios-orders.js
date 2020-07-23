import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://laravel-burger-builder.herokuapp.com/api/'
});

export default instance;