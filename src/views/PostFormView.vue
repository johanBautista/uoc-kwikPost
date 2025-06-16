<template>
  <div class="container">
    <h2>{{ isEdit ? "Editar Post" : "Crear Nuevo Post" }}</h2>

    <PostForm
      v-if="!isEdit || post"
      :initialContent="post?.content || ''"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { usePostsStore } from "../stores/posts";
import PostForm from "../components/post-form/PostForm.vue";

const route = useRoute();
const router = useRouter();
const postsStore = usePostsStore();

const postId = route.params.id as string | undefined;
interface Post {
  id: string;
  content: string;
}

const post = ref<Post | null>(null);
const isEdit = !!postId;

onMounted(async () => {
  if (isEdit && postId) {
    const existingPost = await postsStore.getPostById(postId);
    if (existingPost) {
      post.value = existingPost;
    } else {
      router.push("/not-found");
    }
  }
});

const handleSubmit = async (content: string) => {
  try {
    if (isEdit && postId) {
      await postsStore.editPost(postId, content);
    } else {
      await postsStore.createPost(content);
    }
    router.push("/");
  } catch (err) {
    console.error("Error en el formulario:", err);
  }
};
</script>
