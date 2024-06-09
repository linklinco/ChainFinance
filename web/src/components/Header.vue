<template>
  <el-menu class="el-menu-demo " mode="horizontal" :ellipsis="false" @select="handleSelect">

    <div class="logo"></div>
    <div class="flex-grow" />
    <el-menu-item index="11">运营监控</el-menu-item>
    <el-sub-menu index="21">
      <template #title>个人中心</template>
      <el-menu-item index="21-1">信息修改</el-menu-item>
      <el-menu-item index="21-2">切换账户</el-menu-item>
      <el-menu-item index="21-3">
        <router-link to="/login">退出登录</router-link>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}

.logo {
  background-image: url("../assets/images/logo-blue.png");
  width: 200px;
  height: 60px;
  margin-left: -20px;
  background-position: center;
  background-size: cover;
}
</style>
