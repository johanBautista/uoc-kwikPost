<template>
  <UserProfile :user="user" />
  <PostsUser />
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useUserStore } from "../stores/user";
import UserProfile from "../components/user-profile/UserProfile.vue";
import PostsUser from "../components/posts-user/PostsUser.vue";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const route = useRoute();
const { fetchUserData } = userStore;

const user = computed(() => userStore.user);
const username = computed(() => route.params.username);

onMounted(() => {
  if (username.value) {
    fetchUserData(username.value);
  }
});

watch(username, (newUsername, oldUsername) => {
  if (newUsername !== oldUsername) {
    fetchUserData(newUsername);
  }
});
</script>
