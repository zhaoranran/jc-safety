<template>
    <div class="pager">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="1000" class="my-page">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data(){
        return {

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

