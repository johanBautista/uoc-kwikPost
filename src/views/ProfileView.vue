<template>
  <UserProfile :user="user" />
  <PostsUser />
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useUserStore } from "../stores/user";
import { useAuthStore } from "../stores/auth";
import UserProfile from "../components/user-profile/UserProfile.vue";
import PostsUser from "../components/posts-user/PostsUser.vue";

const userStore = useUserStore();
const authStore = useAuthStore();
const { fetchUserData } = userStore;

const user = computed(() => userStore.user);
const userId = authStore.user?.username;

onMounted(() => {
  if (userId) {
    fetchUserData(userId);
  }
});
</script>
