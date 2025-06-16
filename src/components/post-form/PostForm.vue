<template>
  <form @submit.prevent="handleSubmit" class="post-form">
    <textarea
      v-model="content"
      required
      placeholder="Escribe tu post..."
      class="post-textarea"
    />
    <button type="submit" class="post-button">Guardar</button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  initialContent: string;
}>();
const emit = defineEmits<{
  (e: "submit", content: string): void;
}>();

const content = ref(props.initialContent);

watch(
  () => props.initialContent,
  (newVal) => {
    content.value = newVal;
  }
);

const handleSubmit = () => {
  if (!content.value.trim()) return;
  emit("submit", content.value);
};
</script>
<style scoped>
.post-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.post-textarea {
  width: 100%;
  min-height: 120px;
  padding: 10px;
  resize: vertical;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: inherit;
  transition: border-color 0.2s;
}

.post-textarea:focus {
  outline: none;
  border-color: #007bff;
}

.post-button {
  align-self: flex-end;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.post-button:hover {
  background-color: #0056b3;
}
</style>
