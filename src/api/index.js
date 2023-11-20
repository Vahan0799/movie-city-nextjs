import axios from 'axios';
import NProgress from 'nprogress';
import {API_URL, API_TOKEN} from '@/constants';

export const $api = () => {
    const instance = axios.create({
        baseURL: API_URL
    });

    instance.defaults.headers['Accept'] = 'application/json';
    instance.defaults.headers['Authorization'] = `Bearer ${API_TOKEN}`;

    instance.interceptors.response.use(response => {
        if (typeof document !== 'undefined') NProgress.done();
        return response
    }, error => {
        if (typeof document !== 'undefined') NProgress.done();
        console.log(error);
    })

    instance.interceptors.request.use(function (config) {
        if (typeof document !== 'undefined') NProgress.start();

        return config;
    }, function (error) {

        if (typeof document !== 'undefined') NProgress.done();
        console.error(error)
        return Promise.reject(error);
    });


    return instance;
}
