<template>
    <div class="person-task">
        <div v-if="!isTaskDetail">
            <el-table
                ref="taskTable"
                :data="taskTable"
                tooltip-effect="dark"
                style="width: 100%"
                >
                <el-table-column
                prop="taskName"
                label="任务名称"
                width="100">
                </el-table-column>
                <el-table-column
                prop="taskTypeValue"
                label="任务类别"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="taskLevelValue"
                label="任务等级"
                width="100">
                </el-table-column>
                <el-table-column
                prop="taskDate"
                label="任务起止时间"
                width="120">
                </el-table-column>
                <el-table-column
                prop="applyDate"
                label="报名时间"
                width="120">
                </el-table-column>
                <el-table-column
                prop="taskStateValue"
                label="状态"
                width="120">
                </el-table-column>
                <el-table-column label="操作" width="270" v-if="!isSubmitTask">
                    <template slot-scope="scope">
                        <div v-if="scope.row.taskState == 'task_state_1' || scope.row.taskState == 'task_state_2'">
                            <el-button
                            size="mini"
                            @click="lookTask(scope.$index, scope.row)">查看任务</el-button>
                        </div>
                        <div v-else-if="scope.row.taskState == 'task_state_3' || scope.row.taskState == 'task_state_4'">
                            <el-button
                            size="mini"
                            @click="lookTask(scope.$index, scope.row)">查看任务</el-button>
                            <el-button
                            size="mini"
                            @click="submitTask(scope.$index, scope.row)">提交任务</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="270" v-else>
                    <template slot-scope="scope">
                        <div>
                            <el-button
                            size="mini"
                            @click="lookTaskDetail(scope.$index, scope.row)">查看任务</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div v-if="isSubmitTask">
                <el-button type="primary" @click="addTask">新增</el-button>
                <el-button @click="goBack">返回</el-button>
            </div>
            <v-pager v-show="totalPages>1" @currentPager="currentPager" :totalPages="totalPages" :pageRows="pageRows" ></v-pager>
        </div>
        <div v-else>
            <el-form ref="form" :model="form" label-width="80px" class="task-form" :rules="rules">
                <el-form-item label="提交详情" prop="submitDetail">
                    <el-input type="textarea" rows="10" v-model="form.submitDetail" :readonly="isLookDetail?true:false" ></el-input>
                </el-form-item>
                <div v-if="!form.id">
                    <v-upload @fileid="fileid" @deleteUploadFileId="deleteUploadFileId"></v-upload>
                    <!-- <Uploader ref="uploader" class="uploader" :options="uploaderOptions"></Uploader> -->
                </div>
                <div v-if='attachList.length>0' class="notice-details-affix">
                    <div>附件：</div>
                    <ul>
                        <li v-for="(item,index) in attachList" :key="index">
                            <a @click="download(item)" href="javascript:void(0);">{{item.fileName}}<i class="icon iconfont iconruku"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="person-point" v-if="isLookDetail && auditResult=='audit_result_pass'">
                    <div>
                        <span>获得积分</span>
                        <span>{{point}}</span>
                    </div>
                    <div>
                        <span>获得经验值</span>
                        <span>{{experience}}</span>
                    </div>
                </div>
            </el-form>
            <el-button type="primary" v-if="isShowSubmit" @click="getToken('form')">提交</el-button>
            <el-button @click="goBackSubmitList">返回</el-button>
        </div>
    </div>
</template>

<script>
import jcmp from '@/libs/jcmp.js';
import config from '../../../config';
import Upload from '../../components/upload/Upload'
import Pager from '../../components/pager/Pager'


