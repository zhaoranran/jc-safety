<template>
    <div class="points-details">
        <div class="m-t-90">
            <v-crumbs :crumbsList="crumbsList"></v-crumbs>
            <div class="module">
                <div class="points-details-content ">
                    <div class="points-details-top">
                        <div class="points-details-img">
                            <img :src="details.pic" alt="">
                        </div>
                        <div class="points-details-right">
                            <h3 class="over-hides">{{details.title}}</h3>
                            <p class="convert-money">兑换价格<span>{{details.convert}}</span>积分</p>
                            <p class="convert-has">已兑换<span>{{details.hasConvert}}</span>件</p>
                            <div class="conver-num">
                                <span>兑换数量</span>
                                <div class="choose-amount">
                                    <a class="minus" @click="removeNum">-</a>
                                    <span>{{details.convertNum}}</span>
                                    <a class="add" @click="addNum">+</a>
                                </div>
                                <span class="residue">剩余{{details.residue}}件</span>
                            </div>
                            <div class="submit">
                                <a  v-if="isCLick" href="javascript:void(0);" >兑换</a>
                                <a v-else href="javascript:void(0);" class="noClass">暂不可兑换</a>
                            </div>
                        </div>
                    </div>
                    <div class="product-details">
                        <h3 class="commont-title"><span>产品详情</span></h3>
                        <p>{{details.productDetails}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Crumbs from '../../components/crumbs/Crumbs'
export default {
    data(){
        return {
            isCLick:true,//是否可以兑换
            navActive:3,
            details:{
                pic:require('../../assets/images/convert.png'),
                title:'航世（B.O.W）HW0981 巧克力静音无线键盘鼠标套装',
                convert:136,//兑换价格
                hasConvert:0,//已经兑换
                convertNum:1,//兑换数量
                residue:9,//剩余
                productDetails:'航世（B.O.W）HW098 巧克力静音无线键盘鼠标套装 超薄便携家用办公键鼠套装 白色 ',//产品详情
            },
            crumbsList:['积分商城','航世（B.O.W）HW098 巧克力静音无线键盘鼠标套装 超薄便携家用办公键鼠套装 白色']
        }
    },
    components:{
       'v-crumbs':Crumbs
    },
    methods:{
        removeNum(){
            if(this.details.convertNum>0){
                this.details.convertNum--
            }
        },
        addNum(){
            if(this.details.convertNum<this.details.residue){
                this.details.convertNum++;
            }
            
        }
    }
}
</script>
<style lang="scss">
@import '../../assets/sass/common.scss';

    .points-details-content {
        padding:30px 45px;
        background: #fff;
        border-radius: 4px;
        margin-bottom:120px;
        min-height: 502px;
    }
    .points-details-top{
        display: flex;
    }
    .points-details-img{
        width:430px;
        height: 290px;
        margin-right: 20px;
        border:1px solid #ddd;
    }
    .points-details-img img{
        width:100%;
        height: 100%;
    }
    .points-details-right{
        flex:1;
        position: relative;
    }
    .points-details-right h3{
        max-width: 655px;
        font-size: 22px;
        color:#666;
        font-weight: 900;
        line-height: 36px;
        padding-bottom:10px;
        margin-bottom:10px;
        margin-top:10px;
        border-bottom:1px solid #ededed;
    }
    .points-details-right p{
        line-height: 35px;
        color:#666;
    }
    .convert-money span{
        font-size: 22px;
        color:$global-a-color ;
    }
    .convert-has span,.convert-money span{
        padding:0 15px;
    }
    .conver-num{
        line-height: 35px;
        display: flex;
        justify-content: flex-start;
    }
    .conver-num .choose-amount{
        margin:0 15px;
        margin-top: 7px;
        border:1px solid #ddd;
        height: 23px;
        line-height: 23px;
        text-align: center;
    }
    .conver-num .choose-amount a{
        display: inline-block;
        width:15px;
        height: 100%;
        background: #f1f1f1;
        border-right: 1px solid #ddd;
        cursor: pointer;
    }
    .conver-num .choose-amount a.add{
        border-right: none;
        border-left: 1px solid #ddd;
    }
    .conver-num .choose-amount span{
        display: inline-block;
        width:42px;
        border: none;
        color:#000;
    }
    .submit{
        position: absolute;
        left: 0;
        bottom:0;
    }
    .submit a{
        display: block;
        width:142px;
        height: 46px;
        text-align: center;
        line-height: 46px;
        border-radius: 4px;
        background: $global-a-color ;
        color:#fff;
        font-weight: 700;
    }
    .submit a:hover{
        background:$global-a-hover-color ;
    }
    .product-details p{
        margin-top:30px;
        line-height: 35px;
    }
    .submit a.noClass{
        background:#dddddd;
        cursor: not-allowed;
    }
</style>

