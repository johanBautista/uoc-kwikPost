<template>
  <div>
    <h2 class="">Tus Posts</h2>

    <div v-if="loading" class="loader">Cargando...</div>

    <ul v-else class="post">
      <li v-for="post in posts" :key="post.id" class="mb-2">
        <div class="post-card">
          <div class="post-content">{{ post.content }}</div>
          <div class="post-date">
            {{ new Date(post.publishDate).toLocaleDateString() }}
          </div>
          <div class="post-stats">
            <span class="likes"
              ><span class="likes-icon"> ❤ </span> {{ post.nLikes }}</span
            >
            <span class="replies">💬 {{ post.nReplies }}</span>
          </div>
        </div>
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
import { useUserStore } from "../../stores/user";

const postsStore = useUserStore();
const { fetchUserPosts } = postsStore;

const posts = computed(() => postsStore.posts);

onMounted(() => {
  fetchUserPosts();
});

const paginator = computed(() => postsStore.paginator);
const loading = computed(() => postsStore.loading);

const hasNextPage = computed(
  () => paginator.value.offset + paginator.value.limit < paginator.value.total
);

function nextPage() {
  const newOffset = paginator.value.offset + paginator.value.limit;
  fetchUserPosts(newOffset);
}

function prevPage() {
  const newOffset = Math.max(0, paginator.value.offset - paginator.value.limit);
  fetchUserPosts(newOffset);
}
</script>

<style scoped>
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

/* Loader */
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

/* Pagination Buttons */
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

.post-card {
  max-width: 500px;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  font-family: sans-serif;
}

.post-content {
  font-size: 16px;
  color: var(--grey-color);
  margin: 8px 0;
}

.post-date {
  font-size: 14px;
  color: var(--light-color);
  margin-bottom: 12px;
}

.post-stats {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: #444;
}
.likes-icon {
  font-size: 1rem;
  color: var(--error-color);
}
</style>