export default {
    data(){
        return {
            userId:'',
            isSubmitTask:false,//是否显示提交任务列表
            isTaskDetail:false,//是否是任务详情页
            isLookDetail:false,//判断是新增还是查看详情页面
            taskTable:[],
            taskSubmitTable:[],
            taskListTable:[],
            totalPages:0,//共多少页
            pageRows:10,//每页显示的条数
            page:0,
            fileUrl:'',
            form:{

            },
            rules:{
                submitDetail:[
                    { required: true, message: '请输入提交详情', trigger: 'blur'  },
                    { min:0,  max: 500, message: '输入长度在500以下的字符',  trigger: 'blur' }
                ]
            },
            attachList:[],
            isShowSubmit:true,//是否显示提交按钮
            taskId:'',
            uploadFileid:[],
            uploadDeleteUploadFileId:'',
            point:'',//积分值
            experience:'',//经验值
            auditResult:'',//审核状态
            /* uploaderOptions: {//附件参数
                headers: {
                    'client_app_id': jcmp._appId(),
                    'client_device_id': jcmp._deviceId(),
                    'access_token': jcmp._jcmpToken()
                },
                formData: {
                    businessId : 1,
                    businessTable : 'table',
                    category: 'category1',
                },
                style: 'jcimg',
                label: '<i class="icon-xiangji"></i>照片',
                server: '/jcsrc/common/AttachApi/upload.action',
                targetHandler(file){
                    console.log("targetHandler", file)
                    _this.files.push(file);
                }
            }, */
        }
    },
    components:{
        'v-upload':Upload,
        'v-pager':Pager
        //Uploader
    },
    props:[
        "personActive"
    ],
    mounted(){
        this.$nextTick(()=>{
            this.userId = window.sessionStorage.getItem("userId")
            this.getTaskData();
            
        });
        
    },
    methods:{
        getToken(formName){
            this.$axios.post('/task/taskInfoApi/getToken.action')
            .then(res => {
                if(res.data){
                    let token = res.data.token;
                    this.submitTaskDetail(token,formName);
                }
            })
        },
        deleteUploadFileId(deleteUploadFileId){
            this.uploadDeleteUploadFileId = deleteUploadFileId;
        },
        fileid(fileid){
            this.uploadFileid = fileid;
        },
        /* 提交新增任务 */
        submitTaskDetail(token, formName){
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('/task/taskSubmitRecordApi/save.action',{
                    token:token,
                    taskId:this.taskId,
                    userId:_this.userId,
                    submitDetail:this.form.submitDetail,
                    fileid:this.uploadFileid,
                    deleteUploadFileId:this.uploadDeleteUploadFileId
                })
                .then(res => {
                    if(res.data.success == 'true'){
                        _this.isTaskDetail = false;
                        _this.isSubmitTask = false;
                        _this.isShowSubmit = false;
                        _this.goBackSubmitList(this.taskId);
                        _this.submitTaskData(_this.taskId)
                        _this.$message({
                            type: 'success',
                            message: res.data.successMessage
                        });

                    }else{
                        _this.$message({
                            type: 'error',
                            message: res.data.errorMessage
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            } else {
                console.log('error submit!!');
                return false;
            }
            });
            
        },
        /* 查看任务详情 */
        lookTaskDetail(index, row){
            this.isTaskDetail = true;
            this.isLookDetail = true;
            this.isShowSubmit = false;
            this.getTaskDetail(row.id);
            
        },
        /* 获取任务详情 */
        getTaskDetail(id){
            this.$axios.post('/task/taskSubmitRecordApi/get.action',{
                id:id
            })
            .then(res => {
                if(res.data){
                   this.form = res.data.taskSubmitRecord;
                   this.attachList = res.data.taskSubmitRecord.attachList;
                   this.experience = res.data.taskSubmitRecord.experience;
                   this.point =  res.data.taskSubmitRecord.point;
                   this.auditResult = res.data.taskSubmitRecord.auditResult;
                   this.fileUrl = res.data.fileUrl;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        /* 返回任务列表页 */
        goBack(){
            this.taskTable = this.taskListTable;
            this.isTaskDetail = false;
            this.isSubmitTask = false;
        },
        /* 从任务详情页返回任务提交列表页 */
        goBackSubmitList(){
            this.taskTable = this.taskSubmitTable;
            this.isTaskDetail = false;
            this.isSubmitTask = true;
            this.isShowSubmit = true;
        },
        /* 新增任务 */
        addTask(){
            this.form = {};
            this.attachList = [];
            this.isTaskDetail = true;
            this.isLookDetail = false;
        },
        lookTask(index, row){
            this.$router.push({
                path: `/task-details/${row.taskId}`,
            })
        },
        submitTask(index, row) {
            this.taskId = row.taskId;
            this.submitTaskData(row.taskId);
        },
        /* 提交任务详情页 */
        submitTaskData(taskId){
            let _this = this;
            _this.$axios.post('/task/taskSubmitRecordApi/manageList.action',{
                taskId:taskId
            })
            .then(res => {
                if(res.data){
                    _this.$nextTick(()=>{
                        _this.taskSubmitTable = res.data.data;
                        _this.taskTable = _this.taskSubmitTable;
                        _this.isSubmitTask = true;
                        _this.pageRows = res.data.pageRows;
                        _this.totalPages = res.data.totalPages;
                    });
                   
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        /* 我的任务 */
        getTaskData(){
            let _this = this;
            this.$axios.post('/task/taskApplyRecordApi/manageList.action',{
                userId:_this.userId,
                page:this.page
            })
            .then(res => {
                if(res.data){
                    _this.pageRows = res.data.pageRows;
                    _this.totalPages = res.data.totalPages;
                    _this.taskListTable = res.data.data;
                    _this.taskTable = this.taskListTable;
                    _this.pageRows = res.data.pageRows;
                    _this.totalPages = res.data.totalPages;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        currentPager(page){
            this.page = page-1;
            this.getTaskData();
        },
        download(attach){//下载附件
            if(!attach.resourcesName){
                return;
            }
            location.href =   this.fileUrl +attach.resourcesName;
        },
    },
    watch:{
        personActive(val){
            if(val == 1){
                this.getTaskData();
                this.goBack();
            }
        }
    }
    
}
</script>
<style lang="scss">
    .task-form{
        width:60%;
        margin-bottom:20px;
    }
    .person-point{
        display:flex;
        justify-content: space-between;
    }
</style>
