<template>
    <div class="heroes  m-t-90">
        <div class="common-header">
            <div class="module">
                <h3>
                    <i class="icon iconfont iconlipin"></i>
                    <span>英雄榜</span>
                    <img src="../../assets/images/heroes-header.png" alt="">
                </h3>
            </div>
        </div>
        <div class="heroes-list module">
            <div class="module-rank">
                <ul>
                    <li v-for="(item,index) in rankList" :key="index">
                        <a href="javascript:void(0);" :class="{ active:index==rankActive}" @click="getHeroesList(index,item,$event)">{{item.name}}</a>
                    </li>
                </ul>
                <div class="heroes-time">
                    <div class="block" v-if="timeType == 'month'">
                        <span class="demonstration">时间：</span>
                        <el-date-picker
                            v-model="timeVal"
                            type="month"
                            :editable="false"
                            default-value="2019-10"
                            :picker-options="pickerOptions0"
                            placeholder="选择月">
                        </el-date-picker>
                    </div>
                    <div class="block" v-if="timeType == 'year'" >
                        <span class="demonstration">时间：</span>
                        <el-date-picker
                            v-model="timeVal"
                            align="right"
                            type="year"
                            :editable="false"
                            :picker-options="pickerOptions0"
                            placeholder="选择年">
                        </el-date-picker>
                    </div>
                </div>
                

            </div>
            <div class="heroes-list-table">
                <table>
                    <thead>
                        <tr>
                            <th>排行榜</th>
                            <th>姓名</th>
                            <th>等级</th>
                            <th>积分</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in heroesList" :key="index">
                            <td>{{index+1}}</td>
                            <td><img :src="item.userPic" alt="">{{item.userName}}</td>
                            <td>{{item.grade}}</td>
                            <td>{{item.total}}</td>
                        </tr>
                    </tbody>
                </table>
                <v-pager></v-pager>
            </div>
            
        </div>
    </div>
</template>

<script>
import Pager from '../../components/pager/Pager'
export default {
    data(){
        return {
            timeVal:new Date(),
            rankActive:0,
            timeType:'month',
            pickerOptions0: { 
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的 
                }
            },
            rankList:[
                {
                    id:0,
                    name:'月排行榜',
                    type:'month'
                },
                {
                    id:0,
                    name:'年排行榜',
                    type:'year'
                },
                {
                    id:0,
                    name:'总排行榜',
                    type:''
                }
            ],
            heroesList:[
                {
                    rank:1,
                    userName:'张三',
                    grade:'资深安全检查员',
                    total:60,
                    userPic:require('../../assets/images/user-pic.png'),
                },
                {
                    rank:2,
                    userName:'李四',
                    grade:'资深安全检查员',
                    total:60,
                    userPic:require('../../assets/images/user-pic.png'),
                },{
                    rank:3,
                    userName:'adf',
                    grade:'资深安全检查员',
                    total:60,
                    userPic:require('../../assets/images/user-pic.png'),
                },
                {
                    rank:4,
                    userName:'阿斯顿发',
                    grade:'资深安全检查员',
                    total:60,
                    userPic:require('../../assets/images/user-pic.png'),
                },
                {
                    rank:4,
                    userName:'阿斯顿发',
                    grade:'资深安全检查员',
                    total:60,
                    userPic:require('../../assets/images/user-pic.png'),
                },
                {
                    rank:4,
                    userName:'阿斯顿发',
                    grade:'资深安全检查员',
                    total:60,
                    userPic:require('../../assets/images/user-pic.png'),
                }
            ]
        }
    },
    components:{
        'v-pager':Pager
    },
    methods:{
        getHeroesList(index,item,$event) {
        this.rankActive=index;
　　　　  //获取点击对象     
        var el = event.currentTarget;
        this.timeType = item.type;

      },
    }
}
</script>

<style>
.heroes-list {
    margin-bottom:90px;
}

.heroes-list-table{
    min-height: 535px;
    padding:20px 25px 40px;
    background:#fff;
}
.heroes-list-table table{
    
    width:100%;
    border:1px solid #ededed;
    text-align: left;
    margin-bottom:40px;
}
.heroes-list-table table th,.heroes-list-table table td{
    padding-left: 35px;
    color:#000;
    font-size: 14px;
    border-left: 1px solid #ededed;
}
.heroes-list-table table th{
    line-height: 45px;
    
    font-weight: 800;
    
    border-bottom:2px solid #4464c3;
    
}
.heroes-list-table table td{
    border:1px solid #ededed;   
    line-height: 55px;
    color:#333;
}
.heroes-list-table table td img{
    width: 36px;
    height: 36px;
    vertical-align: middle;
    margin-right: 10px;
}
.heroes-list-table table tr:nth-child(1) td:first-child,
.heroes-list-table table tr:nth-child(2) td:first-child,
.heroes-list-table table tr:nth-child(3) td:first-child{
    color:#fff;
}
.heroes-list-table table tr:nth-child(1) td:first-child{
    background: url(../../assets/images/rank-01.png) no-repeat 14% 70%;
}
.heroes-list-table table tr:nth-child(2) td:first-child{
    background: url(../../assets/images/rank-02.png) no-repeat 13% 70%;
}
.heroes-list-table table tr:nth-child(3) td:first-child{
    background: url(../../assets/images/rank-03.png) no-repeat 13% 70%;
}
.heroes-list-table table tr:nth-child(1) td:last-child{
    color:#f0b52d;
    font-weight: 700;
}
.heroes-list-table table tr:nth-child(2) td:last-child{
     color:#b7b7b7;
     font-weight: 700;
}
.heroes-list-table table tr:nth-child(3) td:last-child{
     color:#eb8726;
     font-weight: 700;
}
.heroes .my-page{
    margin-bottom:0;
}
</style>
