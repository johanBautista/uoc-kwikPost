<script setup></script>

<template>
  <main class="main">
    <h1>Hola</h1>
    <div class="sidebar">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
  </main>
  <router-view />
</template>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #f0f0f0;
  padding: 1rem;
  position: fixed;
  top: 10;
  display: flex;
  justify-content: space-around;
}
.main {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}
</style>
