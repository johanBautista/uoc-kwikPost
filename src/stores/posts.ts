import { defineStore } from "pinia";
import { Paginator, Post, PostsResponse } from "../utils/interfaces";
import { BASE_URL } from "../utils/constants";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [] as Post[],
    paginator: {
      total: 0,
      offset: 0,
      limit: 10,
    } as Paginator,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchPosts(offset = 0) {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(
          `${BASE_URL}/posts?limit=${this.paginator.limit}&offset=${offset}`
        );
        if (!response.ok) throw new Error("Error al cargar los posts");

        const data: PostsResponse = await response.json();
        this.posts = data.result;
        this.paginator = data.paginator;
      } catch (err: any) {
        this.error = err.message || "Error desconocido";
      } finally {
        this.loading = false;
      }
    },
  },
});
