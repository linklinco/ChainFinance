<template>
    <div class="common-layout">
        <el-container class=" login-main">
            <el-aside class="left"></el-aside>
            <el-main>
                <LoginForm>
                </LoginForm>
            </el-main>
        </el-container>
    </div>
</template>
<script setup>
import LoginForm from "./LoginTables.vue"
</script>
<style>
.duiqi {
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-main {
    background: #fff;
    box-sizing: border-box;
    width: 70vw;
    height: 90vh;
    /* margin-top: 10vh; */
    border-radius: 32px;
    /* padding: 30px; */
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.left {
    padding: 20px;
    width: 30%;
    height: 100%;
    background: url("../../assets/images/logo.png") no-repeat 50% 0 / 70%,
        url("../../assets/images/cuc.jpg") no-repeat bottom / 100%;
    background-color: rgb(39, 52, 131);
    border-radius: 32px 0px 0px 32px;
}

.login-form {
    width: 60vw;
    margin: 30px;
}
</style>
