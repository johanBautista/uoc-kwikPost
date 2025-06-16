<template>
  <div>
    <h2 class="">Feed</h2>

    <div v-if="loading" class="loader">Cargando...</div>

    <ul v-else class="post">
      <li v-for="post in posts" :key="post.id" class="mb-2">
        <Post :post="post" />
      </li>
    </ul>

    <div class="pagination">
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
  fetchPosts();
});

const posts = computed(() => postsStore.posts);
const paginator = computed(() => postsStore.paginator);
const loading = computed(() => postsStore.loading);

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
.post {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #fff;
  position: relative;
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

.loader {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--primary-color);
  font-weight: 600;
  font-size: 18px;
  margin: 20px 0;
}

.loader::before {
  content: "";
  width: 16px;
  height: 16px;
  border: 3px solid var(--primary-color);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination button {
  background-color: var(--primary-color);
  color: var(--white-color);
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:hover:not(:disabled) {
  background-color: var(--primary-color-dark);
}

.pagination button:disabled {
  background-color: var(--light-color);
  cursor: not-allowed;
  color: var(--grey-color);
}
</style>
