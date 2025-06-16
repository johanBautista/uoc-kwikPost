import { defineStore } from "pinia";
import { Paginator, Post, PostsResponse } from "../utils/interfaces";
import { BASE_URL } from "../utils/constants";
import { useAuthStore } from "./auth";

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
    async getPostById(postId: string) {
      const authStore = useAuthStore();

      this.loading = true;
      this.error = null;

      try {
        const res = await fetch(`${BASE_URL}/post/${postId}`, {
          method: "GET",
          headers: { Authorization: `${authStore.token}` },
        });
        if (!res.ok) throw new Error("No se pudo obtener el post");

        const post: Post = await res.json();
        return post;
      } catch (err: any) {
        this.error = err.message || "Error desconocido";
        return null;
      } finally {
        this.loading = false;
      }
    },

    async createPost(content: string) {
      const authStore = useAuthStore();
      this.loading = true;
      this.error = null;

      try {
        const res = await fetch(`${BASE_URL}/post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authStore.token}`,
          },
          body: JSON.stringify({ content }),
        });

        if (!res.ok) throw new Error("No se pudo crear el post");

        const newPost: Post = await res.json();
        this.posts.unshift(newPost); // opcional: añadirlo al principio de la lista si estás en la Home
        return newPost;
      } catch (err: any) {
        this.error = err.message || "Error desconocido";
        return null;
      } finally {
        this.loading = false;
      }
    },
    async editPost(postId: string, content: string) {
      const authStore = useAuthStore();

      this.loading = true;
      this.error = null;

      try {
        const res = await fetch(`${BASE_URL}/post/${postId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authStore.token}`,
          },
          body: JSON.stringify({ content }),
        });

        if (!res.ok) throw new Error("Error al editar el post");

        const updatedPost: Post = await res.json();

        // Actualitzar el post localment si existeix
        const index = this.posts.findIndex((p) => p.id === postId);
        if (index !== -1) this.posts[index] = updatedPost;

        return updatedPost;
      } catch (err: any) {
        this.error = err.message || "Error desconegut";
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async deletePost(postId: string) {
      const authStore = useAuthStore();

      this.loading = true;
      this.error = null;

      try {
        const res = await fetch(`${BASE_URL}/post/${postId}`, {
          method: "DELETE",
          headers: {
            Authorization: `${authStore.token}`,
          },
        });

        if (!res.ok) throw new Error("Error al eliminar el post");

        this.posts = this.posts.filter((p) => p.id !== postId);
      } catch (err: any) {
        this.error = err.message || "Error desconegut";
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});
