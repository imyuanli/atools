let env = process.env.NODE_ENV;
let BASE_URL = "";
if (env === 'production') {  //正式服
    BASE_URL = "https://api.imyuanli.cn/api/tools/";
} else { // 本地
    BASE_URL = 'https://api.imyuanli.cn/api/tools/';
}
export default BASE_URL
