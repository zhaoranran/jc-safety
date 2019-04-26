<template>
    <div class="person-task">
        <div class="article-table" v-if="!isShowArticleDetail">
            <el-table
                ref="multipleTable"
                :data="articleTableList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                prop="articleTitle"
                label="文章标题"
                width="120">
                </el-table-column>
                <el-table-column
                prop="articleComment"
                label="文章说明"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="submitDate"
                label="提交时间"
                width="120">
                </el-table-column>
                <el-table-column
                prop="isAcceptAuditResult"
                label="是否采纳"
                width="120">
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <div v-if="scope.row.submitDate == null">
                        <el-button size="mini" @click="ariticleSubmit(scope.$index, scope.row)">提交</el-button>
                        <el-button
                        size="mini"
                        @click="lookArticle(scope.$index, scope.row,true)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="articeDelete(scope.$index, scope.row)">删除</el-button>
                    </div>
                    <div v-else>
                        <el-button
                        size="mini" 
                        @click="lookArticle(scope.$index, scope.row,false)">查看</el-button>
                    </div>
                </template>
                </el-table-column>
            </el-table>
            <el-button  @click="addArticle()">新增</el-button>
            <v-pager v-show="totalPages>1" @currentPager="currentPager" :totalPages="totalPages" :pageRows="pageRows" ></v-pager>
        </div>
        <div class="article-detail" v-else>
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="80px" class="article-form">
                <el-form-item label="文章标题" prop="articleTitle">
                    <el-input v-model="ruleForm.articleTitle" :readonly="!showLookOrEdit?true:false"></el-input>
                </el-form-item>
                <el-form-item label="文章说明" prop="articleComment">
                    <el-input type="textarea" rows="10" v-model="ruleForm.articleComment" :readonly="!showLookOrEdit?true:false"></el-input>
                </el-form-item>
                <el-form-item label="文章附件">
                    <v-upload  v-if="showLookOrEdit" @fileid="fileid" @deleteUploadFileId="deleteUploadFileId"></v-upload>
                    <ul>
                        <li v-for="(item,index) in attachList" :key="index">
                            <a :href="item.fileNameUrl">{{item.fileName}}<i class="icon iconfont iconruku"></i></a>
                        </li>
                    </ul>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" @click="getToken(ruleForm.id,ruleForm.modifyDate,'ruleForm')" v-if="showLookOrEdit"> 保存</el-button>
                    <el-button @click="goBack">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import Format from '../../assets/js/format.js'
