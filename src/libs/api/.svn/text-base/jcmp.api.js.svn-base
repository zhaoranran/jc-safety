import jcmp from '../jcmp.js';		
import axios from 'axios';
import config from '../../../config';

const REQROOTPATH = config.build.server;

const HTTP = axios.create({
    baseURL: jcmp.gatewayUrl,
    headers: {
        'client_app_id': jcmp._appId(),
        'client_device_id': jcmp._deviceId(),
        'access_token': jcmp._jcmpToken()
    },
    params: {},
    data: {},
    transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
        	ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
    }],
});

// 添加请求拦截器
HTTP.interceptors.request.use(function (config) {
    if(config.method.toLocaleLowerCase() === 'post'){
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
HTTP.interceptors.response.use(function(res){
	if(res.data.code == "100003"){//会话验证失败，请重新登录
		setTimeout(jcmp.logout, 1000);
	}
	return res;
},function(err){
  	// 对请求错误做些什么
  	return Promise.reject(error);
})

export { HTTP };