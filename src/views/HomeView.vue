<script setup>
import { ref, onMounted } from 'vue'
import { useSessionStore } from '@/store/session'
import { fetchPosts } from '@/api'
import PaginatedPosts from '@/components/PaginatedPosts.vue';
import Loading from '@/components/Loading.vue';
import NewPost from '@/components/NewPost.vue';

const sessionStore = useSessionStore()
const isLoading = ref(true)
const postsList = ref([])
const postsPerPage = 10
const page = ref(1)
const totalPosts = ref(0)

async function getPosts() {
  isLoading.value = true
  try {
    const { data: { paginator, result } } = await fetchPosts({ limit: postsPerPage, offset: (page.value - 1) * 10 })
    postsList.value = [...postsList.value, ...result]
    totalPosts.value = paginator.total

  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

async function getMorePosts() {
  page.value++
  await getPosts()
}


onMounted(async () => {
  await getPosts()
})
</script>

<template>
  <NewPost v-if="sessionStore.isLogged()" />
  <h2 class="title-section">Feed</h2>
  <Loading v-if="isLoading" />
  <PaginatedPosts v-else :posts-list="postsList" :total-posts="totalPosts" @load-more="getMorePosts()" />
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
