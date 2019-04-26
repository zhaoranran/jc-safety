<template>
    <div class="about m-t-90">
        <v-crumbs :crumbsList="crumbsList"></v-crumbs>
        <div class="about-banner"></div>
        <div class="module">
            <div class="about-contern">
                <div class="about-header">
                    <h2>关于我们</h2>
                    <p>企业愿景、企业使命、嘉诚精神、核心价值观、管理理念和工作方法</p>
                </div>
                <div class="about-referral">
                    <ul>
                        <li v-for="(item,index) in referralList" :key="index">
                            <div class="about-img">
                                <img :src="item.referralList" alt="">
                            </div>
                            <h3>{{item.title}}</h3>
                            <div class="border"></div>
                            <p>{{item.companyAbout}}</p>
                            <div class="border-left" v-show="index != referralList.length-1"></div>
                        </li>
                        
                    </ul>
                </div>
                <div class="about-footer">
                    <div class="about-left">
                        <img src="../../assets/images/about-img.png" alt="">
                    </div>
                    <div class="about-right">
                        <p>嘉诚公司以软件和信息技术服务为主营业务，创立于1995年，并于2015年10月28日成功登陆新三板（股票代码：833937）。</p>
                        <p>嘉诚信息网络安全服务事业部创立于2014年，专注于信息系统全生命周期各阶段的安全服务支持，是吉林省领先的网络安全服务提供商，安服事业部现拥有近50名安全技术人员，其中多名成员为国内一线白帽子。</p>
                        <p>能够为客户提供“安全咨询、等保测评、风险评估、渗透测试、代码审计、安全监测、云安全防护、安全应急、应急演练、安全运维等一站式服务”。
                            <br>成功案例覆盖政府、公检法司、交通、环保、统计、人社、金融、证券、电力、教育、能源、卫生、文化、广电、互联网企业等行业。</p>
                    </div>
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
            crumbsList:[
                {
                    name:'首页',
                    url:'/home'
                },
                {
                    name:'关于我们',
                    url:'/about'
                }
            ],
            referralList:[
                {
                   referralList:require('../../assets/images/about-01.png'),
                   title:'企业愿景',
                   companyAbout:'成为“中国政务软件信息化的重要力量”是嘉诚企业的战略蓝图、是嘉诚人共同的信仰、是值得所有同仁全力以赴的未来。'

                },
                {
                   referralList:require('../../assets/images/about-02.png'),
                   title:'企业使命',
                   companyAbout:'“让管理更轻松”是嘉诚存在的宣言，是对公司发展和未来的定位。嘉诚将沿着这条鲜明的“ 路线 ”不断前行。'

                },
                {
                   referralList:require('../../assets/images/about-03.png'),
                   title:'企业文化',
                   companyAbout:'专业：树牢专业理念为基础深研 敬业：认真踏实、恪尽职守 创新：创新是嘉诚的核心竞争力 卓越：标准更是对极致的追求 '

                },
                {
                   referralList:require('../../assets/images/about-04.png'),
                   title:'企业精神',
                   companyAbout:'工匠精神、关注细节、锲而不舍持续改进到极致。 嘉诚认为小事成就大事，细节决定成败。'

                }
            ]
        }
    },
    components:{
       'v-crumbs':Crumbs
    },
}
</script>
<style lang="scss">
    .about .crumbs{
        margin-bottom:0;
    }
    .about-banner{
        width: 100%;
        height: 190px;
        background: url(../../assets/images/about-banner.png) no-repeat 0 0;
    }
    .about-contern{
        margin-top:70px;
        margin-bottom:120px;
        text-align: center;
        background: #fff;
        .about-header{
            h2{
                font-size: 32px;
                color:#000;
            }
            p{
                font-size: 16px;
                color:#666;
                line-height: 35px;
            }
        }
        .about-referral{
            padding:35px 60px 50px;
            border-bottom: 1px dashed #ccc;
            ul{
                display:flex;
                justify-content: space-between;
                li{
                    width:200px;
                    position: relative;
                }
                li + li{
                    margin-left: 100px;
                    
                }
                .about-img{
                    width:100%;
                    height: 150px;
                    text-align: center;
                    img{
                        width: 125px;
                        height: 100%;
                    }
                }
                h3{
                    font-size: 18px;
                    color:#333;
                    font-weight: 700;
                    padding-bottom:15px;
                }
                .border{
                    width:21px;
                    height: 2px;
                    margin: 0 auto;
                    margin-bottom:20px;
                    background: #777777;
                }
                p{
                    color:#666;
                    text-align: left;
                    line-height: 25px;
                }
                .border-left{
                    height: 93px;
                    width: 1px; 
                    background: #ddd;
                    position: absolute;
                    right: -55px;
                    top:60px;
                }
            }
        }
    }
    .about-footer{
        display: flex;
        margin-top:50px;
        padding:0  50px 120px;
        .about-left{
            width:505px;
            height: 333px;
            padding:20px;
            box-shadow: 2px 2px 10px #ccc;
            img{
                width:465px;
                height: 293px;
            }
        }
        .about-right{
            margin-left: 45px;
            text-align:left;
            color:#666;
            line-height: 30px;
            p:nth-child(2){
                margin:35px 0;
            }
        }
    }
</style>