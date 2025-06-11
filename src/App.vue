<template>
  <div class="app-layout">
    <Header />
    <main class="main">
      <router-view />
    </main>
    <Menu />
  </div>
</template>

<script setup>
import Header from "./components/header/Header.vue";
import Menu from "./components/menu/Menu.vue";
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.main {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  padding-bottom: 70px;
}
</style>
