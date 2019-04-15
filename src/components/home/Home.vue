<template>
    <div class="home">
        <v-header></v-header>
        <v-banner></v-banner>
        <v-news></v-news>
        <v-prize></v-prize>
        <v-know></v-know>
        <v-footer></v-footer>
    </div>
</template>

<script>
import Header from '../../components/header/Header'
import Banner from '../../components/banner/Banner'
import News from '../../components/news/News'
import Prize from '../../components/prize/Prize'
import Know from '../../components/know/Know'
import Footer from '../../components/footer/Footer'
export default {
    data(){
        return {

        }
    },
    components:{
       'v-header':Header,
       'v-banner':Banner,
       'v-news':News,
       'v-prize':Prize,
       'v-know':Know,
       'v-footer':Footer
    }
}
</script>

<style>
@import url(../../assets/css/common.css);
@import url(../../../static/fonts/iconfont.css);
 .home{
    height: 90px;
    line-height: 90px;
     background-color:#004499;
 }
</style>

