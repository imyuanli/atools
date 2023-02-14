import axios from 'axios';
import {message, notification} from "antd";

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

const HTTP_STATUS = {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    CLIENT_ERROR: 400,
    AUTHENTICATE: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
};

function request(url: any, data: any = {}, method: string = 'GET') {
    return new Promise(function (resolve,reject) {
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
                if (res.status === HTTP_STATUS.SUCCESS) {
                    //正常请求
                    if (res.data.errno === 0) {
                        resolve(res.data.data);
                    } else if (res.data.errno === 422) {
                        notification['warning']({
                            message: '提示',
                            description: res.data.errmsg,
                        });
                        resolve(res.data.errno);
                    }
                }
            })
            .catch((err) => {
                reject(err)
                notification['warning']({
                    message: '请求出错了',
                    description:
                        '网络波动了，请稍后刷新重试一下',
                });
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
