<script setup>
import NavigationMenu from '@/components/NavigationMenu.vue';
</script>

<template>
  <header class="header">🥏 KwikPost</header>
  <main class="main">
    <router-view />
  </main>
  <NavigationMenu />
</template>

<style scoped>
.header {
  padding: 10px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0px 4px 9px 0px rgba(194, 194, 194, 0.25);
  z-index: 1
}

.main {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}
</style>
