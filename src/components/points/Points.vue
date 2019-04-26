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
                                    <a href="javascript:void(0);" :class="{ active:index == pointsActive}" @click="addClassPoints(index,item,$event)">{{item.value}}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class='goods-bottom'>
                        <span>积分：</span>
                        <div class="goods-total">
                            <ul>
                                <li v-for="(item,index) in totalList" :key="index" >
                                    <a href="javascript:void(0);" :class="{ active:index == totalActive}" @click="addClassTotal(index,item,$event)">{{item.name}}</a>
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
                            <a href="javascript:void(0);" :class="{ active:index==rankActive}" @click="setPointsList(index,item,$event)">
                                {{item.name}}
                                <i v-if="index == 1" class="icon iconfont " :class="upDown?'iconshengjiangxu_jiangxu-moren':'iconshengjiangxu_shengxu-moren'"></i>
                                </a>
                        </li>
                    </ul>
                </div>
                <div class="points-ls">
                    <ul v-if="pointsList.length>0">
                        <li v-for="(item,index) in pointsList" :key="index">
                            <a href="javascript:void(0);" @click="getDescribe(item.id)">
                                <img :src="item.resourceName != null?item.resourceName:require('../../assets/images/points-nodata.jpg')" alt="">
                                <p class="points-money over-hide" :title="item.goodsName">{{item.goodsName}}</p>
                                <p>
                                    <span class="points-total">
                                        <i class="icon iconfont iconintegral"></i>
                                        {{item.goodsPrice}}积分
                                    </span>
                                    <span>
                                        <i class="icon iconfont iconjiangpin01"></i>
                                        {{item.goodsNum}}个
                                    </span>
                                </p>
                            </a>
                        </li>
                    </ul>
                    <div v-else class="no-data">暂无数据</div>
                </div>
                <v-pager v-show="totalPages>1" @currentPager="currentPager" :totalPages="totalPages" :pageRows="pageRows" ></v-pager>
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
             totalPages:0,//共多少页
             pageRows:10,//每页显示的条数
             page:0,
             goodsPriceBegin:'',//积分开始
             goodsPriceEnd:'',//积分结束
             goodsType:'',//商品分类
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
                    value:'全部',
                    code:''
                }
            ],
            //积分列表
            totalList:[
                {
                    name:'全部',
                    goodsPriceBegin:'',
                    goodsPriceEnd:'',
                },
                {
                    name:'0-100',
                    goodsPriceBegin:0,
                    goodsPriceEnd:100,
                },
                {
                    name:'100-300',
                    goodsPriceBegin:100,
                    goodsPriceEnd:300,
                },
                {
                    name:'300-800',
                    goodsPriceBegin:300,
                    goodsPriceEnd:800,
                },
                {
                    name:'800-1600',
                    goodsPriceBegin:800,
                    goodsPriceEnd:1600,
                },
                {
                    name:'1600以上',
                    goodsPriceBegin:1600,
                    goodsPriceEnd:'',
                }
            ],

            pointsList:[]
        }
    },
    components:{
       'v-pager':Pager
    },
    mounted(){
        this.getclassifyList();
        this.getPointsList();
    },
    methods: {
      addClassPoints(index,item,$event) {
        this.pointsActive=index;
        this.goodsType = item.code;
        this.getPointsList();
      },
      addClassTotal(index,item,$event){
        this.totalActive=index;
        this.goodsPriceBegin = item.goodsPriceBegin;
        this.goodsPriceEnd = item.goodsPriceEnd;
        this.getPointsList();
      },
      getDescribe(id) {
        this.$router.push({
          path: `/points-details/${id}`,
        })
      },
      getPointsList(){
          let orderBy = this.upDown?'createDate desc':'createDate asc'
          this.$axios.post('/goods/goodsInfoApi/manageList.action',{
            page:this.page,
            pageRows:12,
            orderBy:orderBy,
            goodsPriceBegin:this.goodsPriceBegin,
            goodsPriceEnd:this.goodsPriceEnd,
            goodsType:this.goodsType
        })
        .then(res => {
            if(res.data){
                res = res.data;
                this.pointsList = res.data;
                this.pageRows = res.pageRows;
                this.totalPages = res.totalPages;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
      },
      getclassifyList(){
        this.$axios.post('/goods/goodsInfoApi/getGoodsDicList.action')
        .then(res => {
            if(res.data){
                for(var i=0;i<res.data.length;i++){
                    this.classifyList.push(res.data[i]);
                }
               
            }
        })
        .catch(function (error) {
            console.log(error);
        });
      },
      setPointsList(index,item,$event){
        this.rankActive=index;
        if(item.type == 'money'){
            this.upDown = !this.upDown;
        }
　　　　  //获取点击对象     
        var el = event.currentTarget;
        if(item){

        }
        this.getPointsList();
      },
      currentPager(page){
        this.page = page-1;
        this.getPointsList();
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
.points-ls{
    min-height: 433px;
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
.points-ls ul li:nth-child(4n+1){
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
    display: block;
    width:270px;
    height: 270px;
    border-radius: 4px;
}
.points-ls li a p{
    padding:0 15px;
    color:#999;
    line-height: 40px;
}
.points-ls li  .points-money{
    max-height: 270px;
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
.points .no-data{
    height: 493px;
}
</style>