<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useSessionStore } from '@/store/session';
import { ref, onMounted, computed } from 'vue'
import { fetchPostById, deletePost } from '@/api'

import PostCard from '@/components/PostCard.vue'

const route = useRoute()
const router = useRouter()
const sessionStore = useSessionStore();

const postId = route.params.id

const post = ref({})

async function getPost() {
  try {
    const { data } = await fetchPostById(postId)
    post.value = data
  } catch (error) {
    console.error(error)
  }
}

async function onDeletePost() {
  try {
    await deletePost(postId)
    router.push({ name: 'home' })
  } catch (error) {
    console.error(error)
  }
}

const isOwnPost = computed(() => {
  return sessionStore.isLogged() && sessionStore.getUser().id === post.value.userId;
})


onMounted(async () => {
  await getPost();
})
</script>

<template>
  <button v-if="isOwnPost" class="interactions__delete icon" type="button" aria-label="Delete"
    @click="onDeletePost()">🗑️</button>
  <PostCard class="main-post" :post="post" />
  <ul class="replies-list">
    <li v-for="reply in post.replies" :key="reply.id">
      <PostCard :post="reply" />
    </li>
  </ul>
</template>

<style scoped>
.main-post {
  border: 1px solid #ddd;
  border-radius: 20px;
}

.replies-list {
  margin-left: 20px;
}

.replies-list li:not(:last-child) {
  border-bottom: 1px solid #ddd;
}
</style>