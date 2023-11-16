import axios from 'axios';
import NProgress from 'nprogress';
import {BASE_URL} from '@/constants';

export const $api = () => {
    const instance = axios.create({
        baseURL: BASE_URL
    });

    instance.defaults.headers['Accept'] = 'application/json';
    instance.defaults.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWVmNDZiYmEzYzBlMThhMGYwNTFkNjdmMjA2YjEyZCIsInN1YiI6IjY0YWY5ZGE0OGEwZTliMDExZDhlMjg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.buQ2a81tQAk_2BmQFyYfAmCZHhxr9icsKojvzYxNzLA';

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
