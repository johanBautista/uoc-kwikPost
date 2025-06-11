<template>
  <div class="header">
    <h1>🥏 KiwikPost</h1>
    <router-link v-if="isUserAuth" class="btn new-post" to="/new-post"
      >✎</router-link
    >
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useUserStore } from "../../stores/userStore";

const store = useUserStore();
const isUserAuth = computed(() => store.isAuthenticated);
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
