import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { ref } from 'vue';

export const useSessionStore = defineStore('session', () => {
  const router = useRouter();
  const logged = ref(false);
  const user = ref({});
  const token = ref('');

  function getUser() {
    return user.value;
  }

  function getToken() {
    return token.value;
  }

  function isLogged() {
    return logged.value;
  }

  function setUser(newUser) {
    user.value = newUser
    logged.value = true
  }

  function setToken(newToken) {
    token.value = newToken;
  }

  function logout() {
    user.value = {};
    token.value = '';
    logged.value = false;
    router.push({ name: 'home' });
  }

  return {
    logged,
    user,
    token,
    getUser,
    getToken,
    setToken,
    setUser,
    isLogged,
    logout,
  };
});