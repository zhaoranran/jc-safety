<template>
    <div class="notice">
        <div class="module m-t-90">
            <div class="notice-conter">
                <div class="notice-left">
                    <h3>
                        <i class="icon iconfont iconwangzhan"></i>
                        <span>公告中心</span>
                    </h3>
                    <div class="column">
                        <ul>
                            <li v-for="(item,index) in columnList" :key="index">
                                <a href="javascript:void(0);" :class="{ active:index==current}" @click="addClass(index,item,$event)"><span class="over-hide" :title="item.title">{{item.title}}</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="notice-right">
                    <h2 class="commont-title"><span>新闻公告</span></h2>
                    <a v-for="(item,index) in noticeList" :key="index" class="notice-list" @click="getDescribe(item.id)" >
                        <div class="list-left">
                            <img :src="item.pic" alt="">
                        </div>
                        <div class="list-right">
                            <h3><span v-show="item.isStick">[置顶]</span><b  class="over-hide" :title="item.title">{{item.title}}</b></h3>
                            <p>{{subStr(item.content)}}<a href="javascript:void(0);" >[详情]</a><span class="time">2019-04-15</span></p>
                        </div>
                    </a>
                    <v-pager></v-pager>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Pager from '../../components/pager/Pager'
export default {
    data(){
        return {
            current: 0,
            navActive:4,
            columnList:[
                {
                    name:'all',
                    title:'全部',
                    id:111
                },
                {
                    name:'new',
                    title:'新闻公告新闻公告新闻公告新闻公告',
                    id:222
                },
                {
                    name:'notice',
                    title:'公告详情',
                    id:333
                }
            ],
            noticeList:[],
            noticeList0:[
                
                {   title:'美国政府警告，朝鲜的HOPLIGHT恶意软件很强大！',
                    isStick:true,
                    pic:require('../../assets/images/notice.png'),
                    content:'HOPLIGHT可以读取、写入和移动文件；列举系统驱动；创建和终止流程；将代码注入正在运行的进程；创建启动和停止服务；修改注册',
                    type:'news',
                    columnName:'新闻公告',
                    time:'2019-04-15',
                    id:1
                },
                {
                    title:'美国政府警告，朝鲜的HOPLIGHT恶意软件很强大！',
                    isStick:false,
                    pic:require('../../assets/images/notice.png'),
                    content:'HOPLIGHT可以读取、写入和移动文件；列举系统驱动；创建和终止流程；将代码注入正在运行的进程；创建启动和停止服务；修改注册',
                    type:'news',
                    columnName:'新闻公告',
                     time:'2019-04-15',
                     id:2

                },
                {
                    title:'美国政府警告，朝鲜的HOPLIGHT恶意软件很强大！',
                    isStick:true,
                    pic:require('../../assets/images/notice.png'),
                    content:'HOPLIGHT可以读取、写入和移动文件；列举系统驱动；创建和终止流程；将代码注入正在运行的进程；创建启动和停止服务；修改注册',
                    type:'notice',
                    columnName:'公告详情',
                     time:'2019-04-15',
                     id:3
                },
                {
                    title:'美国政府警告，朝鲜的HOPLIGHT恶意软件很强大！',
                    isStick:false,
                    pic:require('../../assets/images/notice.png'),
                    content:'HOPLIGHT可以读取、写入和移动文件；列举系统驱动；创建和终止流程；将代码注入正在运行的进程；创建启动和停止服务；修改注册',
                    type:'news',
                    columnName:'新闻公告',
                     time:'2019-04-15',
                     id:2

                },
                {
                    title:'美国政府警告，朝鲜的HOPLIGHT恶意软件很强大！',
                    isStick:true,
                    pic:require('../../assets/images/notice.png'),
                    content:'HOPLIGHT可以读取、写入和移动文件；列举系统驱动；创建和终止流程；将代码注入正在运行的进程；创建启动和停止服务；修改注册',
                    type:'notice',
                    columnName:'公告详情',
                     time:'2019-04-15',
                     id:3
                }
            ],
            noticeList1:[
                
                {   title:'美国政府警告，朝鲜的HOPLIGHT恶意软件很强大！',
                    isStick:true,
                    pic:require('../../assets/images/notice.png'),
                    content:'HOPLIGHT可以读取、写入和移动文件；列举系统驱动；创建和终止流程；将代码注入正在运行的进程；创建启动和停止服务；修改注册',
                    type:'news',
                    columnName:'新闻公告',
                    time:'2019-04-15',
                    id:1
                },
                {
                    title:'美国政府警告，朝鲜的HOPLIGHT恶意软件很强大！',
                    isStick:false,
                    pic:require('../../assets/images/notice.png'),
                    content:'HOPLIGHT可以读取、写入和移动文件；列举系统驱动；创建和终止流程；将代码注入正在运行的进程；创建启动和停止服务；修改注册',
                    type:'news',
                    columnName:'新闻公告',
                     time:'2019-04-15',
                     id:2

                },
                
            ],
        }
    },
    components:{
       'v-pager':Pager
    },
    mounted(){
        this.noticeList = this.noticeList0;
    },
    methods: {
      addClass(index,item,$event) {
        this.current=index;
　　　　  //获取点击对象     
        var el = event.currentTarget;
        this.getNoticeList(item.name)
      },
      getDescribe(id) {
        this.$router.push({
          path: `/notice-details/${id}`,
        })
      },
      getNoticeList(type){
        if(type == 'all'){
            this.noticeList = this.noticeList0;
        }else{
            this.noticeList = this.noticeList1;
        }
      },
      subStr(str){
          return str.substr(0,60) + '...';
      }
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/common.scss';

.notice{
    background:#f7f8fa;
}
.notice-conter{
    display: flex;
    padding-top:20px;
    margin-bottom:90px;
}
.notice-left{
    width: 200px;
}
.notice-left h3{
    width:100%;
    text-align: center;
    color:#fff;
    height: 50px;
    line-height: 50px;
    margin-bottom:1px;
    background-image: linear-gradient(to top, #134199,#4bbdef);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    font-size: 18px;
}
.notice-left h3 i{
    font-size: 20px;
}
.notice-left h3 span{
    font-weight: bold;
}
.notice-left .column{
    min-height: 726px;
    background:url(../../assets/images/notice-left-bg.png) no-repeat 0 0;
    background-size: 100% 100%;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
}
.notice-left .column li{
    border-bottom:1px solid #4982c7;
}
.notice-left .column a{
    display: block;
    /* width: 150px; */
    height: 48px;
    line-height: 48px;
    padding-left: 30px;
    font-size: 14px;
    color:#fff;
    border-left: 5px solid transparent;
} 
.notice-left .column a span{
    display: block;
    max-width: 150px;
}
.notice-left .column a.active{
    background:#fff;
    color:#333;
    border-left: 5px solid #679edf;
    border-image: -webkit-linear-gradient(#2ecd71, #349ada) 20 20;

    border-image: -moz-linear-gradient(#2ecd71, #349ada) 20 20;

    border-image: -o-linear-gradient(#2ecd71, #349ada) 20 20;

    border-image: linear-gradient(#2ecd71, #349ada) 20 20;

}
.notice-right{
    flex:1;
    margin-left: 40px;
    margin-top:15px;
    padding-right: 20px;
    padding-bottom:40px;
    background:#fff;
}
.notice-list{
    display: block;
    margin-top:25px;
    display: flex;
    border-bottom:1px dashed #ccc;
    cursor: pointer;
}
.notice-list .list-left{
    width: 130px;
    height: 75px;
}
.notice-list .list-right{
    flex:1;
    margin-left:23px;
}
.notice-list .list-right h3{
    color:#000;
    font-size: 18px;
    font-weight: 800;
    line-height: 25px;
}
.notice-list .list-right h3 span{
    color:#44c3b3;
    display: inline-block;
    vertical-align: top;
}
.notice-list .list-right h3 b{
    display: inline-block;
    max-width: 700px;
}
.notice-list .list-right p{
    color:#666;
    margin-top:15px;
    padding-bottom:25px;
    position: relative;
}
.notice-list .list-right p a  {
    color:$global-a-color;
}
.notice-list .list-right p .time{
    position: absolute;
    right: 0;
    top:25px;
}
</style>
