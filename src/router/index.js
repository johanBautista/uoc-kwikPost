import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("../views/NotFoundView.vue"),
    },
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/profile/:username",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/post-detail/:id",
      name: "post-detail",
      component: () => import("../views/PostDetailView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/post-new",
      name: "post-create",
      component: () => import("../views/PostFormView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/post-edit/:id",
      name: "post-edit",
      component: () => import("../views/PostFormView.vue"),
      meta: { requiresAuth: true },
      props: true,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.token) {
    next("/login");
  }
  if (to.path === "/login" && authStore.token) {
    return next("/profile/" + authStore.user.username);
  }
  next();
});

export default router;
