<template>
    <div >
        <v-header :navActive="navActive"></v-header>
        <router-view></router-view>
        <v-footer></v-footer>
    </div>
</template>
<script>
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
export default {
    
    data(){
        return {
 navActive:0
        }
    },
    components:{
       'v-header':Header,
       'v-footer':Footer
    },
    watch: {
      $route(n) {
        if(n.name === 'home') {
          this.navActive = 0
        }
        if(n.name === 'task') {
          this.navActive = 1
        }
        if(n.name === 'testcenter') {
          this.navActive = 2
        }
        if(n.name === 'points') {
          this.navActive = 3
        }
        if(n.name === 'notice') {
          this.navActive = 4
        }
        if(n.name === 'about') {
          this.navActive = 5
        }
        if(n.name === 'heroes') {
          this.navActive = 6
        }
      }
    },
    beforeRouteEnter(to,from,next) {
      next(vm=>{
        if(to.name === 'home') {
          vm.navActive = 0
        }
        if(to.name === 'task') {
          vm.navActive = 1
        }
        if(to.name === 'testcenter') {
          vm.navActive = 2
        }
        if(to.name === 'points' || to.name === 'points-details' ) {
          vm.navActive = 3
        }
        if(to.name === 'notice' || to.name === 'notice-details') {
          vm.navActive = 4
        }
        if(to.name === 'about') {
          vm.navActive = 5
        }
        if(n.name === 'heroes') {
          this.navActive = 6
        }
      })
    },
}
</script>
