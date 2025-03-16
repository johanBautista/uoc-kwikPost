<script setup>
import { onMounted, ref } from 'vue'
import { useSessionStore } from '@/store/session'
import { useRoute } from 'vue-router'
import PaginatedPosts from '@/components/PaginatedPosts.vue';
import { fetchUserByUsername, fetchPostsByUsername } from '@/api';

const route = useRoute()
const sessionStore = useSessionStore()
const { username } = route.params
const user = ref({})
const isNoPosts = ref(false)

async function getUser() {
  try {
    const { data } = await fetchUserByUsername(username)
    user.value = data
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await getUser()
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
  <section class="posts-list">
    <PaginatedPosts :fetch-posts-function="fetchPostsByUsername" :function-params="{ username }"
      @no-posts="isNoPosts = true" />
    <small v-if="isNoPosts">This user has not shared anything yet</small>
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