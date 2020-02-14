webpackJsonp([0],{C8V7:function(e,t){},FeBl:function(e,t){var r=e.exports={version:"2.6.11"};"number"==typeof __e&&(__e=r)},Ilp1:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("mvHQ"),i=r.n(o),a={name:"NewCoronavirusReport",data:function(){return{lcvc_logo:r("PH53"),showXinxi:!1,outlander:"",form:{},identityOptions:[{label:"学生",value:"student"},{label:"教职工",value:"teacher"}],yesOrNoOptions:[{label:"是",value:"true"},{label:"否",value:"false"}],practiceOptions:[{label:"是",value:"true"},{label:"否",value:"false"}],sexOptions:[{label:"男",value:"男"},{label:"女",value:"女"}],comefromHuBeiOptions:[{label:"是",value:"true"},{label:"否",value:"false"}],comefromWuHanOptions:[{label:"是",value:"true"},{label:"否",value:"false"}],arriveWuHanOptions:[{label:"是",value:"true"},{label:"否",value:"false"}],arriveHuBeiOptions:[{label:"是",value:"true"},{label:"否",value:"false"}],touchHUbeiPersonOptions:[{label:"是",value:"true"},{label:"否",value:"false"}],stayInHubeiOptions:[{label:"是",value:"true"},{label:"否",value:"false"}],confirmIllOptions:[{label:"医院已确诊",value:"true"},{label:"否，身体健康",value:"false"}],myHealthOptions:[{label:"健康",value:"健康"},{label:"发热",value:"发热"},{label:"咳嗽",value:"咳嗽"},{label:"发热和咳嗽",value:"发热和咳嗽"}]}},mounted:function(){this.initForm()},methods:{initForm:function(){this.$set(this.form,"identity",""),this.$set(this.form,"teacherNumber",""),this.$set(this.form,"studentNumber",""),this.$set(this.form,"name",""),this.$set(this.form,"sex",""),this.$set(this.form,"workType",""),this.$set(this.form,"registeredPlace",""),this.$set(this.form,"identityCard",""),this.$set(this.form,"tel",""),this.$set(this.form,"practice",""),this.$set(this.form,"practiceWorkStatus",""),this.$set(this.form,"comefromWuHan",""),this.$set(this.form,"comefromHuBei",""),this.$set(this.form,"arriveHuBei",""),this.$set(this.form,"arriveWuHan",""),this.$set(this.form,"comeFromGZHH",""),this.$set(this.form,"arriveGZHH",""),this.$set(this.form,"province",""),this.$set(this.form,"arriveLiuZhou",""),this.$set(this.form,"leaveLiuZhou",""),this.$set(this.form,"epidemicArea",""),this.$set(this.form,"addressInLiuZhou",""),this.$set(this.form,"leaveHubei",""),this.$set(this.form,"leaveHubeiWay",""),this.$set(this.form,"leaveTogetherPersonName",""),this.$set(this.form,"manageMethods",""),this.$set(this.form,"touchHuBeiPerson",""),this.$set(this.form,"touchHuBeiPersonName",""),this.$set(this.form,"touchHuBeiTime",""),this.$set(this.form,"touchHuBeiDescription",""),this.$set(this.form,"schoolClass",""),this.$set(this.form,"confirmIll",""),this.$set(this.form,"myHealth",""),this.$set(this.form,"myfamilyHealth",""),this.$set(this.form,"intro",""),this.$set(this.form,"stayInHubei","")},changeIdentity:function(e){var t=this;""==this.form.name&&""==this.form.teacherNumber&&""==this.form.studentNumber||this.$messagebox.confirm("切换身份选项将丢失所有填表的信息，是否确认切换?").then(function(r){t.initForm(),t.$set(t.form,"identity",e),t.showXinxi=!1}).catch(function(r){"cancel"==r&&(t.form.identity="teacher"==e?"student":"teacher")})},checkCard:function(){"teacher"==this.form.identity&&this.getTeacher(),"student"==this.form.identity&&this.getStudent()},getTeacher:function(){var e=this;this.form.teacherNumber.length>=5?this.$axios.get("/api/frontdesk/teacher/"+this.form.teacherNumber).then(function(t){var r=t.data;if(0===r.code){var o=r.data;null!=o?(e.showXinxi=!0,e.form.name=o.name,e.form.sex=o.sex,e.form.tel=o.tel,e.form.identityCard=o.identityCard):(e.showXinxi=!1,e.$toast("教师号不正确"))}else e.$toast(r.msg)}).catch(function(e){console.log(e)}):this.$toast("请输入至少5个字符以上")},getStudent:function(){var e=this;this.form.studentNumber.length>=5?this.$axios.get("/api/frontdesk/student/"+this.form.studentNumber).then(function(t){var r=t.data;if(0===r.code){var o=r.data;null!=r.data?(e.showXinxi=!0,e.form.name=o.name,e.form.sex=o.sex,e.form.tel=o.tel,e.form.schoolClass=o.schoolClass,e.form.identityCard=o.identityCard):(e.showXinxi=!1,e.$toast("学生号不正确"))}else e.$toast(r.msg)}).catch(function(e){console.log(e)}):this.$toast("请输入至少5个字符以上")},outlanderChange:function(e){"true"==e?(this.form.arriveWuHan="",this.form.arriveHuBei="",this.form.arriveGZHH=""):"false"==e&&(this.form.comefromHuBei="",this.form.comefromWuHan="",this.form.comeFromGZHH="")},submitForm:function(){var e=this,t=!0;"true"==this.outlander?(this.form.arriveWuHan="false",this.form.arriveHuBei="false",this.form.arriveGZHH="false"):"false"==this.outlander?(this.form.comefromHuBei="false",this.form.comefromWuHan="false",this.form.comeFromGZHH="false"):(t=!1,this.$toast("必须选择是否是市外人员")),t&&this.$axios.post("/api/frontdesk/questionnaire",i()(this.form)).then(function(t){var r=t.data;console.log(t.data),0==r.code?e.$messagebox("提示","提交成功,谢谢您的参与").then(function(t){e.$router.push("/frontdesk/NewCoronavirusReportSucess")}):e.$toast(r.msg)})}}},s={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"add"},[r("img",{staticStyle:{width:"100%"},attrs:{src:e.lcvc_logo}}),e._v(" "),r("mt-cell",{attrs:{title:"请问您的身份是"}}),e._v(" "),r("mt-radio",{attrs:{id:"idRadio",options:e.identityOptions},on:{change:e.changeIdentity},model:{value:e.form.identity,callback:function(t){e.$set(e.form,"identity",t)},expression:"form.identity"}}),e._v(" "),"teacher"==e.form.identity?[r("mt-cell",{attrs:{title:"请输入您的工号"}}),e._v(" "),r("mt-field",{attrs:{placeholder:"工号"},model:{value:e.form.teacherNumber,callback:function(t){e.$set(e.form,"teacherNumber",t)},expression:"form.teacherNumber"}},[r("mt-button",{staticStyle:{padding:"0 10px"},attrs:{type:"primary",plain:"",size:"small"},on:{click:function(t){return e.checkCard()}}},[e._v("验证")])],1)]:e._e(),e._v(" "),"student"==e.form.identity?[r("mt-cell",{attrs:{title:"请输入您的学号："}}),e._v(" "),r("mt-field",{attrs:{placeholder:"学号"},model:{value:e.form.studentNumber,callback:function(t){e.$set(e.form,"studentNumber",t)},expression:"form.studentNumber"}},[r("mt-button",{staticStyle:{padding:"0 10px"},attrs:{type:"primary",plain:"",size:"small"},on:{click:function(t){return e.checkCard()}}},[e._v("验证")])],1)]:e._e(),e._v(" "),e.showXinxi?[r("mt-cell",{attrs:{title:"您的姓名："}}),e._v(" "),r("mt-field",{attrs:{disabled:""},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}}),e._v(" "),r("mt-cell",{attrs:{title:"您的性别："}}),e._v(" "),r("mt-field",{attrs:{disabled:""},model:{value:e.form.sex,callback:function(t){e.$set(e.form,"sex",t)},expression:"form.sex"}}),e._v(" "),r("mt-cell",{attrs:{title:"您的身份证："}}),e._v(" "),r("mt-field",{attrs:{placeholder:"请输入"},model:{value:e.form.identityCard,callback:function(t){e.$set(e.form,"identityCard",t)},expression:"form.identityCard"}}),e._v(" "),r("mt-cell",{attrs:{title:"本人手机号："}}),e._v(" "),r("mt-field",{attrs:{placeholder:"请输入手机号码"},model:{value:e.form.tel,callback:function(t){e.$set(e.form,"tel",t)},expression:"form.tel"}}),e._v(" "),"teacher"==e.form.identity?[r("mt-cell",{attrs:{title:"请输入您的岗位或所授学科"}}),e._v(" "),r("mt-radio",{attrs:{options:["专任教师","行政人员"]},model:{value:e.form.workType,callback:function(t){e.$set(e.form,"workType",t)},expression:"form.workType"}})]:e._e(),e._v(" "),"student"==e.form.identity?[r("mt-cell",{attrs:{title:"年级班级（专业）:"}}),e._v(" "),r("mt-field",{attrs:{placeholder:"请输入",disabled:""},model:{value:e.form.schoolClass,callback:function(t){e.$set(e.form,"schoolClass",t)},expression:"form.schoolClass"}}),e._v(" "),r("mt-cell",{attrs:{title:"您是否正在参加顶岗实习（实习生）："}}),e._v(" "),r("mt-radio",{attrs:{options:e.practiceOptions},model:{value:e.form.practice,callback:function(t){e.$set(e.form,"practice",t)},expression:"form.practice"}}),e._v(" "),"true"==e.form.practice?[r("mt-cell",{attrs:{title:"请选择您当前的实习情况"}}),e._v(" "),r("mt-radio",{attrs:{options:["在家休息","在宿舍休息","在家远程上班","在单位上班"]},model:{value:e.form.practiceWorkStatus,callback:function(t){e.$set(e.form,"practiceWorkStatus",t)},expression:"form.practiceWorkStatus"}})]:e._e()]:e._e(),e._v(" "),r("mt-cell",{attrs:{title:"当天本人健康状况："}}),e._v(" "),r("mt-radio",{attrs:{options:e.myHealthOptions},model:{value:e.form.myHealth,callback:function(t){e.$set(e.form,"myHealth",t)},expression:"form.myHealth"}}),e._v(" "),r("mt-cell",{attrs:{title:"当天家庭成员健康状况："}}),e._v(" "),r("mt-radio",{attrs:{options:e.myHealthOptions},model:{value:e.form.myfamilyHealth,callback:function(t){e.$set(e.form,"myfamilyHealth",t)},expression:"form.myfamilyHealth"}}),e._v(" "),r("mt-cell",{attrs:{title:"是否为疑似病例或确诊病例:"}}),e._v(" "),r("mt-radio",{attrs:{options:e.confirmIllOptions},model:{value:e.form.confirmIll,callback:function(t){e.$set(e.form,"confirmIll",t)},expression:"form.confirmIll"}}),e._v(" "),r("mt-cell",{attrs:{title:"是否为市外人员（回到柳州市不到半年）:"}}),e._v(" "),r("mt-radio",{attrs:{options:e.yesOrNoOptions},on:{change:e.outlanderChange},model:{value:e.outlander,callback:function(t){e.outlander=t},expression:"outlander"}}),e._v(" "),"true"==e.outlander?[r("mt-cell",{attrs:{title:"是否来自湖北省(不包括武汉市)："}}),e._v(" "),r("mt-radio",{attrs:{options:e.comefromHuBeiOptions},model:{value:e.form.comefromHuBei,callback:function(t){e.$set(e.form,"comefromHuBei",t)},expression:"form.comefromHuBei"}}),e._v(" "),r("mt-cell",{attrs:{title:"是否来自武汉市："}}),e._v(" "),r("mt-radio",{attrs:{options:e.comefromWuHanOptions},model:{value:e.form.comefromWuHan,callback:function(t){e.$set(e.form,"comefromWuHan",t)},expression:"form.comefromWuHan"}}),e._v(" "),r("mt-cell",{attrs:{title:"是否来自广东、浙江、河南、湖南省："}}),e._v(" "),r("mt-radio",{attrs:{options:e.yesOrNoOptions},model:{value:e.form.comeFromGZHH,callback:function(t){e.$set(e.form,"comeFromGZHH",t)},expression:"form.comeFromGZHH"}})]:e._e(),e._v(" "),"false"==e.outlander?[r("mt-cell",{attrs:{title:"1月25日后，是否去过湖北(不包括武汉市)："}}),e._v(" "),r("mt-radio",{attrs:{options:e.arriveHuBeiOptions},model:{value:e.form.arriveHuBei,callback:function(t){e.$set(e.form,"arriveHuBei",t)},expression:"form.arriveHuBei"}}),e._v(" "),r("mt-cell",{attrs:{title:"1月25日后，是否到过武汉："}}),e._v(" "),r("mt-radio",{attrs:{options:e.arriveWuHanOptions},model:{value:e.form.arriveWuHan,callback:function(t){e.$set(e.form,"arriveWuHan",t)},expression:"form.arriveWuHan"}}),e._v(" "),r("mt-cell",{attrs:{title:"1月25日后，是否到过广东、浙江、河南、湖南省："}}),e._v(" "),r("mt-radio",{attrs:{options:e.yesOrNoOptions},model:{value:e.form.arriveGZHH,callback:function(t){e.$set(e.form,"arriveGZHH",t)},expression:"form.arriveGZHH"}})]:e._e(),e._v(" "),"true"==e.form.comeFromGZHH||"true"==e.form.arriveGZHH?[r("mt-cell",{attrs:{title:"请问您在广东、浙江、河南、湖南省的哪些省份呆过："}}),e._v(" "),r("mt-field",{attrs:{placeholder:"请输入"},model:{value:e.form.province,callback:function(t){e.$set(e.form,"province",t)},expression:"form.province"}})]:e._e(),e._v(" "),"true"==e.form.arriveHuBei||"true"==e.form.arriveWuHan||"true"==e.form.comefromHuBei||"true"==e.form.comefromWuHan||"true"==e.form.comeFromGZHH||"true"==e.form.arriveGZHH?[r("mt-cell",{attrs:{title:"离开该省的时间："}}),e._v(" "),r("mt-field",{attrs:{placeholder:"请输入",type:"date"},model:{value:e.form.leaveHubei,callback:function(t){e.$set(e.form,"leaveHubei",t)},expression:"form.leaveHubei"}}),e._v(" "),r("mt-cell",{attrs:{title:"离开该省的方式：车次/航班/汽车/自驾："}}),e._v(" "),r("mt-field",{attrs:{placeholder:"请输入",type:"textarea",rows:"4"},model:{value:e.form.leaveHubeiWay,callback:function(t){e.$set(e.form,"leaveHubeiWay",t)},expression:"form.leaveHubeiWay"}}),e._v(" "),r("mt-cell",{attrs:{title:"离开时同行的人姓名，可以多写："}}),e._v(" "),r("mt-field",{attrs:{placeholder:"请输入"},model:{value:e.form.leaveTogetherPersonName,callback:function(t){e.$set(e.form,"leaveTogetherPersonName",t)},expression:"form.leaveTogetherPersonName"}}),e._v(" "),r("mt-cell",{attrs:{title:"回柳的时间："}}),e._v(" "),r("mt-field",{attrs:{placeholder:"请输入",type:"date"},model:{value:e.form.arriveLiuZhou,callback:function(t){e.$set(e.form,"arriveLiuZhou",t)},expression:"form.arriveLiuZhou"}}),e._v(" "),r("mt-cell",{staticStyle:{"line-height":"50px"},attrs:{title:"有没有管控措施（如居家隔离，是否有社区每日随访、是否有外出买菜、下楼活动等情况）："}}),e._v(" "),r("mt-field",{attrs:{placeholder:"请输入"},model:{value:e.form.manageMethods,callback:function(t){e.$set(e.form,"manageMethods",t)},expression:"form.manageMethods"}})]:e._e(),e._v(" "),"true"==e.form.arriveHuBei||"true"==e.form.arriveWuHan?[r("mt-cell",{attrs:{title:"现在是否仍在湖北出差、休假、旅游、探亲等短时停留："}}),e._v(" "),r("mt-radio",{attrs:{options:e.stayInHubeiOptions},model:{value:e.form.stayInHubei,callback:function(t){e.$set(e.form,"stayInHubei",t)},expression:"form.stayInHubei"}}),e._v(" "),"true"==e.form.stayInHubei?[r("mt-cell",{attrs:{title:"离开柳州的时间："}}),e._v(" "),r("mt-field",{attrs:{placeholder:"请输入",type:"date"},model:{value:e.form.leaveLiuZhou,callback:function(t){e.$set(e.form,"leaveLiuZhou",t)},expression:"form.leaveLiuZhou"}}),e._v(" "),r("mt-cell",{attrs:{title:"疫区居住地:"}}),e._v(" "),r("mt-field",{attrs:{placeholder:"请输入"},model:{value:e.form.epidemicArea,callback:function(t){e.$set(e.form,"epidemicArea",t)},expression:"form.epidemicArea"}})]:e._e()]:e._e(),e._v(" "),r("mt-cell",{attrs:{title:"当天是否密切接触来自或到达过武汉及湖北其他地区人员："}}),e._v(" "),r("mt-radio",{attrs:{options:e.touchHUbeiPersonOptions},model:{value:e.form.touchHuBeiPerson,callback:function(t){e.$set(e.form,"touchHuBeiPerson",t)},expression:"form.touchHuBeiPerson"}}),e._v(" "),"true"==e.form.touchHuBeiPerson?[r("mt-cell",{attrs:{title:"接触过疫区人员的姓名："}}),e._v(" "),r("mt-field",{attrs:{placeholder:"请输入"},model:{value:e.form.touchHuBeiPersonName,callback:function(t){e.$set(e.form,"touchHuBeiPersonName",t)},expression:"form.touchHuBeiPersonName"}}),e._v(" "),r("mt-cell",{attrs:{title:"密切接触的时间:"}}),e._v(" "),r("mt-field",{attrs:{placeholder:"请输入",type:"date"},model:{value:e.form.touchHuBeiTime,callback:function(t){e.$set(e.form,"touchHuBeiTime",t)},expression:"form.touchHuBeiTime"}}),e._v(" "),r("mt-cell",{attrs:{title:"密切接触过程的具体描述:"}}),e._v(" "),r("mt-field",{attrs:{placeholder:"请输入"},model:{value:e.form.touchHuBeiDescription,callback:function(t){e.$set(e.form,"touchHuBeiDescription",t)},expression:"form.touchHuBeiDescription"}})]:void 0,e._v(" "),"true"==e.form.arriveHuBei||"true"==e.form.arriveWuHan||"true"==e.form.arriveGZHH?[r("mt-cell",{attrs:{title:"您的户口所在地："}}),e._v(" "),r("mt-field",{attrs:{placeholder:"请输入"},model:{value:e.form.registeredPlace,callback:function(t){e.$set(e.form,"registeredPlace",t)},expression:"form.registeredPlace"}})]:e._e(),e._v(" "),"true"==e.form.arriveHuBei||"true"==e.form.arriveWuHan||"true"==e.form.comefromHuBei||"true"==e.form.comefromWuHan||"true"==e.form.touchHuBeiPerson||"true"==e.form.comeFromGZHH||"true"==e.form.arriveGZHH?[r("mt-cell",{attrs:{title:"柳州居住地："}}),e._v(" "),r("mt-field",{attrs:{placeholder:"请输入"},model:{value:e.form.addressInLiuZhou,callback:function(t){e.$set(e.form,"addressInLiuZhou",t)},expression:"form.addressInLiuZhou"}})]:e._e(),e._v(" "),r("mt-cell",{attrs:{title:"其他说明："}}),e._v(" "),r("mt-field",{attrs:{placeholder:"请输入"},model:{value:e.form.intro,callback:function(t){e.$set(e.form,"intro",t)},expression:"form.intro"}}),e._v(" "),r("mt-button",{attrs:{type:"primary",size:"large"},on:{click:function(t){return e.submitForm()}}},[e._v("提交")])]:e._e()],2)},staticRenderFns:[]};var l=r("VU/8")(a,s,!1,function(e){r("C8V7")},null,null);t.default=l.exports},PH53:function(e,t,r){e.exports=r.p+"static/img/lcvc_logo.a551e38.jpg"},mvHQ:function(e,t,r){e.exports={default:r("qkKv"),__esModule:!0}},qkKv:function(e,t,r){var o=r("FeBl"),i=o.JSON||(o.JSON={stringify:JSON.stringify});e.exports=function(e){return i.stringify.apply(i,arguments)}}});
//# sourceMappingURL=0.6c8153226a9dfb058303.js.map