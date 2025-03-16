<script setup>
import { onMounted, ref } from 'vue'
import { useSessionStore } from '@/store/session'
import { useRoute } from 'vue-router'
import PaginatedPosts from '@/components/PaginatedPosts.vue';
import Loading from '@/components/Loading.vue';
import { fetchUserByUsername, fetchPostsByUsername } from '@/api';

const route = useRoute()
const sessionStore = useSessionStore()
const { username } = route.params
const isLoading = ref(true)
const postsList = ref([])
const user = ref({})
const postsPerPage = 10
const page = ref(1)
const totalPosts = ref(0)

async function getUser() {
  try {
    const { data } = await fetchUserByUsername(username)
    user.value = data
  } catch (error) {
    console.error(error)
  }
}

async function getPosts() {
  isLoading.value = true
  try {
    const { data: { paginator, result } } = await fetchPostsByUsername(username, { limit: postsPerPage, offset: (page.value - 1) * 10 })
    postsList.value = result || []
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
  await Promise.all([getUser(), getPosts()])
})


</script>
<template>
  <header class="user-info">
    <img class="user-info__avatar" :src="user.profileImg" alt="avatar" />
    <span>{{ user.name }} {{ user.surname }}</span>
    <span class="has-color-grey has-text-small">@{{ user.username }}</span>
    <p class="has-color-grey">{{ user.bio }}</p>
    <small class="has-color-light has-text-small">Joined on {{ new Date(user.registrationDate).toLocaleString('en', {
      month:
        'long', year: 'numeric'
    }) }}
    </small>
    <button type="button" aria-label="Logout" class="btn btn--logout" @click="sessionStore.logout()">↪</button>
  </header>
  <section class=" posts-list">
    <Loading v-if="isLoading" />
    <PaginatedPosts v-else-if="postsList.length" :posts-list="postsList" :total-posts="totalPosts"
      @load-more="getMorePosts()" />
    <small v-else>This user has not shared anything yet</small>
  </section>
</template>

<style scoped>
.user-info {
  display: grid;
  place-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  position: relative;
}

.btn--logout {
  --size: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  font-size: 20px;
  width: var(--size);
  max-width: var(--size);
  min-width: var(--size);
  height: var(--size);
  border-radius: 50%;
  padding: 0;
  cursor: pointer;
}

.user-info__avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>