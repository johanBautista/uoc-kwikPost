<script setup>
import PostCard from '@/components/PostCard.vue'

const props = defineProps({
  postsList: {
    type: Array,
    required: true
  },
  totalPosts: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['load-more'])

</script>

<template>
  <div class="posts">
    <PostCard class="post" v-for="post in props.postsList" :key="post.id" :post="post" />
  </div>
  <button v-if="postsList.length < totalPosts" type="button" class="btn btn--cta load-more"
    @click="emit('load-more')">Load more</button>
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