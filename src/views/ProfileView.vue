<template>
  <h1>hola perfil</h1>
  <div v-if="authStore.user.name">
    <h2>Bienvenido, {{ authStore.user.name }}</h2>
    <img :src="authStore.user.profileImg" alt="Avatar" />
  </div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
</script>
