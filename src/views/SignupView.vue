<template>
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
      <SideView />
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            required
            v-model="emailSignUp"
          />
          <label class="formControls_label" for="name">您的暱稱</label>
          <input
            class="formControls_input"
            type="text"
            name="name"
            id="name"
            placeholder="請輸入您的暱稱"
            v-model="nickname"
          />
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            required
            v-model="passwordSignUp"
          />
          <label class="formControls_label" for="pwd">再次輸入密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請再次輸入密碼"
            required
            v-model="repasswordSignUp"
          />
          <input
            class="formControls_btnSubmit"
            type="button"
            value="註冊帳號"
            @click.prevent="handleSignup"
          />
          <RouterLink to="/signin" class="formControls_btnLink">登入</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import SideView from './SideView.vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

// 初始化 Vue Router 來進行路由跳轉
const router = useRouter()

const api = 'https://todolist-api.hexschool.io'

const emailSignUp = ref('')
const passwordSignUp = ref('')
const repasswordSignUp = ref('')
const nickname = ref('')
const messageSignUp = ref('')
const isErrorSignUp = ref(false)

const handleSignup = () => {
  if (
    passwordSignUp.value === repasswordSignUp.value &&
    emailSignUp.value.trim() &&
    nickname.value.trim()
  ) {
    signUp()
  } else {
    Swal.fire({
      icon: 'warning',
      title: '訊息',
      text: 'EMail空白、暱稱空白或密碼輸入不一致請再次確認',
      timer: 2000,
      timerProgressBar: true
    })
  }
}

const signUp = async () => {
  try {
    const response = await axios.post(`${api}/users/sign_up`, {
      email: emailSignUp.value,
      password: passwordSignUp.value,
      nickname: nickname.value
    })
    messageSignUp.value = '註冊成功. UID: ' + response.data.uid
    isErrorSignUp.value = false
    Swal.fire({
      icon: 'success',
      title: '訊息',
      text: messageSignUp.value,
      timer: 2000,
      timerProgressBar: true
    })
    router.push('/')
  } catch (error) {
    messageSignUp.value = '註冊失敗: ' + error.response.data.message
    isErrorSignUp.value = true
    Swal.fire({
      icon: 'error',
      title: '訊息',
      text: messageSignUp.value,
      timer: 2000,
      timerProgressBar: true
    })
  }
}
</script>
