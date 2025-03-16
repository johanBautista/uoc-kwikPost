<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { fetchPostById } from '@/api'
import PostCard from '@/components/PostCard.vue'

const route = useRoute()
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

onMounted(async () => {
  await getPost();
})
</script>

<template>
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