<template>
    <div class="home">
        <v-banner></v-banner>
        <v-news></v-news>
        <v-prize></v-prize>
        <v-know></v-know>
    </div>
</template>

<script>
import Banner from '../../components/banner/Banner'
import News from '../../components/news/News'
import Prize from '../../components/prize/Prize'
import Know from '../../components/know/Know'
export default {
    data(){
        return {
            navActive:0
        }
    },
    components:{
       'v-banner':Banner,
       'v-news':News,
       'v-prize':Prize,
       'v-know':Know
    }
}
</script>

<style>
</style>

