import { createRouter, createWebHistory } from "vue-router";
import { useSessionStore } from "@/store/session";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import ProfileView from "@/views/ProfileView.vue";
import PostDetailView from "@/views/PostDetailView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/post/:id",
    name: "post",
    component: PostDetailView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/profile/:username",
    name: "profile",
    component: ProfileView,
    meta: {
      requiresAuth: true,
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const sessionStore = useSessionStore()

  if (to.meta.requiresAuth && !sessionStore.isLogged()) return '/login'
})

export default router