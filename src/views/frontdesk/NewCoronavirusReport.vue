<template>
  <div class="add">
    <img :src="lcvc_logo" style="width: 100%;">
    <!-- <div id="tp">
      <img :src="noPic4Src"  style="height:180px;"/>
    </div>-->
   <!-- <mt-header title="柳州城市职业学院"></mt-header>-->
    <!-- //基本信息 -->
    <mt-cell title="请问您的身份是"></mt-cell>
    <mt-radio id="idRadio" :options="identityOptions" v-model="form.identity" @change="changeIdentity"></mt-radio>
    <template v-if="form.identity=='teacher'">
      <mt-cell title="请输入您的工号"></mt-cell>
      <!--@blur.native.capture="checkCard"-->
      <mt-field
        placeholder="工号"
        v-model="form.teacherNumber"
      >
        <mt-button type="primary" plain size="small"  style="padding: 0 10px"  @click="checkCard()">验证</mt-button>
      </mt-field>
    </template>
    <template v-if="form.identity=='student'">
      <mt-cell title="请输入您的学号："></mt-cell>
      <mt-field
        placeholder="学号"
        v-model="form.studentNumber"
      >
        <mt-button type="primary"  plain size="small"  style="padding: 0 10px" @click="checkCard()">验证</mt-button>
      </mt-field>
    </template>

    <template v-if="showXinxi">
      <!-- //表单取消下面字段填写，由数据库直接获取 -->
      <mt-cell title="您的姓名："></mt-cell>
      <mt-field  v-model="form.name" disabled></mt-field>

      <mt-cell title="您的性别："></mt-cell>
      <mt-field  v-model="form.sex" disabled></mt-field>

      <mt-cell title="您的身份证："></mt-cell>
      <mt-field  placeholder="请输入" v-model="form.identityCard"></mt-field>

      <mt-cell title="本人手机号："></mt-cell>
      <mt-field  placeholder="请输入手机号码" v-model="form.tel"></mt-field>


      <template v-if="form.identity=='teacher'">
        <mt-cell title="所属部门："></mt-cell>
        <mt-field  placeholder="请输入部门" v-model="form.department" disabled></mt-field>
        <mt-cell title="请输入您的岗位或所授学科"></mt-cell>
        <mt-radio v-model="form.workType" :options="['专任教师','行政人员']"></mt-radio>
        <!--<mt-field  placeholder="请输入" v-model="form.workType"></mt-field>-->
      </template>
      <template v-if="form.identity=='student'">
        <mt-cell title="年级班级（专业）:"></mt-cell>
        <mt-field  placeholder="请输入" v-model="form.schoolClass" disabled></mt-field>
        <mt-cell title="您是否正在参加顶岗实习（实习生）："></mt-cell>
        <mt-radio v-model="form.practice" :options="practiceOptions"></mt-radio>
        <template v-if="form.practice=='true'">
          <mt-cell title="请选择您当前的实习情况"></mt-cell>
          <mt-radio v-model="form.practiceWorkStatus" :options="['在家休息','在宿舍休息','在家远程上班','在单位上班']"></mt-radio>
        </template>
      </template>

      <!-- //当天健康情况汇报，以及和另外7个表的重叠 -->
      <mt-cell title="当天本人健康状况："></mt-cell>
      <mt-radio v-model="form.myHealth" :options="myHealthOptions"></mt-radio>
      <!--只要有发热状态-->
      <template  v-if="form.myHealth.search('发热')!= -1">
        <mt-cell title="体温（℃）:"></mt-cell>
        <mt-field  v-model="form.temperature"></mt-field>
      </template>
      <mt-cell title="当天家庭成员健康状况："></mt-cell>
      <mt-radio v-model="form.myfamilyHealth" :options="myHealthOptions"></mt-radio>

      <mt-cell title="是否为疑似病例或确诊病例:"></mt-cell>
      <mt-radio v-model="form.confirmIll" :options="confirmIllOptions"></mt-radio>


        <!-- //来自武汉湖北，或是去过武汉湖北相关字段 -->
        <mt-cell title="是否来自湖北省(不包括武汉市)："></mt-cell>
        <mt-radio v-model="form.comefromHuBei" :options="comefromHuBeiOptions"></mt-radio>
        <mt-cell title="是否来自武汉市："></mt-cell>
        <mt-radio v-model="form.comefromWuHan" :options="comefromWuHanOptions"></mt-radio>
        <mt-cell title="是否来自广东、浙江、河南、湖南省："></mt-cell>
        <mt-radio v-model="form.comeFromGZHH" :options="yesOrNoOptions"></mt-radio>

      <!-- 如果不是市外人员，则询问是否去过外省等地 -->
        <mt-cell title="1月25日后，是否去过湖北(不包括武汉市)："></mt-cell>
        <mt-radio v-model="form.arriveHuBei" :options="arriveHuBeiOptions"></mt-radio>
        <mt-cell title="1月25日后，是否到过武汉："></mt-cell>
        <mt-radio v-model="form.arriveWuHan" :options="arriveWuHanOptions"></mt-radio>
        <mt-cell title="1月25日后，是否到过广东、浙江、河南、湖南省："></mt-cell>
        <mt-radio v-model="form.arriveGZHH" :options="yesOrNoOptions"></mt-radio>

       <!--只要是去过广东、浙江、河南、湖南省的-->
      <template  v-if="form.comeFromGZHH=='true'||form.arriveGZHH=='true'">
        <mt-cell title="请问您在广东、浙江、河南、湖南省的哪些省份呆过："></mt-cell>
        <mt-field  placeholder="请输入" v-model="form.province"></mt-field>
      </template>



      <!--如果是去过湖北或武汉,广东、浙江、河南、湖南省的-->
      <template
        v-if="form.arriveHuBei=='true' || form.arriveWuHan=='true'||form.comefromHuBei=='true' || form.comefromWuHan=='true'||form.comeFromGZHH=='true'||form.arriveGZHH=='true'"
      >
        <mt-cell title="离开该省的时间："></mt-cell>
        <mt-field  placeholder="请输入" v-model="form.leaveHubei" type="date"></mt-field>
        <mt-cell title="离开该省的方式：车次/航班/汽车/自驾："></mt-cell>
        <mt-field
          placeholder="请输入"
          type="textarea"
          rows="4"
          v-model="form.leaveHubeiWay"
        ></mt-field>
        <mt-cell title="离开时同行的人姓名，可以多写："></mt-cell>
        <mt-field placeholder="请输入" v-model="form.leaveTogetherPersonName"></mt-field>
        <mt-cell title="回柳的时间："></mt-cell>
        <mt-field placeholder="请输入" v-model="form.arriveLiuZhou" type="date"></mt-field>
        <mt-cell title="有没有管控措施（如居家隔离，是否有社区每日随访、是否有外出买菜、下楼活动等情况）：" style="line-height: 50px;"></mt-cell>
        <mt-field placeholder="请输入" v-model="form.manageMethods"></mt-field>
      </template>

      <!--去过湖北（含武汉市）、广东、浙江、河南、湖南的话，就要填是否停留在该地-->
      <template v-if="form.arriveHuBei=='true' || form.arriveWuHan=='true'||form.arriveGZHH=='true'">
        <mt-cell title="现在是否仍在湖北（含武汉市）、广东、浙江、河南、湖南出差、休假、旅游、探亲等短时停留："></mt-cell>
        <mt-radio v-model="form.stayInHubei" :options="stayInHubeiOptions"></mt-radio>
        <!--如果停留在湖北（含武汉市）、广东、浙江、河南、湖南的话-->
        <template v-if="form.stayInHubei =='true'">
          <mt-cell title="离开柳州的时间："></mt-cell>
          <mt-field  placeholder="请输入" v-model="form.leaveLiuZhou" type="date"></mt-field>
          <mt-cell title="疫区居住地:"></mt-cell>
          <mt-field  placeholder="请输入" v-model="form.epidemicArea"></mt-field>
        </template>
      </template>


      <mt-cell title="当天是否密切接触来自或到达过武汉及湖北其他地区人员："></mt-cell>
      <mt-radio v-model="form.touchHuBeiPerson" :options="touchHUbeiPersonOptions"></mt-radio>
      <!--只要是密切接触的疫区人员的-->
      <template v-if="form.touchHuBeiPerson=='true'">
        <mt-cell title="接触过疫区人员的姓名："></mt-cell>
        <mt-field placeholder="请输入" v-model="form.touchHuBeiPersonName"></mt-field>
        <mt-cell title="密切接触的时间:"></mt-cell>
        <mt-field  placeholder="请输入" v-model="form.touchHuBeiTime" type="date"></mt-field>
        <mt-cell title="密切接触过程的具体描述:"></mt-cell>
        <mt-field placeholder="请输入" v-model="form.touchHuBeiDescription"></mt-field>
      </template>
      <template v-else></template>

      <!--只要是本地去外省的-->
      <template  v-if="form.arriveHuBei=='true' || form.arriveWuHan=='true'||form.arriveGZHH=='true'">
        <mt-cell title="您的户口所在地："></mt-cell>
        <mt-field  placeholder="请输入" v-model="form.registeredPlace"></mt-field>
      </template>

      <!--只要是符合任何异常情况之一-->
      <template
        v-if="form.myHealth.search('发热')!= -1||form.arriveHuBei=='true' || form.arriveWuHan=='true'||form.comefromHuBei=='true' || form.comefromWuHan=='true' ||form.touchHuBeiPerson=='true'||form.comeFromGZHH=='true'||form.arriveGZHH=='true'"
      >
        <mt-cell title="目前在柳居住地（详细到户号）："></mt-cell>
        <mt-field  placeholder="请输入" v-model="form.addressInLiuZhou"></mt-field>
      </template>

      <mt-cell title="其他说明："></mt-cell>
      <mt-field  placeholder="请输入" v-model="form.intro"></mt-field>


      <mt-button type="primary" size="large" @click="submitForm()">提交</mt-button>
    </template>
  </div>
