<script setup>
import LoginForm from "./login/LoginForm.vue"
</script>
<template>
    <div class="bg">
        <LoginForm />
    </div>
</template>
<style>
.bg {
    width: 100%;
    height: 100vh;
    /* background-image: url('../assets/images/background.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover; */
    background: #36D1DC;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #5B86E5, #36D1DC);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */



    display: flex;
    justify-content: center;
    align-items: center;
}
</style>