<script setup>
import { useSessionStore } from '@/store/session'
import { useRoute } from 'vue-router'
const sessionStore = useSessionStore()

function isCurrentRoute(routeName) {
  return useRoute().name === routeName
}

</script>

<template>
  <nav class="menu">
    <router-link aria-label="Home" class="menu-link" :class="{ 'active': isCurrentRoute('home') }"
      :to="{ name: 'home' }">🏠︎</router-link>
    <router-link aria-label="Login" v-if="!sessionStore.isLogged()" class="menu-link"
      :class="{ 'active': isCurrentRoute('login') }" :to="{ name: 'login' }">🗣</router-link>
    <router-link aria-label="Profile" v-else class="menu-link"
      :to="{ name: 'profile', params: { username: sessionStore.user?.username } }">
      <img class="profile-img" :src="sessionStore.user?.profileImg" alt="Profile" />
    </router-link>
  </nav>
</template>

<style scoped>
.menu {
  display: flex;
  justify-content: space-around;
  padding: 15px;
  border-top: 1px solid #ddd;
  background: white;
  border-end-end-radius: 20px;
  border-end-start-radius: 20px;
  box-shadow: 0px -4px 9px 0px rgba(194, 194, 194, 0.25);
  z-index: 1;
}

.menu-link {
  text-decoration: none;
  color: inherit;
  background: none;
  border: none;
  font-size: 25px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--grey-color);
}

.menu-link.active {
  color: var(--primary-color);
}

.profile-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>