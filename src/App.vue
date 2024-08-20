<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/signup">註冊</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
