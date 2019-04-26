<template>
    <div class="upload">
        <el-upload
        class="upload-demo"
        action="/jcsrc/common/AttachApi/upload.action"
        :headers="headers"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="uploadSuccess"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
    </div>
</template>

<script>
export default {
    data() {
      return {
        fileList: [],
        submitFileList:[],
        deleteUploadFileId:'',
        headers:{
          userId:''
        }

      };
    },
    mounted() {
      this.$nextTick(()=>{
            this.headers.userId = window.sessionStorage.getItem("userId");
            
        });
    },
    methods: {
      handleRemove(file, fileList) {
        this.deleteUploadFileId += file.response.files[0].id +',';
        // console.log(this.deleteUploadFileId);
       // this.deleteUploadFileId = this.deleteUploadFileId.substring(0,this.deleteUploadFileId.length-1);
        //console.log(this.deleteUploadFileId);
        this.$emit('deleteUploadFileId',this.deleteUploadFileId);
      },
      handlePreview(file) {
        console.log(file);
      },
      uploadSuccess(response, file, fileList){
        this.submitFileList.push(file.response.files[0].id);
        this.$emit('fileid',this.submitFileList);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        console.log(fileList);
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
}
</script>


<style lang="scss">
    
</style>
