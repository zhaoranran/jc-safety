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
          navActive:0,
          token:''
        }
    },
    components:{
       'v-header':Header,
       'v-footer':Footer
    },
    mounted() {
      // console.log(window.sessionStorage.getItem("token"));
      
    },
    methods:{
      /* presentIndex(data){
        this.navActive = data.navActive;
      } */
     
    },
    watch: {
      $route(n) {
        let token = window.sessionStorage.getItem("token");
        if(n.name === 'home' || n.name === 'login' ) {
          this.navActive = 0
        }
        if(n.name === 'task' || n.name === 'task-details' ) {
          this.navActive = 1
        }
        if(n.name === 'task-details' && token == null) {
            this.$router.push({
                path: `/home`,
            })
        }
        if(n.name === 'points' || n.name === 'points-details' ) {
          this.navActive = 2
        }
        if(n.name === 'notice' || n.name === 'notice-details' ) {
          this.navActive = 3
        }
        if(n.name === 'about') {
          this.navActive = 4
        }
        /* if(n.name === 'heroes') {
          this.navActive = 6
        } */
        if(n.name === 'personal') {
          this.navActive = 6
        }
      },
    },
    beforeRouteEnter(to,from,next) {
      next(vm=>{
        if(to.name === 'home' || to.name === 'login' )  {
          vm.navActive = 0
        }
        if(to.name === 'task' || to.name === 'task-details' ) {
          vm.navActive = 1
        }
        /* if(to.name === 'testcenter') {
          vm.navActive = 2
        } */
        if(to.name === 'points' || to.name === 'points-details' ) {
          vm.navActive = 2
        }
        if(to.name === 'notice' || to.name === 'notice-details') {
          vm.navActive = 3
        }
        if(to.name === 'about') {
          vm.navActive = 4
        }
        /* if(to.name === 'heroes') {
          this.navActive = 6
        } */
        if(to.name === 'personal') {
          vm.navActive = 5
        }
      })
    },
}
</script>
