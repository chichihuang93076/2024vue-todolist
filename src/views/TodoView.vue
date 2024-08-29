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
        <div class="todoList_list" v-if="todos.length > 0">
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
          <div class="todoList_items">
            <ul class="todoList_item">
              <li v-for="item in filteredTodos" :key="item.id">
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
                <a @click="handleTodobyid(item.id)">
                  <i class="fa fa-times"></i>
                </a>
              </li>
            </ul>
            <div class="todoList_statistics">
              <p>{{ uncompleteCount }} 個未完成項目</p>
            </div>
          </div>
        </div>
        <div className="emptyList" v-else>
          <h6 className="emptytext">目前尚無待辦事項</h6>
          <img
            className="emptypic"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/empty 1.png"
            alt="empty1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import showAlert from '../components/showAlert.js'

// 初始化 Vue Router 來進行路由跳轉
const router = useRouter()

const api = 'https://todolist-api.hexschool.io'

const newTodo = ref('')
const todos = ref([])
//const todolist = ref([])
const tabStatus = ref('全部')
const username = ref('')
const cookieValue = ref('')
let token = ''

// 取得 Cookie
cookieValue.value = document.cookie
  .split('; ')
  .find((row) => row.startsWith('hexschoolTodo='))
  ?.split('=')[1]
// 預設 axios 的表頭
if (cookieValue.value) {
  token = cookieValue.value
}
// 預設 axios 的表頭
axios.defaults.headers.common['Authorization'] = cookieValue

onMounted(() => {
  checkout()
  console.log(`the component is now mounted.`)
})

// 驗證登入
const checkout = async () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  document.cookie = `hexschoolTodo=${token}; expires=${tomorrow.toUTCString()}`

  try {
    const response = await axios.get(`${api}/users/checkout`, {
      headers: {
        Authorization: token
      }
    })
    username.value = response.data.nickname
    getTodos()
    console.log('驗證成功 UID: ' + response.data.uid)
    //messageCheckOut.value = '驗證成功 UID: ' + response.data.uid;
  } catch (error) {
    console.log('驗證失敗: ' + error.message)
    router.push('/')
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
          Authorization: cookieValue.value
        }
      }
    )
    if (res.data.status) {
      document.cookie = 'hexschoolTodo='
      username.value = ''
      router.push('/')
    }
  } catch (error) {
    console.log('登出失敗')
    alert('登出失敗', error.response.data.message)
  }
}

//處理tab切換
const handleTabStatus = (tab) => {
  tabStatus.value = tab

  // todolist.value = todos.value?.filter((item) =>
  //   tab === '待完成' ? !item.status : tab === '已完成' ? item.status : item
  // )
}

const filteredTodos = computed(() => {
  return todos.value?.filter((item) =>
    tabStatus.value === '待完成' ? !item.status : tabStatus.value === '已完成' ? item.status : item
  )
})

//變更todo狀態
const toggleTodo = async (id) => {
  try {
    const res = await axios.patch(
      `${api}/todos/${id}/toggle`,
      {},
      {
        headers: {
          Authorization: token
        }
      }
    )
    console.log(res.data.status)
    getTodos()
  } catch (error) {
    alert('toggle失敗', error.response.data.message)
  }
}

//新增todo
const addTodo = async () => {
  //空白檢查
  if (!newTodo.value.trim() || !token) return

  try {
    const data = {
      content: newTodo.value
    }

    await axios.post(`${api}/todos/`, data, {
      headers: {
        Authorization: token
      }
    })
    //console.log('資料新增成功:', response.data)
    newTodo.value = ''
    showAlert('success', '訊息', '資料新增成功', 2000, true)
    getTodos()
  } catch (error) {
    //console.error('新增資料時發生錯誤:', error)
    showAlert('error', '訊息', '新增資料時發生錯誤', 2000, true)
  }
}

//刪除代辦事項by id
const deleteTodo = async (id) => {
  try {
    await axios.delete(`${api}/todos/${id}`, {
      headers: {
        Authorization: token
      }
    })
    //console.log(res)
  } catch (error) {
    //console.log(error.response.data.message)
    showAlert('error', '訊息', '刪除資料時發生錯誤' + error.response.data.message, 5000, true)
  }
}

//刪除單一代辦事項
const handleTodobyid = (id) => {
  deleteTodo(id)
  getTodos()
}

const getTodos = async () => {
  try {
    const response = await axios.get(`${api}/todos/`, {
      headers: {
        Authorization: token
      }
    })
    todos.value = response.data.data
    handleTabStatus(tabStatus.value)
  } catch (error) {
    //console.error('資料取得發生錯誤:', error)
    showAlert('error', '訊息', '資料取得發生錯誤' + error.response.data.message, 5000, true)
  }
}

//未完成項目
const uncompleteCount = computed(() => {
  return todos.value.filter((item) => !item.status).length
})
</script>
