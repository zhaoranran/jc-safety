<template>
    <div class="header">
        <div class="header-center module">
            <div class="logo">
                <img src="../../assets/images/logo.png" alt="">
            </div>
            <div class="nav">
                <router-link v-for="(item,index) in navList" :key="index" :to="{name: item.url}" class="nav-item" :class="{ active:index==navActive}" @click.native="isLogin(item.url)">
                    {{item.name}}
                </router-link>
            </div>
            <div class="login" v-if="!hasLogin">
                <span @click="goLogin">登陆</span>
            </div>
            <div class="login has-login"  v-else>
                <a class="has-login-a" href="#/personal">
                    <i class="icon iconfont iconyonghu"></i>
                    {{userInfo.userName}}
                </a>
                <span @click="open">退出</span>
            </div>
        </div>
    </div>
</template>

<script>
import Bus from '../../libs/bus.js'
import { debug } from 'util';
export default {
    data(){
        return {
            current:0,
            hasLogin:false,
            
            userInfo:{
                userName:'小白猫',
                token:'',
                userId:''
            },
           navList:[
               {
                   name:'首页',
                   navHref:'#',
                   url:'home',
                   navActive:0
               },
               {
                   name:'任务大厅',
                   navHref:'#',
                   url:'task',
                   navActive:1
               },
               /* {
                   name:'众测中心',
                   navHref:'#',
                   url:'testcenter',
                   navActive:2
               }, */
               {
                   name:'积分商城',
                   navHref:'#',
                   url:'points',
                   navActive:3
               },
               {
                   name:'公告中心',
                   navHref:'#',
                   url:'notice',
                   navActive:4
               },
               {
                   name:'关于我们',
                   navHref:'#',
                   url:'about',
                   navActive:5
               },/* {
                   name:'英雄榜',
                   navHref:'#',
                   url:'heroes',
                   navActive:6
               } */
                {
                   name:'个人中心',
                   navHref:'#',
                   url:'personal',
                   navActive:7
               }
           ],
           timer:null
        }
    },
    props:{
        navActive: {
        type: Number,
        default: 0
      }
    },
    mounted() {
        let _this = this;
        this.$nextTick(()=>{
            _this.userInfo.userName = window.sessionStorage.getItem("username");
            _this.userInfo.userId = window.sessionStorage.getItem("userId");
            _this.userInfo.token = window.sessionStorage.getItem("token");
            if(_this.userInfo.userName != null){
                _this.hasLogin = true
            }else{
               _this.hasLogin = false 
            }
        });
        Bus.$on('sessionToken', (data) => {
            if(data){
                _this.hasLogin = true;
                _this.userInfo.userName = data;
            }
        })
    },
    methods:{
        isLogin(url){
            let token = window.sessionStorage.getItem("token");
            if(url == 'personal' &&  token == null){
                this.$confirm('去登陆', '确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$router.push({
                            path: `login`,
                        })
                    }).catch(() => {      
                        this.$router.go(-1);     
                });
            }
        },
        goLogin(){
            this.$router.push({
                path: `/login`,
            })
        },
        backLogin(){
            let _this = this;
            _this.$axios.get('/frontLogout')
            .then(res => {
                if(res.data.success == 'true'){
                    window.sessionStorage.removeItem('token');
                    window.sessionStorage.removeItem('username');
                    window.sessionStorage.removeItem('userId');
                    this.hasLogin = false;
                    if(_this.$route.name == 'task-details' || _this.$route.name == 'personal'){
                        this.$router.push({
                        path: `/home`,
                    })
                    }
                    /* this.$router.push({
                        path: `login`,
                    }) */
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
        open() {
            this.$confirm('确定要退出吗', '确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.backLogin();
                }).catch(() => {   
                    return false;     
            });
        }
    },
    watch:{
        userInfo:{
            handler(newValue, oldValue) {
            if(newValue.userName != null){
                this.hasLogin = true;
                this.userInfo.userName = newValue.userName;
            }else{
               this.hasLogin = false ;
            }
    　　　},
    　　　　deep: true
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/common.scss';
    .header{
        height: 90px;
        width:100%;
        display: flex;
        justify-content: left;
        position: fixed;
        left:0;
        top:0;
        line-height: 90px;
        background-color:#004499;
        z-index: 10;
    }
    .header-center{
        display: flex;
        justify-content: flex-start;
        position: relative;
    }
    .logo img{
        margin:20px;
    }
    .nav{

    }
    .nav .nav-item{
        float: left;
        display: block;
        height: 90px;
        margin:0 10px;
        color:#fff;
        font-size: 16px;
        border-bottom:2px solid transparent;
    }
    .nav .nav-item:hover,.nav .nav-item.active{
        border-bottom:2px solid #fff;
    }
    .login{
        position: absolute;
        right:0;
    }
    .login span{
        width: 80px;
        height: 30px;
        line-height: 27px;
        display: inline-block;
        text-align: center;
        border:1px solid #002e73;
        border-radius: 4px;
        background-image: linear-gradient(to top, #3455cb,#1ca7f9);
        color:#fff;
        font-size:14px;
        cursor:pointer;
    }
    .has-login .has-login-a{
        color:#fff;
        display:inline-block;
        margin-right: 30px;
        font-size: 16px;
        cursor: pointer;
    }
    .has-login .has-login-a i{
        font-size: 18px;
    }
    .has-login span{
        background: $global-a-color;
        cursor: pointer;
    }
    .has-login span:hover{
        background: $global-a-hover-color;
        cursor: pointer;
    }
</style>