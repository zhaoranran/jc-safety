<template>
    <div class="task-details">
        <v-crumbs :crumbsList="crumbsList"></v-crumbs>
        <div class="task-banner module">
            <div class="task-banner-content">
                <div class="person-img">
                    <img src="../../assets/images/header-img.png" alt="">
                    <span>专属SRC</span>
                </div>
                <div class="company-name">
                    嘉诚企业安全
                </div>
                <p>长春嘉诚信息技术股份有限公司</p>
                <div class="apply">
                    <el-button class="apply-btn" :class="{noclick:!isOnclickFlage}" :title="errorMessage" type="text" @click="open2">报名</el-button>
                </div>
            </div>
        </div>
        <div class="module">
            <div class="task-theme">
                <h2 class="commont-title"><span>任务信息</span></h2>
                <div class="task-theme-center">
                    <div class="theme-img" style="width:13%">
                        <img :src="detailsData.resourceName" alt="">
                    </div>
                    <div class="theme-name" style="width:18%">
                        <span>任务名称</span>
                        <p>{{detailsData.taskName}}</p>
                    </div>
                    <div class="theme-type" style="width:18%">
                        <span>任务类型</span>
                        <p>{{detailsData.taskTypeValue}}</p>
                    </div>
                    <div class="theme-rank" style="width:18%">
                        <span>等级</span>
                        <p>{{detailsData.taskLevelValue}}</p>
                    </div>
                    <div class="theme-limit" style="width:33%">
                        <span>期限</span>
                        <p>{{detailsData.taskBeginDate}}</p>
                        <p>{{detailsData.taskEndDate}}</p>
                    </div>
                </div>
            </div>
            <div class="task-describe">
                <h2 class="commont-title"><span>任务描述</span></h2>
                <div class="task-describe-center" v-html="detailsData.taskDetail"></div>
                <div class="notice-details-affix" v-if="userIsApplyRecord">
                    <div>附件：</div>
                    <ul>
                        <li v-for="(item,index) in attachNewsList" :key="index">
                            <a @click="download(item)" href="javascript:void(0);">{{item.fileName}}<i class="icon iconfont iconruku"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Crumbs from '../../components/crumbs/Crumbs'

export default {
    data(){
        return {
            userId:'',
            crumbsList:[
                {
                    name:'首页',
                    url:'/home'
                },
                {
                    name:'任务大厅',
                    url:'/points'
                },
                {
                    name:'任务详情',
                    url:''
                },
            ],
            taskId:'',
            detailsData:{},
            attachNewsList:[],
            errorMessage:'',
            isOnclickFlage:true,
            userIsApplyRecord:false,//是否显示附件
            fileUrl:''
        }
    },
    components:{
       'v-crumbs':Crumbs
    },
    mounted(){
        let id = this.$route.params.id;
        this.taskId = id;
        this.$nextTick(()=>{
            this.userId = window.sessionStorage.getItem("userId")
            this.getDetails(id);
        });
    },
    methods:{
        getDetails(id){
            let _this = this;
            this.$axios.post('/task/taskInfoApi/get.action',{
                id:id,
                userId:_this.userId
            })
            .then(res => {
                if(res.data){
                    console.log(res.data);
                    _this.detailsData = res.data.taskInfo;
                    _this.attachNewsList = res.data.attachList;
                    _this.isOnclickFlage = res.data.isOnclickFlage;
                    _this.errorMessage = res.data.errorMessage;
                    _this.userIsApplyRecord = res.data.userIsApplyRecord;
                    _this.fileUrl = res.data.fileUrl;
                }
            })
        },
        getToken(){
            this.$axios.post('/task/taskInfoApi/getToken.action')
            .then(res => {
                if(res.data){
                    let token = res.data.token;
                    this.apply(token);
                }
            })
        },
        /* 报名 */
        apply(token){
                let _this = this;
                _this.$axios.post('/task/taskApplyRecordApi/save.action',{
                    token:token,
                    taskId:this.taskId,
                    userId:_this.userId
                })
                .then(res => {
                    if(res.data.success == 'true'){
                        _this.$message({
                            type: 'success',
                            message: res.data.successMessage
                        });
                        _this.isOnclickFlage = false;
                        _this.errorMessage = '已报名成功';
                    }else{
                        _this.$message({
                            type: 'error',
                            message: res.data.errorMessage
                        });
                    }
                })
            
        },
        open2() {
            if(!this.isOnclickFlage){
                return false;
            }else{
                this.$confirm('确定要报名吗', '确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.getToken();
                    }).catch(() => {
                    /* this.$message({
                        type: 'info',
                        message: '报名失败'
                    });  */         
                });
            }
        },
        download(attach){//下载附件
            if(!attach.resourcesName){
                return;
            }
            location.href =   this.fileUrl +attach.resourcesName;
        },
    }
}
</script>
<style lang="scss">
.task-banner{
    height: 360px;
    background: url(../../assets/images/task-banner.png) no-repeat 0 0;
    display: flex;
    align-items:center;/*垂直居中*/
    justify-content: center;/*水平居中*/
}
.task-details .crumbs{
    margin-bottom:0;
}

