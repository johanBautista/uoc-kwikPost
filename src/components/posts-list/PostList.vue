<template>
  <div>
    <h2 class="">Feed</h2>

    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else class="post">
      <li v-for="post in posts" :key="post.id" class="mb-2">
        <Post :post="post" />
      </li>
    </ul>

    <div class="">
      <button @click="prevPage" :disabled="paginator.offset === 0">
        Anterior
      </button>
      <button @click="nextPage" :disabled="!hasNextPage">Siguiente</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { usePostsStore } from "../../stores/posts";
import Post from "../post/Post.vue";

const postsStore = usePostsStore();
const { fetchPosts } = postsStore;

onMounted(() => {
  fetchPosts(); // carga inicial
});

const posts = computed(() => postsStore.posts);
const paginator = computed(() => postsStore.paginator);
const loading = computed(() => postsStore.loading);
const error = computed(() => postsStore.error);

const hasNextPage = computed(
  () => paginator.value.offset + paginator.value.limit < paginator.value.total
);

function nextPage() {
  const newOffset = paginator.value.offset + paginator.value.limit;
  fetchPosts(newOffset);
}

function prevPage() {
  const newOffset = Math.max(0, paginator.value.offset - paginator.value.limit);
  fetchPosts(newOffset);
}
</script>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.post {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
}

.post a {
  text-decoration: none;
  color: inherit !important;
}
ul {
  list-style-type: none;
  padding: 0;
  margin-block-start: 0px;
  margin-block-end: 0px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}
</style>
