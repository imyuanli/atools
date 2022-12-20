import axios from 'axios';
import {message} from "antd";

function request(url: any, data: any = {}, method: string = 'GET') {
    return new Promise(function (resolve) {
        let axiosJson = {
            url: url,
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            params: null,
            data: null
        };
        if (method === 'GET') {
            axiosJson['params'] = data;
        } else {
            axiosJson['data'] = data;
        }
        axios(axiosJson)
            .then((res) => {
                if (res.status === 200) {
                    resolve(res.data);
                }
            })
            .catch((err) => {
                message.error('可能网络波动了，稍后重试一下吧',);
            });
    });
}

request.get = (url: any, data?: any) => {
    return request(url, data, 'GET');
};

request.post = (url: any, data?: any) => {
    return request(url, data, 'POST');
};
export default request;
