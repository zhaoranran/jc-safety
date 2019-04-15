<template>
    <div class="header module">
        <div class="logo">
            <img src="../../assets/images/logo.png" alt="">
        </div>
        <ul class="nav">
            <li v-for="(item,index) in navList" :key="index">
                <a href="#" :key="index" :id="index" :class="index === 0?'active':''">{{item.name}}</a>
            </li>
        </ul>
        <div class="login" v-if="!hasLogin">
            <button>登陆</button>
        </div>
        <div class="login has-login"  v-else>
            <span>
                <i class="icon iconfont iconyonghu"></i>
                {{userName}}
            </span>
            <button>退出</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            hasLogin:true,
            userName:'小白猫',
           navList:[
               {
                   name:'首页',
                   navHref:'#'
               },
               {
                   name:'任务大厅',
                   navHref:'#'
               },
               {
                   name:'众测中心',
                   navHref:'#'
               },
               {
                   name:'积分商城',
                   navHref:'#'
               },
               {
                   name:'公告中心',
                   navHref:'#'
               },
               {
                   name:'关于我们',
                   navHref:'#'
               }
           ]
        }
    }
}
</script>

<style lang="">
    .header{
        height: 90px;
        display: flex;
        justify-content: left;
        position: relative;
    }
    .logo img{
        margin:20px;
    }
    .nav{

    }
    .nav li {
        float: left;
        
    }
    .nav li a{
        display: block;
        height: 90px;
        margin:0 10px;
        color:#fff;
        font-size: 16px;
        border-bottom:2px solid transparent;
    }
    .nav li a:hover,.nav li a.active{
        border-bottom:2px solid #fff;
    }
    .login{
        position: absolute;
        right:0;
    }
    .login button{
        width: 80px;
        height: 30px;
        display: inline-block;
        text-align: center;
        border:1px solid #002e73;
        border-radius: 4px;
        background-image: linear-gradient(to top, #3455cb,#1ca7f9);
        color:#fff;
    }
    .has-login span{
        color:#fff;
        display:inline-block;
        margin-right: 30px;
        font-size: 16px;
    }
    .has-login span i{
        font-size: 18px;
    }
    .has-login button{
        background-image: linear-gradient(to top, #c95b34,#f9bc1c);
    }
</style>