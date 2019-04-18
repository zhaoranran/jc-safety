<template>
    <div class="notice-details">
        <v-crumbs :crumbsList="crumbsList"></v-crumbs>
        <div class="module notice-details-content">
            <div class="notice-details-header">
                 <h3 class="details-title">关于发布360手机安全漏洞奖励计划说明 </h3>
                <p class="time">发布日期：<span>2019-04-15 </span></p>
            </div>
           
            <div class="notice-details-container">
                       为了保障360手机OS开发安全，360安全团队协助在360手机操作系统及应用开发上提供必要的安全性防范措施，全面       为了保障360手机OS开发安全，360安全团队协助在360手机操作系统及应用开发上提供必要的安全性防范措施，全面       为了保障360手机OS开发安全，360安全团队协助在360手机操作系统及应用开发上提供必要的安全性防范措施，全面
            </div>
            <div class="notice-details-affix">
                <div>附件：</div>
                <ul>
                    <li><a href="javascript:void(0);">下载360手机安全漏洞响应流程.pdf<i class="icon iconfont icondingwei"></i></a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Crumbs from '../../components/crumbs/Crumbs'

export default {
    data(){
        return {
            navActive:4,
            crumbsList:['活动管理','活动列表','活动详情']
        }
    },
    components:{
       'v-crumbs':Crumbs
    },
}
</script>

<style <style lang="scss">
    @import '../../assets/sass/common.scss';
    
    .notice-details-content{
        min-height:617px;
        padding:60px 45px 30px; 
        background:#fff;
        margin-bottom:90px;
    }
    .details-title{
        font-size: 40px;
        color:#666;
        text-align: center;
    }
    .notice-details-header{
        padding-bottom:20px;
        border-bottom:1px solid #ededed;
    }
    .notice-details-content .time{
        text-align: center;
        color:#838383;
        font-size: 14px;
        line-height: 35px;
    }
    .notice-details-container{
        color:#333;
        line-height: 35px;
        margin-top:30px;
        padding-bottom:30px;
    }
    .notice-details-affix{
        display:flex;
        padding-top:30px;
        border-top:1px dashed #ccc;
    }
    .notice-details-affix>div{
        width:55px;
    }
    .notice-details-affix>ul{
        flex: 1;
    }
    .notice-details-affix>ul a{
        color:$global-a-color;
    }
</style>

