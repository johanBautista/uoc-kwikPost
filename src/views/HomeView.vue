<script setup>
import { ref, onMounted } from 'vue'
import { useSessionStore } from '@/store/session'
import { fetchPosts } from '@/api'
import PaginatedPosts from '@/components/PaginatedPosts.vue';
import Loading from '@/components/Loading.vue';
import NewPost from '@/components/NewPost.vue';

const sessionStore = useSessionStore()




</script>

<template>
  <NewPost v-if="sessionStore.isLogged()" />
  <h2 class="title-section">Feed</h2>
  <PaginatedPosts :fetch-posts-function="fetchPosts" />
</template>

<style scoped>
.input-search {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  height: 50px;
}
</style>
