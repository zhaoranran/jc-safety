/**
 * 获取访问接口对象
 * 所有接口统一通过此文件调用
 * 开发环境可以使用jcfe模拟后台服务器接口
 * 运行环境使用使用jcmp来访问接口
 */

//var HTTP = require('./jcfe.api.js').HTTP; //访问mock
//var HTTP = require('./jcmp.api.js').HTTP; //访问jcmp
import { HTTP } from './jcmp.api.js';
import jcmp from '@/libs/jcmp.js';
import Util from '@/libs/util.js';

/**
 * 暴露给外部的公共接口方法,  对于页面使用者,
 * 应该是不用关心当前的请求是从jcmp调来的数据,还是前端mock模拟的数据
 */
export default {
	SUCCESS: '000000',
	FAILURE: '200000',
	parseUrl(url){//图片路径转换
        return jcmp.convertResourceUrl(url);
   	},
   	parseDate(stamp) {//日期格式转换
		return stamp ? Util.format(new Date(stamp) ,'yyyy-MM-dd') : '';
	},
	parseTime(stamp) {//时间格式转换
		return stamp ? Util.format(new Date(stamp) ,'yyyy-MM-dd hh:mm') : '';
	},
	CONTACTS: { //人员选择树接口
        //根据部门id获取当前的下级部门及用户
        getDeptData(deptId) {
            return HTTP.get('/getUserByDeptIdgetAllChildDeptAndUserByDeptId.action?id=' + deptId);
        },
        //根据部门id获取下级所有用户
        getUsers(deptId) {
            return HTTP.get('/getAllUserByDeptId.action?id=' + deptId);
        },
        //获取所有部门信息
        getAllDept() {
            return HTTP.get('/getDepartment.action');
        },
        //根据关键字查询用户
        getUsersByName(keyword) {
            return HTTP.get('/queryByKeyword.action?keyword=' + keyword);
        },
        //转换图片路径
        convertUrl(resourceUrl) {
            return HTTP.defaults.baseURL + "/resource?uri=" + window.btoa(resourceUrl);
        }
    },
    STUDY: {
    	//首页
	    	//课程检索	
	    	getCourseList(params){
				return HTTP.get('/queryCourseList', params);
			},
			//专题学习	
			//专题图片列表
			queryCourseSpecialList(){
				return HTTP.get('/queryCourseSpecialList');
			},
			//专题详细信息
			getSpecial(id){
				return HTTP.get('/getCourseSpecial?id='+id);
			},
			//专题课程列表
			specialCourseList(params){
				return HTTP.get('/specialCourseList', params);
			},
			//热门筛选	
			//最新
			courseNewestList(params){
				return HTTP.get('/courseNewestList',params);
			},
			//最热
			courseHottestList(params){
				return HTTP.get('/courseHottestList',params);
			},
			//课程学习	
			//课程详情
			getCourse(id){
				return HTTP.get('/getCourse?id='+id);
			},
			//课程资源
			getResources(businessId, businessTable){
				return HTTP.get('/queryAllResourceBusiness?businessId='+businessId+'&businessTable='+businessTable);
			},
			//授课讲师
			getLecturer(id){
				return HTTP.get('/lecturerDetail?id='+id);
			},
			//收藏课程
			courseCollection(courseId, isCollection){
				return HTTP.get('/courseCollection?courseId='+courseId+'&isCollection='+isCollection);
			},
			//取消收藏
			courseCancelCollection(courseId, isCollection){
				return HTTP.get('/courseCancelCollection?courseId='+courseId+'&isCollection='+isCollection);
			},
			//保存学习时长
			saveCourse(params){
				return HTTP.get('/courseLearning', params);
			},
			//查询资源播放时间
			getPlayTime(params){
				return HTTP.get('/getUserCourseResource', params);
			},
		//分类
			//分类列表
			queryAllCourseGroupCount(){
				return HTTP.get('/queryAllCourseGroupCount');
			},
		 //我的    
            //个人信息    
            //个人学分
            getSumCredit(){
                return HTTP.get('/getSumCredit');
            },
            //必修课
            //必修课列表
            requiredCourseList(obj){
                return HTTP.get('/requiredCourseList?page='+obj.page+'&pageRows='+obj.pageRows);
            },
            //必修课分类数量
            requiredCourseCount(){
                return HTTP.get('/requiredCourseCount');
            },
            //未开始列表
            requiredCourseNotStartedList(obj){
                return HTTP.get('/requiredCourseNotStartedList?page='+obj.page+'&pageRows='+obj.pageRows+'&classStatus='+obj.classStatus);
            },
            //已开始列表
            //已结束列表
            //选修课列表
            unRequiredCourseList(obj){
                return HTTP.get('/unRequiredCourseList?page='+obj.page+'&pageRows='+obj.pageRows);
            },
            //我的收藏列表
            courseCollectionList(obj){
                return HTTP.get('/courseCollectionList?page='+obj.page+'&pageRows='+obj.pageRows);
            },
            //批量取消收藏
            batchCourseCollection(courseIds, isCollection){
				return HTTP.get('/batchCourseCollection?courseIds='+courseIds+'&isCollection='+isCollection);
			}
    },
    EXAM:{
		//我的考试	
			//未开始
			//进行中	
			//已结束
			planNotStartedList(obj){
                return HTTP.get('/planNotStartedList?page='+obj.page+'&pageRows='+obj.pageRows+'&startFlag='+obj.startFlag);
            },
            //是否可以进入考试
            checkUserPlanInfo(obj){
                return HTTP.get('/checkUserPlanInfo?planId='+obj.planId);
            },
            //我的考试分类
            queryMyPlanStartStatistics(){
            	return HTTP.get('/queryMyPlanStartStatistics');
            },
			//考试	
				//初始化试卷
				initPaperInfo(obj){
					return HTTP.get('/initPaperInfo?planId='+obj.planId);
				},
				//实时查询考生状态
				queryUserStatus(obj){
					return HTTP.get('/queryUserStatus?id='+obj.id);
				},
				//考试试题列表
				queryMyPaperInfo(obj){
					return HTTP.get('/queryMyPaperInfo?id='+obj.id+'&planId='+obj.planId);
				},
				//定时保存考卷状态
				saveMyPaperInfoPerMinute(params){
					return HTTP.post('/saveMyPaperInfoPerMinute',params);
				},
				//手动交卷/自动交卷/强制交卷/作废交卷
				saveMyPaperInfo(params){
					return HTTP.post('/saveMyPaperInfo',params);
				},
		//我的成绩	
			//我的成绩列表	
			myExamAchievementList(obj){
				return HTTP.get('/myExamAchievementList?page='+obj.page+'&pageRows='+obj.pageRows);
			},
			//参考履历列表	
			userStatusList(obj){
				return HTTP.get('/userStatusList?page='+obj.page+'&pageRows='+obj.pageRows+'&planId='+obj.planId);
			},
			//试卷查看
			viewUserPaperInfo(obj){
				return HTTP.get('/viewUserPaperInfo?id='+obj.id+'&statusId='+obj.statusId);
			}
    },
    NEWS:{
		//首页
			//01.获取用户站点ID
			queryBlogId(){
                return HTTP.get('/queryBlogId');
            },
			//02.获取用户所在部门创建的所有一级栏目
			queryStationGroupFirstColumns(){
                return HTTP.get('/queryStationGroupFirstColumns');
            },
			//03.递归查询栏目树 parentColumnId=-1查询所有栏目
            recursiveQueryStationGroupColumns(){
            	return HTTP.get('/recursiveQueryStationGroupColumns?columnId=-1');
            },
            //04.递归查询栏目树（包含内容） 
            recursiveQueryStationGroupColumnsContainList(params){
            	return HTTP.get('/recursiveQueryStationGroupColumnsContainList', params);
            },
            //05.新闻列表	
			queryNewsTabulatedData(params){
				return HTTP.get('/queryNewsTabulatedData?',params);
			},
			//06.新闻详情	
			queryDetailOfTheNews(params){
				return HTTP.get('/queryDetailOfTheNews?',params);
			},
			//07.获取评论更多数据
			queryCommentsMore(params){
				return HTTP.get('/queryCommentsMore?',params);
			},
			//08.评论/回复
			commentOrReply(params){
				return HTTP.post('/commentOrReply?',params);
			},
			//09.收藏/取消收藏 
			collection(params){
				return HTTP.post('/collection?',params);
			},
			//10.点赞/取消点赞 
			thumbUpOrCancelThumbUp(params){
				return HTTP.post('/thumbUpOrCancelThumbUp?',params);
			},
			//11.删除评论/回复  
			deleteCommentOrReply(params){
				return HTTP.post('/deleteCommentOrReply?',params);
			},
			//12.新闻搜索
			queryDetailUser(params){
				return HTTP.get('/queryDetailUser?',params);
			},
			//13.通知列表查询
			queryNoticeList(params){
				return HTTP.get('/queryNoticeList?',params);
			},
    },
    MEET:{
		//首页
			//01.会议活动菜单
			queryMeetingColumns(){
                return HTTP.get('/queryMeetingColumns?isShowAll=true');
            },
			//02.会议活动列表查询
			queryMeetingList(params){
                return HTTP.get('/queryMeetingList', params);
            },
			//03.会议活动查询详细
            queryDetail(params){
            	return HTTP.get('/queryDetail', params);
            },
            //04.新增会议活动
            saveMeetingActive(params){
            	return HTTP.post('/saveMeetingActive', params);
            },
    },
    PERSONAL:{
		//首页
			//01.获取用户详细信息
			queryUseretail(){
                return HTTP.get('/queryUseretail');
           	},
           	//02.个人缴费情况
           	payRecordList(params){
                return HTTP.get('/payRecordList', params);
           	},
           	//03.我的收藏	
           	getCollectionList(params){
                return HTTP.get('/getCollectionList', params);
           	},
           	//04.取消收藏
           	delCollection(params){
                return HTTP.get('/delCollection?ids='+params);
           	},
           	//05.我的积分
           	detailUserIntegral(params){
                return HTTP.get('/detailUserIntegral', params);
           	}, 
           	//06.学习情况
           	detailUserRecord(params){
                return HTTP.get('/detailUserRecord', params);
           	},
           	//07.生活助手
           	getAssistant(){
                return HTTP.get('/getAssistant');
           	}, 
           	//08.关于党建e家
           	getAnenst(){
                return HTTP.get('/getAnenst');
           	}, 
           	//09.修改用户信息
           	updateUser(params){
                return HTTP.post('/updateUser', params);
           	}, 
           	//10.用户修改密码
           	updatePassWord(params){
                return HTTP.post('/updatePassWord', params);
           	}, 
           	//11.头像上传
           	saveUserPhoto(){
                return HTTP.post('/saveUserPhoto');
           	}, 
           	
           	
    }
};
