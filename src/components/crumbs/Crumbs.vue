<template>
    <div class="crumbs m-t-90">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="module">
            <el-breadcrumb-item :to="{ path: '/home' }"><i class="icon iconfont icondingwei"></i>首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in crumbsList" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props:{
        crumbsList:{
            type: Array,
            default: []
        }
    }
}
</script>
<style>
.crumbs{
        height: 60px;
        margin-bottom:20px;
        line-height: 60px;
        background:#fff;
    }
    .el-breadcrumb{
        line-height: 60px;
    }
    .el-breadcrumb__inner.is-link{
        font-weight: normal;
        color:#666;
    }
    .el-breadcrumb__inner.is-link .icondingwei{
        background-image: -webkit-gradient(linear, left 0, right 0, from(#ce643e), to(#fabe1c));
        -webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
        -webkit-text-fill-color: transparent; /*text-fill-color会覆盖color所定义的字体颜色： */
    }
    .el-breadcrumb__inner{
        color:#666;
    }
</style>
