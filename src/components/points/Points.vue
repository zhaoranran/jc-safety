<template>
    <div class="points">
        <div class="points-content m-t-90">
            <div class="common-header">
                <div class="module">
                    <h3>
                        <i class="icon iconfont iconlipin"></i>
                        <span>礼品兑换</span>
                        <img src="../../assets/images/point-header.png" alt="">
                    </h3>
                </div>
            </div>
            <div class="points-goods module">
                <div class="goods-list">
                    <div class='goods-top'>
                        <span>分类：</span>
                        <div class="goods-classify">
                            <ul>
                                <li v-for="(item,index) in classifyList" :key="index">
                                    <a href="javascript:void(0);" :class="{ active:index == pointsActive}" @click="addClassPoints(index,item,$event)">{{item.name}}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class='goods-bottom'>
                        <span>积分：</span>
                        <div class="goods-total">
                            <ul>
                                <li v-for="(item,index) in totalList" :key="index" >
                                    <a href="javascript:void(0);" :class="{ active:index == totalActive}" @click="addClassTotal(index,item,$event)">{{item}}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="points-item module">
                <div class="module-rank">
                    <ul>
                        <li v-for="(item,index) in rankList" :key="index">
                            <a href="javascript:void(0);" :class="{ active:index==rankActive}" @click="getHeroesList(index,item,$event)"  @click.stop="rankUp">
                                {{item.name}}
                                <i v-if="index == 1" class="icon iconfont " :class="upDown?'iconshengjiangxu_jiangxu-moren':'iconshengjiangxu_shengxu-moren'"></i>
                                </a>
                        </li>
                    </ul>
                </div>
                <div class="points-ls">
                    <ul>
                        <li v-for="(item,index) in pointsList" :key="index">
                            <a href="javascript:void(0);" @click="getDescribe(item.id)">
                                <img :src="item.pic" alt="">
                                <p class="points-money">
                                    现金：
                                    <span>{{item.money}}</span>
                                    元
                                </p>
                                <p>
                                    <span class="points-total">
                                        <i class="icon iconfont iconintegral"></i>
                                        {{item.total}}积分
                                    </span>
                                    <span>
                                        <i class="icon iconfont iconjiangpin01"></i>
                                        {{item.num}}个
                                    </span>
                                </p>
                            </a>
                        </li>
                    </ul>
                </div>
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
             navActive:3,
             pointsActive:0,
             totalActive:0,
             rankActive:0,
             upDown:true,
              activeName: 'first',
              rankList:[
                  {
                    id:0,
                    name:'新品',
                    type:'new'
                },
                {
                    id:0,
                    name:'价格',
                    type:'money'
                },
                {
                    id:0,
                    name:'兑换最多',
                    type:'convertMore'
                }
              ],
            //分类列表
            classifyList:[
                {
                    name:'全部',
                    id:0
                },
                {
                    name:'奖金奖励',
                    id:1
                },
                {
                    name:'数码产品',
                    id:2
                },
                {
                    name:'生活周边',
                    id:3
                },
                {
                    name:'专业书籍',
                    id:4
                },
                {
                    name:'腾讯周边',
                    id:5
                }
            ],
            //积分列表
            totalList:[
                '全部','0-100','100-300','300-800','800-1600','1600以上'

            ],

            pointsList:[
                {
                    pic:require("../../assets/images/point.png"),
                    money:'5000',
                    total:1000,
                    num:216,
                    id:1
                },
                {
                    pic:require("../../assets/images/point.png"),
                    money:'5000',
                    total:1000,
                    num:216,
                    id:2
                },
                
                {
                    pic:require("../../assets/images/point.png"),
                    money:'5000',
                    total:1000,
                    num:216,
                    id:3
                },
                
                {
                    pic:require("../../assets/images/point.png"),
                    money:'5000',
                    total:1000,
                    num:216,
                    id:4
                },
                
                {
                    pic:require("../../assets/images/point.png"),
                    money:'5000',
                    total:1000,
                    num:216,
                    id:5
                },
                
                {
                    pic:require("../../assets/images/point.png"),
                    money:'5000',
                    total:1000,
                    num:216,
                    id:6
                },
                {
                    pic:require("../../assets/images/point.png"),
                    money:'5000',
                    total:1000,
                    num:216,
                    id:7
                },
                
            ]
        }
    },
    components:{
       'v-pager':Pager
    },
    methods: {
      addClassPoints(index,item,$event) {
        this.pointsActive=index;
      },
      addClassTotal(index,item,$event){
          this.totalActive=index;
      },
      getDescribe(id) {
        this.$router.push({
          path: `/points-details/${id}`,
        })
      },
      getHeroesList(index,item,$event){
        this.rankActive=index;
　　　　  //获取点击对象     
        var el = event.currentTarget;
      },
      rankUp(){
          this.upDown = !this.upDown;
      }
    }
}
</script>
<style scope>

.points-goods{
    background: #fff;
    margin-top:15px;
}
.goods-bottom{
    border-top:1px solid #ededed;
}
.goods-list span{
    padding-left:20px;
    color:#444444;
}
.goods-list{
    margin-bottom:25px;
}
.goods-list ul{
    display:flex;
    justify-content: flex-start;
    height: 53px;
    
}
.goods-list ul li a{
    display: block;
    margin-top:10px;
    padding:12px 10px;
    font-size: 14px;
    border-radius: 4px;
    text-align: center;
    color:#444444;
}
.goods-list ul li a.active,.goods-list ul li a:hover{
    background-image: linear-gradient(to top, #fc943c,#ffeb32);
    color:#fff;
}
.goods-list ul li + li{
    margin-left: 35px;
}
.goods-total,.goods-classify{
    display: inline-block;
}
.el-tabs__header{
    height: 75px;
    background: #fff;
    padding-left:20px;
}
.el-tabs__nav-wrap::after{
    z-index: -1;
}
.el-tabs__item{
    width:120px;
    height: 40px;
    border-top:1px solid #ededed;
    border-bottom:1px solid #ededed;
    color:#777;
    background:#fafafa;
    text-align: center;
}
.el-tabs__item + .el-tabs__item{
    border-left: 1px solid #ededed;
}
.el-tabs__item:last-child{
    border-right: 1px solid #ededed;
}
.el-tabs__item.is-active{
    color:#444;
    font-weight: 800;
    background:#fff;
}
.el-tabs__active-bar{
    display: none;
}
.points-ls ul{
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom:60px;
}
.points-ls ul li + li{
    margin-left: 40px;
}
.points-ls ul li:nth-child(5n){
    margin-left: 0px;
}
.points-ls li a{
    display: block;
    width:270px;
    height: auto;
    padding-bottom:15px;
    background: #fff;
    margin-top:40px;
    border-radius: 4px;
}
.points-ls li a:hover{
    box-shadow:1px 1px 3px 2px #ccc ;
}
.points-ls li a img{
    width:270px;
    height: 270px;
}
.points-ls li a p{
    padding:0 15px;
    color:#999;
    line-height: 40px;
}
.points-ls li  .points-money{
    color:#000;

}
.points-ls li  .points-money span{
    color:#999;
}
.points-total{
    color:#ff5000;
    margin-right: 15px;
}
.points .my-page{
    
    margin-bottom:90px;
}

</style>