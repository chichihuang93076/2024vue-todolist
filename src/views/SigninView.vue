<script setup>
import axios from 'axios'
import { ref } from 'vue'
import SideView from './SideView.vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

// 初始化 Vue Router 來進行路由跳轉
const router = useRouter()

const api = 'https://todolist-api.hexschool.io'

const emailSignIn = ref('')
const passwordSignIn = ref('')

const responseMessage = ref('')
const isErrorMessage = ref(false)
let token = ''

const handleSignin = () => {
  if (emailSignIn.value.trim() && passwordSignIn.value.trim()) {
    signIn()
  } else {
    Swal.fire({
      icon: 'warning',
      title: '訊息',
      text: 'EMail或密碼空白請輸入',
      timer: 5000,
      timerProgressBar: true
    })
  }
}

const signIn = async () => {
  try {
    const response = await axios.post(`${api}/users/sign_in`, {
      email: emailSignIn.value,
      password: passwordSignIn.value
    })
    // console.log(response.data)
    responseMessage.value = '登入成功'
    token = response.data.token
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    document.cookie = `hexschoolTodo=${token}; expires=${tomorrow.toUTCString()}`

    Swal.fire({
      icon: 'success',
      title: '訊息',
      text: responseMessage.value,
      timer: 2000,
      timerProgressBar: true
    })

    router.push('/todo')
  } catch (error) {
    //console.log(error.response.data)
    isErrorMessage.value = error.response.data.status
    responseMessage.value = '登入失敗: ' + error.response.data.message
    token = ''
    Swal.fire({
      icon: 'warning',
      title: '訊息',
      text: responseMessage.value,
      timer: 2000,
      timerProgressBar: true
    })
  }
}
</script>

<template>
  <!-- login_page -->
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
      <SideView />
      <div>
        <form class="formControls">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            required
            v-model="emailSignIn"
          />
          <span>此欄位不可留空</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            required
            v-model="passwordSignIn"
          />
          <input
            class="formControls_btnSubmit"
            type="button"
            value="登入"
            @click.prevent="handleSignin"
          />
          <template v-if="responseMessage">
            <p
              class="h3"
              :class="{
                'mt-3': true,
                'text-danger': isErrorMessage,
                'text-success': !isErrorMessage
              }"
            ></p>
          </template>
          <RouterLink to="/signup" class="formControls_btnLink link-underlined"
            >註冊帳號</RouterLink
          >
        </form>
      </div>
    </div>
  </div>
</template>
