<template>
  <div class="header">
    <h1 class="header-title">🥏 KiwikPost</h1>
    <router-link
      v-if="isUserAuth"
      class="btn new-post"
      :to="{ name: 'post-create' }"
      >✎</router-link
    >
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();
const isUserAuth = computed(() => authStore.isAuthenticated);
</script>
<style>
.header {
  padding: 10px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0px 4px 9px 0px rgba(194, 194, 194, 0.25);
  z-index: 1;
}

.header-title {
  margin: 0;
  color: var(--secondary-color);
}

.btn.new-post {
  background: var(--secondary-color);
  color: white;
  padding: 0px 8px;
  border-radius: 50%;
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
