<template>
  <q-layout view="lHh Lpr LFF">
    <q-page class="loginPage flex flex-center">  
            <login-comp />
    </q-page>
  </q-layout>
</template>

<script>
import loginComp from 'src/components/loginComp.vue'
export default {
  components: { loginComp },
    data(){
        return{
            login:true,
        }
    }
}
</script>

<style>
.loginPage{
    background-image: url('assets/loginBG.jpg');
    background-size: cover;
}
</style>