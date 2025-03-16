<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete'])

const formattedDate = computed(() => {
  const date = new Date(props.post.publishDate)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
})

function goToProfile() {
  router.push({ name: 'profile', params: { username: props.post.user.username } });
}

function goToPostDetail() {
  router.push({ name: 'post', params: { id: props.post.id } });
}
</script>

<template>
  <article class="post">
    <header v-if="props.post.user" class="user-info" @click="goToProfile()">
      <img class="user-info__avatar" :src="props.post.user.profileImg" alt="avatar" />
      <div class="user-info__user">
        <span> {{ props.post.user.name }} {{ props.post.user.surname }}</span>
        <span class="has-color-grey has-text-small">@{{ props.post.user.username }}</span>
      </div>
    </header>
    <main @click="goToPostDetail()">
      <p class="has-color-grey">{{ props.post.content }}</p>
      <time class="has-color-light">{{ formattedDate }}</time>
    </main>
    <section class="interactions" @click="goToPostDetail()">
      <div class="interactions__info">
        <span class="icon">❤ {{ props.post.nLikes }}</span>
        <span class="icon">💬 {{ props.post.nReplies }}</span>
      </div>
      <div class="interactions__actions">
        <button class="interactions__delete icon" type="button" aria-label="Delete" @click="emit('delete')">🗑️</button>
      </div>
    </section>
  </article>
</template>

<style scoped>
a {
  text-decoration: none;
  color: inherit !important;
}

/* Global wrapper */
.post {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
}

.user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.user-info__user {
  display: flex;
  flex-direction: column;
}

.user-info__avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

main {
  margin-bottom: 10px;
}

main p {
  margin: 0;
  font-size: 14px;
}

main time {
  font-size: 12px;
}

/* Contains likes and replies count and buttons*/
.interactions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.interactions__info {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}

.interactions .icon {
  font-size: 12px;
  color: #555;
}

.interactions__delete {
  justify-self: end;
}
</style>