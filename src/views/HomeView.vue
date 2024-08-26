<script setup>
import axios from 'axios'
import { ref } from 'vue'
import SideView from './SideView.vue'

const api = 'https://todolist-api.hexschool.io'

const emailSignIn = ref('')
const passwordSignIn = ref('')

const responseMessage = ref('')
const isErrorMessage = ref(false)
const token = ref('')

const signIn = async () => {
  try {
    const response = await axios.post(`${api}/users/sign_in`, {
      email: emailSignIn.value,
      password: passwordSignIn.value
    })
    // console.log(response.data)
    responseMessage.value = '登入成功'
    token.value = response.data.token
    //document.cookie = response.data.token
    document.cookie = `hexschoolTodo=${response.data.token};`
  } catch (error) {
    //console.log(error.response.data)
    isErrorMessage.value = error.response.data.status
    responseMessage.value = '登入失敗: ' + error.response.data.message
    token.value = ''
  }
}
</script>

<template>
  <!-- login_page -->
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
      <SideView />
      <div>
        <form class="formControls" action="index.html">
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
            @click.prevent="signIn"
          />
          <template v-if="responseMessage">
            <p
              class="h3"
              :class="{
                'mt-3': true,
                'text-danger': isErrorMessage,
                'text-success': !isErrorMessage
              }"
            >
              {{ responseMessage }}
            </p>
          </template>
          <a class="formControls_btnLink" href="#signup">註冊帳號</a>
        </form>
      </div>
    </div>
  </div>
</template>
