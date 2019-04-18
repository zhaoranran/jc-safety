<template>
    <div class="header">
        <div class="header-center module">
            <div class="logo">
                <img src="../../assets/images/logo.png" alt="">
            </div>
            <div class="nav">
                <router-link v-for="(item,index) in navList" :key="index" :to="{name: item.url}" class="nav-item" :class="{ active:index==navActive}">
                    {{item.name}}
                </router-link>
            </div>
            <div class="login" v-if="!hasLogin">
                <button>登陆</button>
            </div>
            <div class="login has-login"  v-else>
                <span>
                    <i class="icon iconfont iconyonghu"></i>
                    {{userName}}
                </span>
                <a>退出</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            current:0,
            hasLogin:true,
            userName:'小白猫',
           navList:[
               {
                   name:'首页',
                   navHref:'#',
                   url:'home'
               },
               {
                   name:'任务大厅',
                   navHref:'#',
                   url:'task'
               },
               {
                   name:'众测中心',
                   navHref:'#',
                   url:'testcenter'
               },
               {
                   name:'积分商城',
                   navHref:'#',
                   url:'points'
               },
               {
                   name:'公告中心',
                   navHref:'#',
                   url:'notice'
               },
               {
                   name:'关于我们',
                   navHref:'#',
                   url:'about'
               },{
                   name:'英雄榜',
                   navHref:'#',
                   url:'heroes'
               }
               
           ]
        }
    },
    props:{
        navActive: {
        type: Number,
        default: 0
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
    .login a{
        width: 80px;
        height: 30px;
        line-height: 30px;
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
    .has-login a{
        background: $global-a-color;
        cursor: pointer;
    }
    .has-login a:hover{
        background: $global-a-hover-color;
        cursor: pointer;
    }
</style>