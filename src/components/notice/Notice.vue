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
                                <a href="javascript:void(0);" :class="{ active:index==current}" @click="addClass(index,item,$event)"><span class="over-hide" :title="item.value">{{item.value}}</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="notice-right">
                    <div v-if="noticeList.length>0">
                        <h2 class="commont-title"><span>{{titleVale}}</span></h2>
                        <a v-for="(item,index) in noticeList" :key="index" class="notice-list" @click="getDescribe(item.id)" >
                            <div class="list-left">
                                <img :src="item.resourceName != null?item.resourceName:require('../../assets/images/news-nodata.jpg')" alt="">
                            </div>
                            <div class="list-right">
                                <h3><span v-show="item.topDate">[置顶]</span><b  class="over-hide" :title="item.title">{{item.newsTitle}}</b></h3>
                                <p>{{subStr(item.newsAbstract)}}<a href="javascript:void(0);" >[详情]</a><span class="time">{{item.releaseDate}}</span></p>
                            </div>
                        </a>
                        <v-pager v-show="totalPages>1" @currentPager="currentPager" :totalPages="totalPages" :pageRows="pageRows" ></v-pager>
                    </div>
                    <div v-else class="no-data">暂无数据</div>
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
            totalPages:0,//共多少页
            pageRows:10,//每页显示的条数
            titleVale:'全部',
            page:0,
            currentNewsType:'',
            columnList:[
                {
                    value:'全部',
                    code:''
                }
            ],
            noticeList:[],
        }
    },
    components:{
       'v-pager':Pager
    },
    mounted(){
        this.$nextTick(()=>{
            this.getNoticeTitleList();
            this.getNoticeList();
        })
    },
    methods: {
      addClass(index,item,$event) {
        this.current=index;
　　　　  //获取点击对象     
        var el = event.currentTarget;
        this.currentNewsType = item.code;
        this.titleVale = item.value;
        if(item.value == '全部'){
            this.page = 0;
        }
        this.getNoticeList();
      },
      getDescribe(id) {
        this.$router.push({
          path: `/notice-details/${id}`,
        })
      },
      /* 获取公告列表 */
      getNoticeList(){
        this.$axios.post('/news/newsInfoApi/manageList.action',{
           newsType:this.currentNewsType,
            page:this.page
        })
        .then(res => {
            if(res.data){
                res = res.data;
                this.noticeList = res.data;
                this.pageRows = res.pageRows;
                this.totalPages = res.totalPages;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
      },
      getNoticeTitleList(){
        this.$axios.get('/news/newsInfoApi/getNewsDicList.action')
            .then(res => {
                if(res.data){
                    let titleList = res.data;
                    for(var i=0;i<titleList.length;i++){
                        this.columnList.push(titleList[i]);
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
      },
      subStr(str){
          return str.substr(0,60) + '...';
      },
      currentPager(page){
        this.page = page-1;
        this.getNoticeList();
      }
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/common.scss';

.notice{
    min-height: 612px;
    background:#f7f8fa;
}
.notice-conter{
    display: flex;
    padding-top:20px;
    margin-bottom:90px;
    position: relative;
}
.notice-left{
    width: 200px;
    position: fixed;
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
    min-height: 626px;
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
    margin-left: 240px;
    margin-top:15px;
    padding-right: 20px;
    padding-bottom:40px;
    background:#fff;
}
.notice .no-data{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 534px;
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
.list-left img{
    width: 100%;
    height: 100%;
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
