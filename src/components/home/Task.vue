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
            <ul>
                <li v-for="(item,index) in taskList" :key="index">
                    <a href="javascript:void(0);" class="task-list-content">
                        <div class="task-img">
                            <img :src="item.pic" alt="">
                        </div>
                        <div class="task-right">
                            <h3 class="task-name over-hides" :title="item.name">{{item.name}}</h3>
                            <p>{{item.type}}</p>
                            <div class="task-look">
                                <a href="javascript:void(0);">查看</a>
                            </div>
                        </div>
                        
                    </a>
                </li>
            </ul>
            
        </div>
        <v-pager></v-pager>
    </div>
</template>

<script>
import Pager from '../../components/pager/Pager'
export default {
    data(){
        return {
            taskList:[
                {
                    id:1,
                    pic:require('../../assets/images/task.png'),
                    name:'Migerson 迈格森科技有 限公司Migerson 迈格森科技有 限公司Migerson 迈格森科技有 限公司Migerson 迈格森科技有 限公司',
                    type:'网络设备 | 合资企业'
                },
                {
                    id:2,
                    pic:require('../../assets/images/task.png'),
                    name:'Migerson 迈格森科技有 限公司',
                    type:'网络设备 | 合资企业'
                },{
                    id:3,
                    pic:require('../../assets/images/task.png'),
                    name:'Migerson 迈格森科技有 限公司',
                    type:'网络设备 | 合资企业'
                },{
                    id:4,
                    pic:require('../../assets/images/task.png'),
                    name:'Migerson 迈格森科技有 限公司',
                    type:'网络设备 | 合资企业'
                },{
                    id:5,
                    pic:require('../../assets/images/task.png'),
                    name:'Migerson 迈格森科技有 限公司',
                    type:'网络设备 | 合资企业'
                },{
                    id:6,
                    pic:require('../../assets/images/task.png'),
                    name:'Migerson 迈格森科技有 限公司',
                    type:'网络设备 | 合资企业'
                },{
                    id:7,
                    pic:require('../../assets/images/task.png'),
                    name:'Migerson 迈格森科技有 限公司',
                    type:'网络设备 | 合资企业'
                },{
                    id:8,
                    pic:require('../../assets/images/task.png'),
                    name:'Migerson 迈格森科技有 限公司',
                    type:'网络设备 | 合资企业'
                }
            ]
        }
    },
    components:{
       'v-pager':Pager
    },
}
</script>
<style lang="scss" >
@import '../../assets/sass/common.scss';

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
.task-list li:nth-child(4n){
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
</style>

