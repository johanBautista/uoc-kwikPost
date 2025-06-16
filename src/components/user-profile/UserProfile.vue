<template>
  <div v-if="user" class="profile-card">
    <img
      class="profile-img"
      :src="user.profileImg"
      :alt="`${user.name} ${user.surname}`"
    />
    <div class="profile-info">
      <h2>{{ user.name }} {{ user.surname }}</h2>
      <p class="username">@{{ user.username }}</p>
      <p class="bio">{{ user.bio }}</p>
      <p class="date">
        Joined on {{ new Date(user.registrationDate).toLocaleDateString() }}
      </p>
    </div>
    <div v-if="isCurrentUser" title="Edita tu perfil" class="edit-button">
      𓉞
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { UserResponse } from "../../utils/interfaces";
import { useAuthStore } from "../../stores/auth";

const props = defineProps<{
  user: UserResponse;
}>();

const authStore = useAuthStore();
const isCurrentUser = computed(
  () => authStore.user?.username === props.user.username
);
</script>

<style scoped>
.profile-card {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  border-bottom: 1px solid var(--light-color);
  text-align: center;
  position: relative;
  font-family: var(--font-family);
}

.profile-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.profile-info h2 {
  font-size: 1.5rem;
  margin: 0;
  color: var(--black-color);
}

.username {
  color: var(--grey-color);
  margin: 0.2rem 0;
  font-weight: 400;
}

.bio {
  font-size: 1.1rem;
  color: var(--black-color);
  margin-top: 0.5rem;
}

.date {
  color: var(--light-color);
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.edit-button {
  position: absolute;
  top: 2rem;
  right: 0.5rem;
  width: 36px;
  height: 36px;
  background-color: var(--secondary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
}

.edit-button:hover {
  background-color: var(--primary-color-dark);
}
</style>
