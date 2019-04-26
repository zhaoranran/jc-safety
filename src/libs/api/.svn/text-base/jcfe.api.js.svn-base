import axios from 'axios';
import config from '../../../config';

const REQROOTPATH = 'http://'+config.dev.ip+':'+config.dev.port+'/server';
//const REQROOTPATH = 'http://172.16.3.77:7120/goa';

const HTTP = axios.create({
    baseURL: REQROOTPATH,
    params: {},
    data: {}
});

const URL_MAPPING = {
    'getCourseNewList': '/getCourseNewList'
}

// 添加请求拦截器
HTTP.interceptors.request.use(function (config) {
    Object.keys(URL_MAPPING).forEach((intefaceName)=>{
        if(config.url.lastIndexOf(intefaceName) >= 0){
            let suffix = '',index = config.url.indexOf('?');
            if(index >= 0) suffix = config.url.substring(index ,config.url.length);
            config.url = config.baseURL + URL_MAPPING[intefaceName] + suffix;
        }
    });
   
    if(config.method.toLocaleLowerCase() === 'get'){
        config.params.userId = '200001';
    }
    if(config.method.toLocaleLowerCase() === 'post'){
        config.data.userId = '200001';
    }
    config.data['login-at'] = true;
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加相应拦截器
HTTP.interceptors.response.use(function(res){
	res.data.code = "000000";
	return res;
},function(err){
  	// 对请求错误做些什么
  	return Promise.reject(error);
})

export { HTTP };