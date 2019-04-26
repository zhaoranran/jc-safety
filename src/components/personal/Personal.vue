<template>
    <div class="personal m-t-90 module">
        <div class="person-left">
            <ul>
                <li v-for="(item,index) in personLeftList" :key="index">
                    <a href="javascript:void(0);" :class="{ active:index==personActive}" @click="personTabs(index,item,$event)">{{item}}</a>
                </li>
            </ul>
        </div>
        <div class="person-right">
            <!-- 个人中心 -->
            <div v-show="personActive == 0" class="peson-essay" >
                <v-center :personActive="personActive"></v-center>
            </div>
            <!-- 我的任务 -->
            <div v-show="personActive == 1" class="peson-essay" >
                <v-task :personActive="personActive"></v-task>
            </div>
            <!-- 我的文章 -->
            <div v-show="personActive == 2" class="peson-essay">
                <v-article :personActive="personActive"></v-article>
                
            </div>
            
        </div>
    </div>
</template>

<script>

import PersonCenter from './PersonCenter'
import PersonArticle from './PersonArticle'
import PersonTask from './PersonTask'

export default {
    data(){
        return {
            personActive:0,
            personLeftList:['个人信息','我的任务','我的文章'],
            
            
        }
    },
    components:{
       'v-task':PersonTask,
       'v-article':PersonArticle,
       'v-center':PersonCenter
    },
    methods:{
        personTabs(index,item,$event){
            let token = window.sessionStorage.getItem("token");
            if(token != null){
                this.personActive = index;
            }else{
                this.$confirm('当前用户处于未登录状态', '去登录', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$router.push({
                            path: `login`,
                        }) 
                    }).catch(() => {   
                        return false;     
                });
            }   
            
        },
    },
    watch:{

    }
}
</script>

<style>
.personal{
    position: relative;
}
.personal .person-left{
    position: fixed;
    top:115px;
    width: 200px;
    background-color: #3d3f41;
    font-size: 16px;
    color: #fff;
    overflow-y: auto;
    min-height: 626px;
    background:#eeeeee;
    background-size: 100% 100%;
    border-radius: 4px;
    border:1px solid #ddd;
}
.personal .person-left a{
    display: block;
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    padding-left: 35px;
    border-right: 5px solid transparent;
    border-bottom: 2px solid #dddddd;
    box-sizing: border-box;
    overflow: hidden;
    color: #666666;
}
.personal .person-left a::before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    width: 28px;
    height: 28px;
    margin-right: 10px;
    background-repeat: no-repeat;
}
.personal .person-left li:nth-child(2) a::before {
    background-position: 0 -35px;
}
.personal .person-left li:nth-child(3) a::before {
    background-position: 0 -350px;
}
.personal .person-left a:hover,.personal .person-left a.active{
    background:#fff;
    color:#333;
    border-right: 5px solid #679edf;
    border-image: -webkit-linear-gradient(#2ecd71, #349ada) 20 20;

    border-image: -moz-linear-gradient(#2ecd71, #349ada) 20 20;

    border-image: -o-linear-gradient(#2ecd71, #349ada) 20 20;

    border-image: linear-gradient(#2ecd71, #349ada) 20 20;
}
.personal .person-right{
    margin-left: 220px;
    min-height: 787px;
    padding: 27px 20px;
    background:#fff;
}

.person-right .el-table td, .person-right .el-table th.is-leaf{
    border-left: none;
    border-bottom: none;
    border-top: none;
    border-bottom: 1px solid #e7eaec;
    color:#676a6c;
    
}
.person-right .el-table th.is-leaf{
    color: #0C9CEE;
    font-weight: 700;
    border-bottom: none;
}
.person-right .el-table td, .el-table th{
    text-align: center;
}
.el-table--fit{
    padding: 15px 20px 20px 20px;
    margin-bottom:20px;
    border: 1px solid #e7eaec;
}
.el-table__body, .el-table__footer, .el-table__header{
    border-left:none;
}
</style>

