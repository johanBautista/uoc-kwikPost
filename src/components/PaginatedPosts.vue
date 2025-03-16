<script setup>
import { onMounted, ref } from 'vue'
import Loading from '@/components/Loading.vue'
import PostCard from '@/components/PostCard.vue'

const props = defineProps({
  fetchPostsFunction: {
    type: Function,
    required: true
  },
  functionParams: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['no-posts'])

const isLoading = ref(true)
const postsList = ref([])
const postsPerPage = 10
const page = ref(1)
const totalPosts = ref(0)

async function getPosts() {
  isLoading.value = true
  try {
    const { data: { paginator, result } } = await props.fetchPostsFunction({ limit: postsPerPage, offset: (page.value - 1) * 10, ...props.functionParams })
    postsList.value = [...postsList.value, ...result]
    totalPosts.value = paginator.total
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
    if (!postsList.value?.length) {
      emit('no-posts')
    }
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
  <Loading v-if="isLoading" />
  <template v-else-if="postsList.length">
    <div class="posts">
      <PostCard class="post" v-for="post in postsList" :key="post.id" :post="post" />
    </div>
    <button v-if="postsList.length < totalPosts" type="button" class="btn btn--cta load-more" @click="getMorePosts">Load
      more</button>
  </template>
</template>

<style scoped>
.posts {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post {
  margin-top: 10px;
}

.post:not(:last-child) {
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}

.btn.load-more {
  margin: 10px auto;
  min-width: 200px;
}
</style>