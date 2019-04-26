<template>
    <div class="notice-details">
        <v-crumbs :crumbsList="crumbsList"></v-crumbs>
        <div class="module notice-details-content">
            <div class="notice-details-header">
                 <h3 class="details-title">{{detailsData.newsTitle}}</h3>
                <p class="time">发布日期：<span>{{detailsData.releaseDate}}</span></p>
            </div>
           
            <div class="notice-details-container" v-html="detailsData.newsText"></div>
            <div class="notice-details-affix">
                <div>附件：</div>
                <ul>
                    <li v-for="(item,index) in attachNewsList" :key="index">
                        <a :href="item.fileNameUrl">{{item.fileName}}<i class="icon iconfont iconruku"></i></a>
                    </li>
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
            crumbsList:[
                {
                    name:'首页',
                    url:'/home'
                },
                {
                    name:'公告中心',
                    url:'/notice'
                },
                {
                    name:'公告详情',
                    url:''
                }
            ],
            detailsData:{},
            attachNewsList:[]
        }
    },
    components:{
       'v-crumbs':Crumbs
    },
    mounted(){
        let id = this.$route.params.id;
        this.getDetails(id);
    },
    methods:{
        getDetails(id){
            this.$axios.post('/news/newsInfoApi/get.action',{
                id:id
        })
        .then(res => {
            if(res.data){
                this.detailsData = res.data;
                this.attachNewsList = res.data.attachNewsList;
            }
        })
        }
    }
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
        word-wrap: break-word;
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
    .notice-details-affix>ul a i{
        margin-left:10px;
    }
</style>

