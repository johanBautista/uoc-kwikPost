<template>
  <div class="menu">
    <router-link class="menu-link" to="/">🏠︎</router-link>
    <router-link class="menu-link" to="/login">
      <template v-if="isUserAuth">
        <img :src="store.user.profileImg" class="profile-img" alt="Avatar" />
      </template>
      <template v-else> 🗣 </template>
    </router-link>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useUserStore } from "../../stores/userStore";

const store = useUserStore();
const isUserAuth = computed(() => store.isAuthenticated);
</script>
<style>
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
  font-size: 35px;
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
