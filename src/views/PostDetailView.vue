<template>
  <div v-if="loading" class="loader">Cargando...</div>

  <div v-else-if="post" class="post">
    <h2 class="post-title">
      Post de {{ post.user.name }} {{ post.user.surname }}
    </h2>

    <div class="post-card">
      <div class="post-header">
        <img :src="post.user.profileImg" alt="Profile image" class="avatar" />
        <div class="user-info">
          <div class="name">@{{ post.user.username }}</div>
          <div class="username">
            Publicado el {{ new Date(post.publishDate).toLocaleDateString() }}
          </div>
        </div>
      </div>

      <p class="post-content">{{ post.content }}</p>

      <div class="post-stats">
        <span class="likes"
          ><span class="likes-icon">❤</span> {{ post.nLikes }}</span
        >
        <span class="replies">💬 {{ post.nReplies }}</span>
      </div>

      <!-- Edicion -->
      <div v-if="isOwner" class="post-actions">
        <button class="btn delete-btn" @click="deletePost">Eliminar</button>
        <button class="btn edit-btn" @click="goToEdit">Editar</button>
      </div>
    </div>

    <div v-if="post.nReplies > 0" class="replies">
      <h3 class="replies-title">Respuestas</h3>
      <ul>
        <li v-for="reply in post.replies" :key="reply.id" class="reply">
          <div class="post-header">
            <img :src="reply.user.profileImg" alt="User" class="avatar-small" />
            <div class="user-info">
              <div class="name-small">
                @{{ reply.user.username }} ({{ reply.user.name }})
              </div>
              <div class="username-small">
                {{ new Date(reply.publishDate).toLocaleString() }}
              </div>
            </div>
          </div>
          <p class="reply-content">{{ reply.content }}</p>
        </li>
      </ul>
    </div>
  </div>

  <div v-else>
    <p>No se encontró el post.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePostsStore } from "../stores/posts";
import type { Post } from "../utils/interfaces";
import { useUserStore } from "../stores/user";

const route = useRoute();
const router = useRouter();
const postsStore = usePostsStore();
const userStore = useUserStore();

const post = ref<Post | null>(null);
const loading = ref(true);

async function fetchPost() {
  const postId = route.params.id as string;
  post.value = await postsStore.getPostById(postId);
  loading.value = false;
}

const isOwner = computed(() => {
  return post.value && userStore.user?.id === post.value.user.id;
});

const deletePost = async () => {
  if (!post.value) return;
  await postsStore.deletePost(post.value.id);
  router.push("/");
};

const goToEdit = () => {
  if (!post.value) return;
  router.push(`/post-edit/${post.value.id}`);
};

onMounted(fetchPost);
</script>
<style scoped>
.post-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}
.post-card {
  padding: 16px;
  border: 1px solid #f6f4f4;
  border-radius: 8px;
  background-color: #f6f4f4;
}
.post-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}
.post-actions .btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.post-actions .edit-btn {
  background-color: var(--primary-color);
  color: white;
}
.post-actions .edit-btn:hover {
  background-color: var(--primary-color-dark);
  transition: background-color 0.3s ease;
}

.post-actions .delete-btn {
  background-color: #bfbcbc;
  color: white;
}
.post-actions .delete-btn:hover {
  background-color: #a8a8a8;
  transition: background-color 0.3s ease;
}

.replies ul {
  list-style-type: none;
}

.replies-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.reply {
  border-bottom: 1px solid #e0e0e0;
  padding: 8px 0;
}

.avatar-small {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
}

.name-small {
  font-size: 14px;
  font-weight: 600;
}

.username-small {
  font-size: 12px;
  color: var(--grey-color);
}

.reply-content {
  margin-left: 44px;
  font-size: 14px;
  color: #444;
}
</style>
