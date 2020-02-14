<template>
  <div class="add">
    <img :src="lcvc_logo" style="width: 100%;">

    <div style="text-align: center;margin-top:100px;">
      <img :src="lcvc_success" style="text-align: center;">
      <div style="margin-top: 20px;">
        <span style="color:#336699;font-size: 20px;">您的疫情已经上报成功</span>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "NewCoronavirusReportSucess",
        data() {
            // const noPicSrc=require('../img/123.jpg');
            return {
                lcvc_logo:require('@/assets/lcvc_logo.jpg'),
                lcvc_success:require('@/assets/success.png')
            };
        }
    };
</script>

<style>

</style>
