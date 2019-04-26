<template>
    <div class="person-task">
        <div class="person-header">
            <div class="person-containt">
                <div class="person-photo">
                    <img :src="userInfo.photo?userInfo.photo:require('../../assets/images/header-photo.png')" alt="">
                </div>
                <div class="person-name">{{userInfo.displayName}}</div>
                <div class="person-title over-hide" :title="userInfo.userLevelValue">{{userInfo.userLevelValue}}</div>
                <div class="person-appraise over-hide" :title="userInfo.skill">{{userInfo.skill}}</div>
            </div>
        </div>
        <div class="person-result">
            <div class="result">
                <h2>战绩</h2>
                <div class="result-contern">
                    <div>
                        <p class="result-num">{{userInfo.points == null?0:userInfo.points}}</p>
                        <p>积分</p>
                    </div>
                    <div>
                        <p class="result-num">{{userInfo.exp}}</p>
                        <p>经验值</p>
                    </div>
                </div>
            </div>
            <div class="result">
                <h2>任务</h2>
                <div class="result-contern">
                    <div>
                        <p class="result-num">{{userInfo.enrollCount == null?0:userInfo.enrollCount}}</p>
                        <p>报名次数</p>
                    </div>
                    <div>
                        <p class="result-num">{{userInfo.commitCount == null?0:userInfo.commitCount}}</p>
                        <p>提交次数</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            userId:'',
            userInfo:{
                photo:'',
                displayName:'',
                userLevelValue:'',
                skill:'',
                points:'',
                exp:'',
                enrollCount:'',
                commitCount:''
            }
        }
    },
    mounted() {
        this.$nextTick(()=>{
            this.userId = window.sessionStorage.getItem("userId");
            this.getUserInfo();
        });
    },
    methods: {
        getUserInfo(){
            let _this = this;
            this.$axios.post('/account/accountInfoApi/get.action?',{
                userId:this.userId
            })
            .then(res => {
                if(res.data){
                   this.userInfo = res.data;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
}
</script>
<style lang="scss">
@import '../../assets/sass/common.scss';
    .person-header{
        display: flex;
        align-items:center;/*垂直居中*/
        justify-content: center;/*水平居中*/
        background:url(../../assets/images/person-header.png) no-repeat top left;
        
        .person-containt{
            max-width: 610px;
            text-align: center;
        }
        .person-photo{
            margin-top:110px;
            
            height: 135px;
            text-align: center;
            img{
                width: 135px;
                height: 100%;
            }
        }
        .person-name{
            margin-top:22px;
            font-size: 24px;
            color:#333;
        }
        .person-title{
            width:610px;
            color:#4995f1;
            font-size: 16px;
            line-height: 35px;
        }
        .person-appraise{
            width:610px;
            color:#999;
            margin-top:10px;
        }
    }
    .person-result{
        margin:60px 20px 80px;
        padding:35px 50px;
        border:1px solid #ddd;
        border-radius: 4px;
        background:url(../../assets/images/person-result.png) no-repeat center bottom;
        display: flex;
        justify-content: space-between;
        h2{
            font-size: 24px;
            color:#666;
            padding-bottom:25px;
            border-bottom:3px solid #ddd;
            text-align: center;
            margin:0 90px;
        }
        .result-contern{
            display: flex;
            justify-content: space-between;
            >div{
                text-align: center;
                margin-top:40px;
            }
            
            .result-num{
                font-size: 36px;
                color:$global-a-color;
                margin-bottom:20px;
            }
            div+div{
                margin-left: 70px;
            }
            p{
                font-size: 24px;
                color:#666;
            }
        }
    }
</style>
