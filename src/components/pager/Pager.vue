<template>
    <div class="pager">
        <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageRows"
        @current-change="handleCurrentChange"
        :page-count="totalPages" class="my-page">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    props:[
        'totalPages',
        'pageRows'
    ],
    methods:{
        handleCurrentChange(pager){
           this.$emit('currentPager',pager);
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/common.scss';
.my-page{
    margin-top:30px;
    text-align: center;
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color:$global-a-color;
}
.el-pagination.is-background .el-pager li{
    color:$global-a-color;
    font-weight: normal;
    border:1px solid #ddd;
}
</style>

