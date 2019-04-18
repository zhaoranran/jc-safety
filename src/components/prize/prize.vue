<template>
    <div class="prize">
        <div class="module">
            <div class="module-header prize-header">
                <h3>精美奖品</h3>
                <p class="module-explain">丰富的礼品，丰厚的奖励，任您选~</p>
                <div class="module-more">
                    <a href="#/points">更多奖品</a>
                </div>
            </div>
            <div class="prize-content">
                <ul>
                    <li v-for="(item,index) in prizeList" :key="index">
                        <a href="javascript:void(0)"  @click="getDescribe(item.id)">
                            <img :src="item.pic" alt="">
                            <div class="module-title prize-title">
                                <h4>{{item.title}}</h4>
                                <p>
                                    <span class="prize-total"><i class="icon iconfont iconintegral"></i>{{item.total}}</span>
                                    <span><i class="icon iconfont iconshuju"></i>{{item.num1}}</span>
                                    <span><i class="icon iconfont iconjiangpin01"></i>{{item.num1}}</span>
                                </p>
                            </div>
                            
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
           prizeList:[
               {
                   title:'黑客攻防工具实战',
                    total:'1000',
                    num1:'20',
                    num2:'20',
                    pic:require('../../assets/images/prize.png'),
                    id:1
               },
               {
                   title:'黑客攻防工具实战',
                    total:'1000',
                    num1:'20',
                    num2:'20',
                    pic:require('../../assets/images/prize.png'),
                    id:2
               },
               {
                   title:'黑客攻防工具实战',
                    total:'1000',
                    num1:'20',
                    num2:'20',
                    pic:require('../../assets/images/prize.png'),
                    id:3
               },
               {
                   title:'黑客攻防工具实战',
                    total:'1000',
                    num1:'20',
                    num2:'20',
                    pic:require('../../assets/images/prize.png'),
                    id:4
               },
               {
                   title:'黑客攻防工具实战',
                    total:'1000',
                    num1:'20',
                    num2:'20',
                    pic:require('../../assets/images/prize.png'),
                    id:5
               },
               {
                   title:'黑客攻防工具实战',
                    total:'1000',
                    num1:'20',
                    num2:'20',
                    pic:require('../../assets/images/prize.png'),
                    id:6
               },
               {
                   title:'黑客攻防工具实战',
                    total:'1000',
                    num1:'20',
                    num2:'20',
                    pic:require('../../assets/images/prize.png'),
                    id:7
               },
               
           ] 
        }
    },
    methods: {
        collect(){
            console.log(this);
        },
        getDescribe(id) {
        this.$router.push({
          path: `/points-details/${id}`,
        })
      },
    },
}
</script>

<style>
.prize{
    background:#f7f8fa;
    width: 100%;
}
.prize-header h3{
    margin-top:0;
    padding-top:60px;
}
.prize-content ul{
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
}
.prize-content li{
    margin-bottom:40px;
}
.prize-content li+li{
    margin-left:40px;
}
.prize-content li:nth-child(5n){
    margin-left: 0px;
}
.prize-content li a{
    position: relative;
    display: block;
    width:270px;
    height: auto;
    border-radius: 4px;
    padding-bottom:25px;
    background:#fff;
}
.prize-content li a:hover{
     box-shadow:1px 1px 3px 2px #ccc ;
}
.prize-content li a:hover .love{
    display: block;
}
.prize-content li img{
    display: block;
    width: 270px;
    height: 270px;
}
.prize-content .prize-title{
    padding:0 15px;
}
.prize-content .prize-title p{
    font-size: 12px;
    line-height: 20px;
    color:#999;

}
.prize-content .prize-title p span +span{
    display: inline-block;
    margin-left: 15px;
}
.prize-content .prize-title p i{
    margin-right: 5px;
}
.prize-content .prize-title .prize-total{
    color:#ff5000;
}

</style>

