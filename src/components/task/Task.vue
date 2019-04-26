<template>
    <div class="task m-t-90">
        <div class="common-header">
            <div class="module">
                <h3>
                    <i class="icon iconfont iconlipin"></i>
                    <span>厂商悬赏</span>
                    <img src="../../assets/images/task-header.png" alt="">
                </h3>
            </div>
        </div>
        <div class="task-list module">
            <ul v-if="taskList.length>0">
                <li v-for="(item,index) in taskList" :key="index">
                    <a href="javascript:void(0);" class="task-list-content" @click="getDescribe(item.id)">
                        <div class="task-img">
                            <img :src="item.resourceName != null?item.resourceName:require('../../assets/images/task-nodata.jpg')" alt="">
                        </div>
                        <div class="task-right" >
                            <h3 class="task-name over-hides" :title="item.taskName">{{item.taskName}}</h3>
                            <p>{{item.taskTypeValue}}</p>
                            <div class="task-look">
                                <a href="javascript:void(0);">查看</a>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
            <div v-else class="no-data">
                暂无数据
            </div>
        </div>
       <v-pager v-show="totalPages>1" @currentPager="currentPager" :totalPages="totalPages" :pageRows="pageRows" ></v-pager>
    </div>
</template>

<script>
import Pager from '../../components/pager/Pager'
export default {
    data(){
        return {
            totalPages:0,//共多少页
             pageRows:9,//每页显示的条数
             page:0,
            taskList:[]
        }
    },
    components:{
       'v-pager':Pager
    },
    mounted(){
        this.getTaskList();
    },
    methods:{
        getDescribe(id) {
            let token = window.sessionStorage.getItem("token");
            if(token == null){
                this.$confirm('去登陆', '确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$router.push({
                            path: `login`,
                        })
                    }).catch(() => {      
                       // this.$router.go(0);     
                });
            }else{
                this.$router.push({
                    path: `/task-details/${id}`,
                })
            }
        },
        getTaskList(){
            this.$axios.post('/task/taskInfoApi/manageList.action',{
                page:this.page,
                pageRows:9,
            })
            .then(res => {
                if(res.data){
                    this.taskList = res.data.data;
                    this.pageRows = res.data.pageRows;
                    this.totalPages = res.data.totalPages;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        currentPager(page){
            this.page = page-1;
            this.getTaskList();
        }
    },
    
}
</script>
<style lang="scss" >
@import '../../assets/sass/common.scss';
.task-list{
    min-height: 642px;
}
.task-list ul{
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top:20px;
}
.task-list li+li{
    margin-left: 20px;
}
.task-list li:nth-child(3n+1){
    margin-left: 0;
}
.task-list .task-list-content{
    display: block;
    padding:20px;
    width:365px;
    background:#fff;
    display: flex;
    margin-bottom:20px;
}
.task-list .task-list-content:hover{
    box-shadow:1px 1px 3px 2px #ccc ;
}
.task-list .task-img{
    width:150px;
    height: 150px;
}
.task-list .task-img img{
    width:100%;
    height: 100%;
}
.task-list .task-right{
    flex: 1;
    margin-left:20px;
    position: relative;
}
.task-list .task-right h3{
    max-width:180px;
    color:#333;
    font-weight: 800;
    line-height: 20px;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
}
.task-list .task-right p{
    color:#bbb;
    font-size: 14px;
    line-height: 35px;
}
.task-look a{
    position: absolute;
    left:0;
    bottom:0;
    
}
.task-look a{
    width:100px;
    height: 36px;
    line-height: 36px;
    background:#fff;
    border:1px solid #ddd;
    color:$global-a-color;
    text-align: center;
    border-radius: 4px;
}
.task-look a:hover{
    background:$global-a-hover-color;
    color:#fff;
}
.task .my-page{
    margin-bottom:90px;
}
.task .no-data{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 642px;
}
</style>

