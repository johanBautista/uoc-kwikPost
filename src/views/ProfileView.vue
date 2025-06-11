<template>
  <h1>hola perfil</h1>
  <div v-if="store.user.name">
    <h2>Bienvenido, {{ store.user.name }}</h2>
    <img :src="store.user.profileImg" alt="Avatar" />
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/userStore";

const store = useUserStore();
</script>