import Upload from '../../components/upload/Upload'
import Pager from '../../components/pager/Pager'
export default {
    data(){
        return {
            userId:'',
            articleTableList: [],
            showLookOrEdit:false,//查看或者编辑
            isShowArticleDetail:false,
            totalPages:0,//共多少页
            pageRows:10,//每页显示的条数
            page:0,
            ruleForm:{},
            rules:{
                articleTitle:[
                    { required: true, message: '请输入文章标题', trigger: 'blur'  },
                    { min:0,  max: 200, message: '输入长度在200以下的字符',  trigger: 'blur' }
                ],
                articleComment:[
                    { required: true, message: '请输入文章说明', trigger: 'blur'  },
                    { min:0,  max: 500, message: '输入长度在500以下的字符',  trigger: 'blur' }
                ]
            },
            attachList:[],
            uploadFileid:[],
            uploadDeleteUploadFileId:'',
            
        }
    },
    components:{
        'v-upload':Upload,
        'v-pager':Pager,
    },
    props:[
        "personActive"
    ],
    mounted(){
        this.$nextTick(()=>{
            this.userId = window.sessionStorage.getItem("userId");
            this.getArticleData();
        });
    },
    methods:{
        getToken(id,modifyDate,formName){
            this.$axios.post('/task/taskInfoApi/getToken.action')
            .then(res => {
                if(res.data){
                    let token = res.data.token;
                    this.onSubmit(id,modifyDate,token,formName);
                }
            })
        },
        deleteUploadFileId(deleteUploadFileId){
            this.uploadDeleteUploadFileId = deleteUploadFileId;
        },
        fileid(fileid){
            this.uploadFileid = fileid;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        goBack(){
            this.isShowArticleDetail = false;
        },
        addArticle(){
            this.showLookOrEdit = true;
            this.isShowArticleDetail = true;
            this.ruleForm = {};
            this.attachList = [];
        },
        onSubmit(id,modifyDate,token,formName) {
            if(id){
                this.editArticle(id,modifyDate,token,formName);
            }else{
                this.saveArticle(token,formName);
            }
        },
        editArticle(id,modifyDate,token,formName){
            let _this = this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
               this.$axios.post('/article/articleInfoApi/update.action',{
                    token:token,
                    userId:_this.userId,
                    id:id,
                    articleTitle:this.ruleForm.articleTitle,
                    articleComment:this.ruleForm.articleComment,
                    modifyDate:modifyDate,
                    fileid:this.uploadFileid,
                    deleteUploadFileId:this.uploadDeleteUploadFileId
                })
                .then(res => {
                    if(res.data){
                        if(res.data.success == 'true'){
                            _this.getArticleData();
                            _this.pageRows = res.data.pageRows;
                            _this.totalPages = res.data.totalPages;
                            _this.$message({
                                type: 'success',
                                message: res.data.successMessage
                            });
                            _this.isShowArticleDetail = false;
                        }else{
                            _this.$message({
                                type: 'error',
                                message: res.data.errorMessage
                            });
                        }
                        
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
        saveArticle(token,formName){
            let _this = this;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$axios.post('/article/articleInfoApi/save.action',{
                        token:token,
                        userId:_this.userId,
                        articleTitle:_this.ruleForm.articleTitle,
                        articleComment:_this.ruleForm.articleComment,
                        fileid:_this.uploadFileid,
                        deleteUploadFileId:_this.uploadDeleteUploadFileId
                    })
                    .then(res => {
                        if(res.data.success == 'true'){
                            _this.getArticleData();
                            _this.$message({
                                type: 'success',
                                message: res.data.successMessage
                            });
                            _this.isShowArticleDetail = false;
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
                    return false;
                }
            });
            
        },
        /* 文章的提交 */
        ariticleSubmit(index,row){
        this.$confirm('请确认是否提交', '确认', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'success'
        }).then(() => {
            this.articleSubmitDate(row.id);

        }).catch(() => {
        this.$message({
            type: 'info',
            message: '已取消'
            });          
        });
        },
        lookArticle(index, row ,type){
            this.isShowArticleDetail = true;
            this.showLookOrEdit = type;
            this.articleLook(row.id)
        },
        articeDelete(index,row){
            this.$confirm('请确认是否删除？', '确认', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
            }).then(() => {
                this.articeDeleteDate(row.id);
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消删除'
                });          
            });
        },
        articeDeleteDate(id){
            let _this = this;
            this.$axios.post('/article/articleInfoApi/deleteByIds.action',{
                ids:id,
            })
            .then(res => {
                if(res.data.success == 'true'){
                    _this.getArticleData();
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
        },
        /* 我的文章 */
        getArticleData(){
            let _this = this;
            this.$axios.post('/article/articleInfoApi/manageList.action',{
                userId:_this.userId,
                page:this.page
            })
            .then(res => {
                if(res.data){
                    _this.articleTableList = res.data.data;
                    _this.pageRows = res.data.pageRows;
                    _this.totalPages = res.data.totalPages;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        /* 我的文章提交接口 */
        articleSubmitDate(id){
            let _this = this;
            _this.$axios.post('/article/articleInfoApi/submit.action',{
                id:id
            })
            .then(res => {
                _this.getArticleData();
                _this.$message({
                    type: 'success',
                    message: res.data.successMessage
                }); 
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        /* 我的文章查看编辑 */
        articleLook(id){
            let _this = this;
            _this.$axios.post('/article/articleInfoApi/get.action',{
                userId:_this.userId,
                id:id
            })
            .then(res => {
                if(res.data){
                    _this.ruleForm = res.data;
                    _this.attachList = res.data.attachList;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        currentPager(page){
            this.page = page-1;
            this.getArticleData();
        },
    },
    watch:{
        personActive(val){
            if(val == '2'){
                this.getArticleData();
                this.goBack();
            }
        }
    }
}
</script>
<style lang="scss">
    .article-form{
        width:60%;
    }
</style>
