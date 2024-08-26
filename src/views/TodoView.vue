<template>
  <!-- ToDo List -->
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <a href="#"
            ><span>{{ username }}的代辦</span></a
          >
        </li>
        <li><a @click="signOut">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input type="text" placeholder="請輸入待辦事項" v-model="newTodo" />
          <a @click="addTodo">
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <div class="todoList_list">
          <ul class="todoList_tab">
            <li>
              <a
                :class="{ active: tabStatus === '全部' }"
                name="全部"
                @click="handleTabStatus('全部')"
                >全部</a
              >
            </li>
            <li>
              <a
                :class="{ active: tabStatus === '待完成' }"
                name="待完成"
                @click="handleTabStatus('待完成')"
                >待完成</a
              >
            </li>
            <li>
              <a
                :class="{ active: tabStatus === '已完成' }"
                name="已完成"
                @click="handleTabStatus('已完成')"
                >已完成</a
              >
            </li>
          </ul>
          <div class="todoList_items" v-if="todos.length > 0">
            <ul class="todoList_item">
              <li v-for="item in todos" :key="item.id">
                <label class="todoList_label">
                  <input
                    class="todoList_input"
                    type="checkbox"
                    value="true"
                    @change="toggleTodo(item.id)"
                    v-model="item.status"
                  />
                  <span>{{ item.content }}</span>
                </label>
                <a href="#">
                  <i class="fa fa-times"></i>
                </a>
              </li>
            </ul>
            <div class="todoList_statistics">
              <p>5 個已完成項目</p>
            </div>
          </div>
          <div className="emptyList" v-else>
            <h6 className="emptytext">目前尚無待辦事項</h6>
            <img
              className="emptypic"
              src="https://github.com/hexschool/2022-web-layout-training/blob/main/todolist/empty%201.png"
              alt="empty1"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const api = 'https://todolist-api.hexschool.io'

const newTodo = ref('')
const token = ref('')
const todos = ref([])
const tabStatus = ref('全部')
const username = ref('')
const cookieValue = ref('')
const tokenCheck = ref('')

// 取得 Cookie
cookieValue.value = document.cookie
  .split('; ')
  .find((row) => row.startsWith('hexschoolTodo='))
  ?.split('=')[1]
// 預設 axios 的表頭
if (cookieValue.value) {
  token.value = cookieValue.value
}

onMounted(() => {
  checkout()
  console.log(`the component is now mounted.`)
})

// 驗證登入
const checkout = async () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  document.cookie = `hexschoolTodo=${tokenCheck.value}; expires=${tomorrow.toUTCString()}`

  try {
    const response = await axios.get(`${api}/users/checkout`, {
      headers: {
        Authorization: cookieValue.value
      }
    })
    username.value = response.data.nickname
    getTodos()
    console.log('驗證成功 UID: ' + response.data.uid)
    //messageCheckOut.value = '驗證成功 UID: ' + response.data.uid;
  } catch (error) {
    console.log('驗證失敗: ' + error.message)
    //messageCheckOut.value = '驗證失敗: ' + error.message;
  }
}

//登出
const signOut = async () => {
  try {
    const res = await axios.post(
      `${api}/users/sign_out`,
      {},
      {
        headers: {
          Authorization: cookieValue
        }
      }
    )
    if (res.data.status) {
      document.cookie = 'hexschoolTodo='
      username.value = ''
      // navigate("/auth/login");
    }
  } catch (error) {
    console.log('登出失敗')
    alert('登出失敗', error.response.data.message)
  }
}

const handleTabStatus = (tab) => {
  tabStatus.value = tab
  console.log(tabStatus)
}

//變更todo狀態
const toggleTodo = async (id) => {
  try {
    const res = await axios.patch(
      `${api}/todos/${id}/toggle`,
      {},
      {
        headers: {
          Authorization: token.value
        }
      }
    )
    console.log(res.data.status)
    getTodos()
  } catch (error) {
    alert('toggle失敗', error.response.data.message)
  }
}

const addTodo = async () => {
  try {
    const data = {
      content: newTodo.value
    }

    const response = axios.post(`${api}/todos/`, data, {
      headers: {
        Authorization: token.value
      }
    })
    console.log('資料新增成功:', response.data)
    newTodo.value = ''
    alert('資料新增成功')
    getTodos()
  } catch (error) {
    console.error('新增資料時發生錯誤:', error)
    alert('新增資料時發生錯誤' + error.response.data.message)
  }
}

const getTodos = async () => {
  try {
    const response = await axios.get(`${api}/todos/`, {
      headers: {
        Authorization: token.value
      }
    })
    todos.value = response.data.data
  } catch (error) {
    console.error('資料取得發生錯誤:', error)
    alert('資料取得發生錯誤' + error.response.data.message)
  }
}
</script>
