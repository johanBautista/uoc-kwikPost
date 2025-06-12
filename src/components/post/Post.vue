<template>
  <div class="post-card">
    <div class="post-header">
      <img class="avatar" :src="post.user.profileImg" alt="Image user" />
      <div class="user-info">
        <div class="name">{{ post.user.name }} {{ post.user.surname }}</div>
        <div class="username">@{{ post.user.username }}</div>
      </div>
    </div>
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
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import { Post } from "../../utils/interfaces";

const props = defineProps<{
  post: Post;
}>();
console.log("Post component loaded with post:", props.post);
</script>
<style>
.post-card {
  max-width: 500px;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  font-family: sans-serif;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
}

.user-info .name {
  font-weight: bold;
  font-size: 16px;
}

.user-info .username {
  font-size: 14px;
  color: var(--grey-color);
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
