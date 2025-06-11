import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/userStore";

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
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/new-post",
      name: "new-post",
      component: () => import("../views/NewPostView.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const store = useUserStore();

  if (to.meta.requiresAuth && !store.token) {
    next("/login");
  }
  if (to.path === "/login" && store.token) {
    return next("/profile");
  }
  next();
});

export default router;
