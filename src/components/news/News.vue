<template>
    <div class="news module">
        <div class="module-header">
            <h3>公告动态</h3>
            <p class="module-explain">多年的安全研究经验，最新的技术前沿报告，尽在TSRC博客频道</p>
            <div class="module-more">
                <a href="#/notice">更多公告</a>
            </div>
        </div>
        <div class="new-content">
            <ul>
                <li v-for="(item,index) in newsList" @click="getDescribe(item.id)">
                    <a href="javascript:void(0)">
                        <img :src="item.pic" alt="">
                        <div class="module-title new-title">
                            <h4 class="over-hide" :title="item.title">{{item.title}}</h4>
                            <p class="over-hides">{{item.content}}</p>
                        </div>
                        
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            newsList:[
                {
                    title:'以攻促防————企业蓝军建设思考',
                    content:'相信未来会用更好的企业建设网络啥撒旦法师打发阿斯顿发送到发的阿斯顿发达',
                    pic:require('../../assets/images/news.png'),
                    id:1
                },
                {
                    title:'以攻促防————企业蓝军建设思考',
                    content:'相信未来会用更好的企业建设网络啥撒旦法师打发阿斯顿发送到发的阿斯顿发达',
                    pic:require('../../assets/images/news.png'),
                    id:2
                },
                {
                    title:'以攻促防————企业蓝军建设思考',
                    content:'相信未来会用更好的企业建设网络啥撒旦法师打发阿斯顿发送到发的阿斯顿发达',
                    pic:require('../../assets/images/news.png'),
                    id:3
                }
            ]
        }
    },
    methods:{
        getDescribe(id) {
        this.$router.push({
          path: `/notice-details/${id}`,
        })
      },
    }
}
</script>

<style>
 .news{
     background:#fff;
     margin-bottom:60px;
 }
 .news-header{
     margin-top:70px;
     text-align: center;
 }
 .new-content ul{
     display: flex;
     justify-content: flex-start;
 }
 .new-content li + li{
     margin-left:10px;
 }
 .new-content li a{
     display: block;
     width:387px;
     height: auto;
     border:1px solid #ddd;
    padding-bottom:35px;
 }
 .new-content li a:hover{
     box-shadow:1px 1px 3px 2px #ccc ;
 }
 .new-content li img{
     display:block;
     width:387px;
     height: 382px;
 }
.new-content li .new-title{
    padding:0 25px 0 20px;
}
.new-content .new-title p{
    max-width:335px;
    font-size: 12px;
    line-height: 20px;
    color:#999;
}
</style>