.task-banner .person-img{
    position: relative;
    width:114px;
    height: 114px;
    margin:0 auto;
    margin-bottom:20px;
    img{
        width: 100%;
        height: 100%;
    }
    span{
        position: absolute;
        color:#fff;
        display: inline-block;
        padding:4px 10px;
        background:#35bd0b;
        border-radius: 4px;
        left: 22px;
        bottom: 0px;
        font-size: 12px;
    }
}
.company-name{
    font-size: 59px;
    color:#fff;
    text-shadow:5px 2px 6px blue;
    font-style: italic;
}
.task-banner p{
    margin-top:10px;
    margin-bottom:20px;
    line-height: 35px;
    border-top:1px solid #363d5c;
    border-bottom:1px solid #363d5c;
    color:rgba(255,255,255, 0.5);
    text-align: center;
}
.task-banner .apply{
    text-align: center;
}
.task-banner .apply .apply-btn{
    display: inline-block;
    padding:0 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    color:#fff;
    border:1px solid #1e2b9b;
    background: linear-gradient(to right, #00d1ff , #007fff);
    border-radius: 4px;
}
.task-banner .apply .apply-btn:hover{
    background: linear-gradient(to right, #fabe1c , #c95835);
    border:1px solid #ff985c;
}
.task-banner .apply .noclick{
    background:#ccc;
    cursor: not-allowed;
}
.task-banner .apply .noclick:hover{
    background:#ccc;
    border:1px solid #ccc;
}
.task-theme{
    background: #fff;
    padding-top:15px;
    padding-left: 20px;
}
.task-theme-center{
    display: flex;
    justify-content: flex-start;
    margin-top:20px;
    padding-bottom:20px;
    >div{
        margin-left: 30px;
        padding-left: 30px;
        border-left: 1px solid #ededed;
    }
    .theme-name,.theme-img{
        border:none;
        
    }
    .theme-img{
        padding-left: 0;
        margin-left: 0;
        text-align: left;
        width: 136px;
        height: 90px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    span{
        font-size: 14px;
        color:#999;
        line-height: 35px;
    }
    p{
        font-size: 18px;
        color:#666;
        line-height: 35px;
        font-weight: 700;
    }
    .theme-name{
        margin-left: 0;
    }
    .theme-rank p{
        color:#f37016;
    }
    .theme-limit p{
        line-height: 25px;
    }
}
.task-describe{
    background: #fff;
    padding-top:15px;
    padding-left: 20px;
    margin-top:20px;
    .task-describe-center{
        min-height: 470px;
        line-height: 35px;
        word-wrap: break-word;
    }
}
</style>

