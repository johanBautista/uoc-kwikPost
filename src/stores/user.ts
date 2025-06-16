import { defineStore } from "pinia";
import {
  IUserState,
  Paginator,
  Post,
  PostsResponse,
  UserResponse,
} from "../utils/interfaces";
import { BASE_URL } from "../utils/constants";
import { useAuthStore } from "./auth";

export const useUserStore = defineStore("user", {
  state: (): IUserState => ({
    user: null,
    posts: [] as Post[],
    paginator: {
      total: 0,
      offset: 0,
      limit: 10,
    } as Paginator,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchUserData(userId) {
      const authStore = useAuthStore();

      this.loading = true;
      try {
        const res = await fetch(`${BASE_URL}/user/${userId}`, {
          method: "GET",
          headers: { Authorization: `${authStore.token}` },
        });
        if (!res.ok) throw new Error("Error al cargar los datos del usuario");

        const data: UserResponse = await res.json();
        this.user = data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchUserPosts(offset = 0) {
      const authStore = useAuthStore();
      this.loading = true;
      this.error = null;

      try {
        const res = await fetch(
          `${BASE_URL}/user/${authStore.user?.username}/posts?limit=${this.paginator.limit}&offset=${offset}`,
          {
            method: "GET",
            headers: { Authorization: `${authStore.token}` },
          }
        );
        if (!res.ok) throw new Error("Error al cargar los posts del usuario");

        const data: PostsResponse = await res.json();
        this.posts = data.result;

        this.paginator = {
          ...data.paginator,
          limit: this.paginator.limit,
        };
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
