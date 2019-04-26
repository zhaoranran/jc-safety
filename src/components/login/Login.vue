<template>
    <div class="login-pager m-t-90">
        <v-crumbs :crumbsList="crumbsList"></v-crumbs>
        <div class="login-center">
            <div class="login-left">
                <img src="../../assets/images/login.png" alt="">
            </div>
            <div class="login-right">
                <h2 class="commont-title"><span>白帽登录</span></h2>
                <div class="userInfo">
                    <input type="text" id="username" name="username" v-model="username" placeholder="请输入您的用户名">
                    <label for="username">
                        <i class="icon iconfont iconyonghu1"></i>
                    </label>
                </div>
                <div class="userInfo">
                    <input type="password" id="password" name="password" v-model="password" placeholder="请输入您的密码">
                    <label for="password">
                        <i class="icon iconfont iconmimasuo"></i>
                    </label>
                </div>
                <div id="errormsg" class="error" style="display: none;"></div>
                <!-- <div class="remember">
                    
                    <label class="label">
                        <input id="remember" type="checkbox" >记住密码
                    </label>
                    <a id="showForget">忘记密码</a>
                </div> -->
                <div class="userInfo submit">
                    <a id="loginBtn" href="javascript:;" @click="loginGo">登录</a>
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>
// 引入公共的bug，来做为中间传达的工具
  import Bus from '../../libs/bus.js'
import Crumbs from '../../components/crumbs/Crumbs'
export default {
    data(){
        return {
            crumbsList:[
                {
                    name:'嘉诚安全响应中心',
                    url:''
                },
                {
                    name:'登陆',
                    url:''
                }
            ],
            username:'',
            password:''
        }
    },
    components:{
       'v-crumbs':Crumbs
    },
    mounted() {
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('username');
        window.sessionStorage.removeItem('userId');
    },
    created() {
        let that = this;
        document.onkeypress = function(e) {
        var keycode = document.all ? event.keyCode : e.which;
        if (keycode == 13) {
            that.getUser();// 登录方法名
            return false;
        }
        };
    },
    methods: {
        loginGo(){
            this.getUser();
        },
        getUser(){
            let _this = this;
            _this.$axios.get('/frontLogin',{
            username:_this.username,
            password:_this.password
        })
        .then(res => {
            if(res.data.success == 'true'){
                _this.sign(res.data);
                _this.$router.push({
                    path: `home`,
                })
            }else{
                _this.$message({
                    type: 'error',
                    message: res.data.errorMessage
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        },
        sign(data) {
            if (window && window.sessionStorage) {
                sessionStorage.setItem("token", data.sessionToken);
                sessionStorage.setItem("username", data.userInfo.displayName);
                sessionStorage.setItem("userId", data.userInfo.id);
                Bus.$emit('sessionToken', data.userInfo.displayName)
            }
        }
    },
}
</script>
<style lang="scss">
@import '../../assets/sass/common.scss';
    .login-pager {
        position: relative;
    }
    .login-center{
        width: 936px;
        margin:0 auto;
        display: flex;
        background: #fff;
        margin-bottom:120px;
    }
    .login-left{
        width:440px;
        height: 560px;
        margin-right: 35px;
        
    }
    .login-left img{
        width: 100%;
        height: 100%;
    }
    .login-right{
        flex:1;
    }
    .login-right .commont-title{
        margin-top:60px;
    }
    .login-right .userInfo {
        position: relative;
        height: 62px;
        line-height: 62px;
        margin-top: 50px;
        margin-right: 55px;
        border: 1px solid #d1d1d1;
        border-radius: 6px;
    }
    .userInfo input {
        position: relative;
        left: 60px;
        display: inline-block;
        width: 85%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #555;
        border:none;
    }
    .userInfo label {
        position: absolute;
        left: 20px;
        top:2px;
        color:#666;
    }
    .remember {
        margin-top: 20px;
        margin-right: 55px;
        font-size: 14px;
        text-align: left;
        color: #999;
        display: flex;
        justify-content: space-between;
        line-height: 20px;
    }
    .remember .label {
        cursor: pointer;
        margin-top: -3px;
    }
    .remember .label input {
        position: relative;
        top: 3px;
        display:inline-block;
        width:15px;
        height:16px;
        margin-right: 5px;
        -webkit-appearance: checkbox;
        box-sizing: border-box;
        background:transparent;
        color:#555;
    }
   input:focus{
        border:none;
        outline:none;
    }
    .remember a{
        cursor: pointer;
        color:$global-a-color ;
    }
    .remember a:hover{
        text-decoration: underline;
    }
    .userInfo.submit {
        width: 285px;
        height: 50px;
        margin: 0 auto;
        margin-top:100px;
        border: none;
        border-radius: 6px;
    }
.userInfo.submit a {
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    text-align: center;
    color: #fff;
    border-radius: 4px;
    background: linear-gradient(to right, #1ca9fa , #3552c9);
}
.userInfo.submit a:hover{
    background: linear-gradient(to right, #fabe1c , #c95835);
}
</style>