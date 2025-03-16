<script setup>
import { useSessionStore } from '@/store/session'

const sessionStore = useSessionStore()
</script>

<template>
  <div class="new-post">
    <img :src="sessionStore.user.profileImg" alt="avatar" />
    <form class="form-new-post">
      <textarea class="textarea-new-post" placeholder="Write something here..."></textarea>
      <button class="btn btn--new-post">Share</button>
    </form>
  </div>
</template>

<style scoped>
/* Wrapper */
.new-post {
  display: flex;
  flex-direction: row;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
}

.new-post img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.form-new-post {
  flex: 1;
}

.btn--new-post {
  justify-self: flex-end;
}

.textarea-new-post {
  display: block;
  width: 100%;
  padding: 10px;
  border: 0;
}
</style>
