<template>
    <div class="banner m-t-90">
        <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="(item,index) in bgList" :key="index">
                <img :src="item.name" alt="">
            </el-carousel-item>
        </el-carousel>
          <h3>
              
          </h3>
    </div>
</template>

<script>

export default {
    data(){
        return {
            bgList:[
                {
                    name:require('../../assets/images/banner01.png')
                },
                /* {
                    name:require('../../assets/images/banner02.png')
                },{
                    name:require('../../assets/images/banner03.png')
                } */
            ]
        }
    },
    mounted(){
        
    },
    methods:{
        showBg(bg){
            return "background-image:url("+bg+")"
        }
    }
}
</script>

<style>
    
    .banner{
        width:100%;
        height: 470px;
    }
    .banner img{
        width:100%;
        height: 470px;
    }
    .el-carousel__container{
        height: 470px;
    }
    .el-carousel__indicators li + li{
        margin-left:30px;
    }
    .el-carousel__arrow{
        display: none;
    }
    .el-carousel__button{
        width:16px;
        height: 16px;
        background: #525273;
        border-radius: 50%;
    }
    .el-carousel__indicator.is-active button{
        background:#fff;
    }
    .el-carousel__item div {
        height: 470px;
        width: 100%;
        background-size: 100% 64%;
    }
    
</style>