</template>

<script>
    export default {
        name: "NewCoronavirusReport",
        // components: {
        //     Chart: () => import("@/views/frontdesk/Chart.vue")
        // },
        data() {
            // const noPicSrc=require('../img/123.jpg');
            return {
                lcvc_logo:require('@/assets/lcvc_logo.jpg'),
                showXinxi: false,
                form: {},

                identityOptions: [
                    {
                        label: "学生",
                        value: "student"
                    },
                    {
                        label: "教职工",
                        value: "teacher"
                    }
                ],
                yesOrNoOptions: [//专门用于是否的回答
                    {
                        label: "是",
                        value: "true"
                    },
                    {
                        label: "否",
                        value: "false"
                    }
                ],
                //是否正在实习
                practiceOptions: [
                    {
                        label: "是",
                        value: "true"
                    },
                    {
                        label: "否",
                        value: "false"
                    }
                ],
                sexOptions: [
                    {
                        label: "男",
                        value: "男"
                    },
                    {
                        label: "女",
                        value: "女"
                    }
                ],
                comefromHuBeiOptions: [
                    {
                        label: "是",
                        value: "true"
                    },
                    {
                        label: "否",
                        value: "false"
                    }
                ],
                comefromWuHanOptions: [
                    {
                        label: "是",
                        value: "true"
                    },
                    {
                        label: "否",
                        value: "false"
                    }
                ],
                arriveWuHanOptions: [
                    {
                        label: "是",
                        value: "true"
                    },
                    {
                        label: "否",
                        value: "false"
                    }
                ],
                arriveHuBeiOptions: [
                    {
                        label: "是",
                        value: "true"
                    },
                    {
                        label: "否",
                        value: "false"
                    }
                ],
                touchHUbeiPersonOptions: [
                    {
                        label: "是",
                        value: "true"
                    },
                    {
                        label: "否",
                        value: "false"
                    }
                ],
                //现在是否仍在湖北出差、休假、旅游、探亲等短时停留
                stayInHubeiOptions: [
                    {
                        label: "是",
                        value: "true"
                    },
                    {
                        label: "否",
                        value: "false"
                    }
                ],
                ///是否为疑似病例或确诊病例
                confirmIllOptions: [
                    {
                        label: "医院已确诊",
                        value: "true"
                    },
                    {
                        label: "否，身体健康",
                        value: "false"
                    }
                ],
                myHealthOptions: [
                    {
                        label: "健康",
                        value: "健康"
                    },
                    {
                        label: "发热",
                        value: "发热"
                    },
                    {
                        label: "咳嗽",
                        value: "咳嗽"
                    },
                    {
                        label: "发热和咳嗽",
                        value: "发热和咳嗽"
                    }
                ],
                departmentoptions:['信息工程系','院领导','党政办','党委组织部（人事处）','宣传部','学工处','教科处','招就处','资产管理处','后勤处',
                    '保卫处','计财处','质量办','纪检监察室','院工会（离退办）','院团委','教职员工发展中心','信息技术服务中心','图书馆','经济管理系',
                    '师范系','建筑工程与艺术设计系','机电与汽车工程系','国教院','体育教学部','马院','开放学院','鹿寨分院','病假','其他','新农村第一书记'
                    ,'借调至职教所','借调教育厅']
            };
        },
        mounted() {
            this.initForm();//初始化表单字段和值
        },
        methods: {
            initForm(){//初始化表单
                this.showXinxi=false;//是否显示除了身份，工号/学号外的信息
                this.$set(this.form,'identity',''); //身份
                this.$set(this.form,'teacherNumber',''); //教工号
                this.$set(this.form,'studentNumber',''); //学号
                this.$set(this.form,'name',''); //姓名
                this.$set(this.form,'sex',''); //性别
                this.$set(this.form,'department',''); //部门
                this.$set(this.form,'workType',''); //工种
                this.$set(this.form,'registeredPlace',''); //户口所在地
                this.$set(this.form,'identityCard',''); //身份证号码
                this.$set(this.form,'tel',''); //手机号码
                this.$set(this.form,'practice',''); //顶岗实习
                this.$set(this.form,'practiceWorkStatus','');
                this.$set(this.form,'comefromWuHan',''); //是否来自武汉市
                this.$set(this.form,'comefromHuBei',''); //是否来自湖北
                this.$set(this.form,'arriveHuBei',''); //是否去过湖北省
                this.$set(this.form,'arriveWuHan',''); ////是否来自湖北(不包括武汉市)
                this.$set(this.form,'comeFromGZHH',''); //是否来自广东、浙江、河南、湖南省。
                this.$set(this.form,'arriveGZHH',''); ///是否到过广东、浙江、河南、湖南省。
                this.$set(this.form,'province',''); //如果去过/来自广东、浙江、河南、湖南省等，要填是哪个省份的
                this.$set(this.form,'arriveLiuZhou',''); //到达柳州时间
                this.$set(this.form,'leaveLiuZhou',''); //离开柳州时间
                this.$set(this.form,'epidemicArea',''); //疫区居住地
                this.$set(this.form,'addressInLiuZhou',''); //柳州居住地
                this.$set(this.form,'leaveHubei',''); //离开湖北的时间：
                this.$set(this.form,'leaveHubeiWay',''); //离开湖北的方式
                this.$set(this.form,'leaveTogetherPersonName',''); //离开时同行的人姓名
                this.$set(this.form,'manageMethods',''); //管控措施
                this.$set(this.form,'touchHuBeiPerson',''); //密切接触来自或到达过武汉及湖北其他地区人员
                this.$set(this.form,'touchHuBeiPersonName',''); //接触过疫区人员的姓名
                this.$set(this.form,'touchHuBeiTime',''); //密切接触的时间
                this.$set(this.form,'touchHuBeiDescription',''); //密切接触过程的具体描述
                this.$set(this.form,'schoolClass',''); //年级班级（专业）
                this.$set(this.form,'confirmIll',''); //是否为疑似病例
                this.$set(this.form,'myHealth',''); //当天本人健康状况
                this.$set(this.form,'temperature',''); //发烧多少度，如果发烧的话需要填写
                this.$set(this.form,'myfamilyHealth',''); //当天家庭健康状况
                this.$set(this.form,'intro',''); //其他说明
                this.$set(this.form,'stayInHubei',''); //现在是否仍在湖北出差、休假、旅游
            },
             getForm(data){
                this.$set(this.form,'identity',data.identity); //身份
                this.$set(this.form,'teacherNumber',data.teacherNumber); //教工号
                this.$set(this.form,'studentNumber',data.studentNumber); //学号
                this.$set(this.form,'name',data.name); //姓名
                this.$set(this.form,'sex',data.sex); //性别
                this.$set(this.form,'department',data.department); //部门
                this.$set(this.form,'workType',data.workType); //工种
                this.$set(this.form,'registeredPlace',data.registeredPlace); //户口所在地
                this.$set(this.form,'identityCard',data.identityCard); //身份证号码
                this.$set(this.form,'tel',data.tel); //手机号码
                this.$set(this.form,'practiceWorkStatus',data.practiceWorkStatus);
                //专门处理逻辑字段的赋值
                 this.$set(this.form,'practice',String(data.practice)); //顶岗实习
                 this.$set(this.form,'comefromWuHan',String(data.comefromWuHan)); //是否来自武汉市
                 this.$set(this.form,'comefromHuBei',String(data.comefromHuBei)); //是否来自湖北
                 this.$set(this.form,'arriveHuBei',String(data.arriveHuBei)); //是否去过湖北省
                 this.$set(this.form,'arriveWuHan',String(data.arriveWuHan)); ////是否来自湖北(不包括武汉市)
                 this.$set(this.form,'comeFromGZHH',String(data.comeFromGZHH)); //是否来自广东、浙江、河南、湖南省。
                 this.$set(this.form,'arriveGZHH',String(data.arriveGZHH)); ///是否到过广东、浙江、河南、湖南省。
                 this.$set(this.form,'stayInHubei',String(data.stayInHubei)); //现在是否仍在湖北出差、休假、旅游
                 this.$set(this.form,'confirmIll',String(data.confirmIll)); //是否为疑似病例
                 this.$set(this.form,'touchHuBeiPerson',String(data.touchHuBeiPerson)); //密切接触来自或到达过武汉及湖北其他地区人员

                this.$set(this.form,'province',data.province); //如果去过/来自广东、浙江、河南、湖南省等，要填是哪个省份的
                this.$set(this.form,'arriveLiuZhou',data.arriveLiuZhou); //到达柳州时间
                this.$set(this.form,'leaveLiuZhou',data.leaveLiuZhou); //离开柳州时间
                this.$set(this.form,'epidemicArea',data.epidemicArea); //疫区居住地
                this.$set(this.form,'addressInLiuZhou',data.addressInLiuZhou); //柳州居住地
                this.$set(this.form,'leaveHubei',data.leaveHubei); //离开湖北的时间：
                this.$set(this.form,'leaveHubeiWay',data.leaveHubeiWay); //离开湖北的方式
                this.$set(this.form,'leaveTogetherPersonName',data.leaveTogetherPersonName); //离开时同行的人姓名
                this.$set(this.form,'manageMethods',data.manageMethods); //管控措施
                this.$set(this.form,'touchHuBeiPersonName',data.touchHuBeiPersonName); //接触过疫区人员的姓名
                this.$set(this.form,'touchHuBeiTime',data.touchHuBeiTime); //密切接触的时间
                this.$set(this.form,'touchHuBeiDescription',data.touchHuBeiDescription); //密切接触过程的具体描述
                this.$set(this.form,'schoolClass',data.schoolClass); //年级班级（专业）
                this.$set(this.form,'myHealth',data.myHealth); //当天本人健康状况
                this.$set(this.form,'temperature',data.temperature); //发烧多少度，如果发烧的话需要填写
                this.$set(this.form,'myfamilyHealth',data.myfamilyHealth); //当天家庭健康状况
                this.$set(this.form,'intro',data.intro); //其他说明

            },
            changeIdentity(val){//当改变学生或教师身份时.val为当前的值
                if(this.form.name!=''||this.form.teacherNumber!=''||this.form.studentNumber!=''){//这里仅通过名字判断，该用户是否已经从服务端获取了自己的信息
                    this.$messagebox.confirm('切换身份选项将丢失所有填表的信息，是否确认切换?').
                    then(action => {
                        this.initForm();//清空表单信息
                        this.$set(this.form,'identity',val);//赋予当前的身份值
                        this.showXinxi = false;
                    }).catch(error =>{//点击取消
                        if(error == 'cancel'){
                            if(val=='teacher'){//如果当前值是教师
                                this.form.identity='student';//将其变回学生
                            }else{//如果当前值是学生
                                this.form.identity='teacher';//将其变回学生
                            }
                        }
                    });
                }
            },
            checkCard() { //根据学号或工号显示后面的字段
                if(this.form.identity=='teacher'){
                    this.getTeacher();
                }
                if(this.form.identity=='student'){
                    this.getStudent();
                }
            },
            getTeacher() {
                if(this.form.teacherNumber.length>=5){//只有在一定长度是才读取
                    this.$axios
                        .get("/api/frontdesk/teacher/" + this.form.teacherNumber)
                        .then(response => {
                            //获取返回数据/
                            let msg = response.data;
                            if (msg.code === 0) {
                                let teacher=msg.data;
                                if(teacher!=null){//如果读取到教师记录
                                    this.showXinxi = true;
                                    this.form.tel=teacher.tel;
                                    this.form.identityCard=teacher.identityCard;
                                    //这个以教师表的为准，如果被覆盖后面要加上
                                    this.$set(this.form,'name',teacher.name); //姓名
                                    this.$set(this.form,'sex',teacher.sex); //性别
                                    this.$set(this.form,'department',teacher.department); //部门
                                    this.getQuestionnaire(teacher);//读取上次调查表的信息，如果能读取到，则覆盖当前表单所有信息
                                }else{//如果没有读取到教师记录
                                    this.showXinxi = false;
                                    this.$toast('教师号不正确');;
                                }
                            } else {
                                this.$toast(msg.msg);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }else{
                    this.$toast('请输入至少5个字符以上');;
                }
            },
            getStudent() {
                if(this.form.studentNumber.length>=5){//只有在一定长度是才读取
                    this.$axios
                        .get("/api/frontdesk/student/" + this.form.studentNumber)
                        .then(response => {
                            //获取返回数据/
                            let msg = response.data;
                            if (msg.code === 0) {
                                let student=msg.data;
                                if(msg.data!=null){//如果读取到学生记录
                                    this.showXinxi = true;
                                    this.form.name=student.name;
                                    this.form.sex=student.sex;
                                    this.form.tel=student.tel;
                                    this.form.schoolClass=student.schoolClass;
                                    this.form.identityCard=student.identityCard;
                                }else{//如果没有读取到学生记录
                                    this.showXinxi = false;
                                    this.$toast('学生号不正确');;
                                }
                            } else {
                                this.$toast(msg.msg);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }else{
                    this.$toast('请输入至少5个字符以上');;
                }
            },
            getQuestionnaire(data) {//读取昨天回答的调查问卷。data为传递过来的教师或老师数据
                this.$axios
                    .get("/api/frontdesk/questionnaire/yesterday",{//读取上次的调查问卷
                        params: {
                            identity:this.form.identity,
                            teacherOrStudentNumber:this.form.teacherNumber,
                        }
                    })
                    .then(response => {
                        //获取返回数据/
                        let msg = response.data;
                        if (msg.code === 0) {
                            let questionnaire=msg.data;
                            if(questionnaire!=null){//如果能读取到昨天的记录
                                this.$messagebox.confirm('系统检测到您昨天上报过数据，是否读取上次数据作为本次上报的内容?').
                                then(action => {
                                    //this.form=Object.assign(this.form,  questionnaire);//把读取到的记录加载过来
                                    this.$messagebox("提示","已经成功加载上次填报内容。由于每天调查表内容都可能变动，请您在提交前务必重新核对数据，谢谢合作")
                                    if(this.form.identity=='teacher'){
                                        questionnaire.department=data.department;//这个以教师表的为准，不被覆盖。因为该字段是第一次填写，原调查表内容为空，以后删除。
                                    }
                                    this.getForm(questionnaire);//把读取到的记录加载到本次表单
                                });
                            }
                        } else {
                            this.$toast(msg.msg);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            submitForm() {//将更新后的值传到服务端保存
                let validate=true;//默认验证通过
                //表单数据重新整理

                if(validate){//如果验证通过
                    //提交表单事件
                    this.$axios
                        .post("/api/frontdesk/questionnaire", JSON.stringify(this.form))
                        .then(response => {
                            //获取返回数据
                            let msg = response.data;
                            console.log(response.data)
                            if (msg.code == 0) {
                                //如果提交成功
                                this.$messagebox("提示","提交成功,谢谢您的参与").
                                then(action => {
                                    //跳转到成功并感谢页面
                                    this.$router.push("/frontdesk/NewCoronavirusReportSucess");
                                });
                            } else {
                                //如果提交失败
                                this.$toast(msg.msg);
                            }
                        });
                }
            }
        }
    };
</script>

<style>
  /* #tp {
    margin-top: -50px;
    margin-bottom: 10px;
    width: 100%;
    height: 200px;
    z-index: 999;
    background: url(../img/1.png) 0 0 no-repeat;
    background-size: cover;
  } */
  /*.add {
    text-align: left;
    margin-top: -50px;
  }*/
  /*取消mt-cell的上下划线样式*/
  /* .mint-cell-wrapper {
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(#fff),
      color-stop(50%, #fff),
      color-stop(50%, transparent)
    ) !important;
  }
  #nameCell {
    background-image: -webkit-gradient(
      linear,
      left bottom,
      left top,
      from(#51d7c2),
      color-stop(5%, #51d7c2),
      color-stop(10%, transparent)
    ) !important;
    background-repeat: repeat;
    background-size: cover !important;
  }
  #jsCell {
    background-image: -webkit-gradient(
      linear,
      left bottom,
      left top,
      from(#51d7c2),
      color-stop(80%, #51d7c2),
      color-stop(10%, transparent)
    ) !important;
    background-repeat: repeat;
    background-size: cover !important;
  } */
</style>
