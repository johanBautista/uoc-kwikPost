<template>
  <div>
    <h2 class="">Post Details</h2>
    <p>post:{{ route.params.id }}</p>

    <!-- <div v-if="loading" class="loader">Cargando...</div>

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
    </div> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { usePostsStore } from "../stores/posts";

const route = useRoute();
const postsStore = usePostsStore();

const post = ref(null);
const loading = ref(true);

async function fetchPost() {
  const postId = route.params.id;
  post.value = await postsStore.getPostById(postId);
  loading.value = false;
}

fetchPost();
</script>
