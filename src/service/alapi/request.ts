import axios from 'axios';
import {message} from "antd";

// 	返回200表示接口正常
// 404	接口地址不存在
// 422	接口请求失败
// 400	接口请求失败
// 405	请求方法不被允许
// 100	token 错误
// 101	账号过期
// 102	接口请求次数超过限制
// 104	来源或者ip不在白名单
// 406	没有更多数据了
// 429	请求 QPS 超过限制


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
                    if (res.data.code == 200 && res.data) {
                        resolve(res.data.data);
                    } else {
                        message.warning(res.data.msg)
                    }
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
