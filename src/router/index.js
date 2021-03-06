import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home/Home'//首页
import Index from '@/components/index/Index'//首页
import Task from '@/components/task/Task'//任务大厅
import TaskDetails from '@/components/task/Details'//任务大厅
import TestCenter from '@/components/home/TestCenter'//众测中心
import Points from '@/components/points/Points'//积分商城
import Notice from '@/components/notice/Notice'//公告中心
import Heroes from '@/components/heroes/Heroes'//英雄榜
import Login from '@/components/login/Login'//登录
import Personal from '@/components/personal/Personal'//个人中心
import NoticeDetails from '@/components/notice/Details'//公告中心详情页
import PointsDetails from '@/components/points/Details'//积分商城详情页

import About from '@/components/about/About'//关于我们
Vue.use(Router)

export default new Router({
  routes: [
    {
      
        path: '/',
        redirect: '/home',
        component: Index,
    
      children:[
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/task',
          name: 'task',
          component: Task
        },
        {
          path: '/task-details/:id',
          name: 'task-details',
          component: TaskDetails
        },
        {
          path: '/testcenter',
          name: 'testcenter',
          component: TestCenter
        },
        {
          path: '/points',
          name: 'points',
          component: Points
        },
        {
          path: '/points-details/:id',
          name: 'points-details',
          component: PointsDetails
        },
        {
          path: '/notice',
          name: 'notice',
          component: Notice,
        },
        {
          path: '/notice-details/:id',
          name: 'notice-details',
          component: NoticeDetails
        },
        {
          path: '/about',
          name: 'about',
          component: About
        },
        {
          path: '/heroes',
          name: 'heroes',
          component: Heroes
        },
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        {
          path: '/personal',
          name: 'personal',
          component: Personal
        },
      ]

    },
    
  ]
})
