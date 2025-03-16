<script setup>
import { ref } from 'vue';
import { login } from '@/api'
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref('');
const password = ref('');

async function handleSubmit() {
  try {
    await login(username.value, password.value);
    router.push({ name: 'home' });
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit()">
    <div class="input-group">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" />
    </div>
    <div class="input-group">
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" />
    </div>
    <button class="btn btn--cta" type="submit">Login</button>
  </form>
</template>

<style scoped>
form {
  display: grid;
  place-items: center;
  gap: 20px;
}
</style>