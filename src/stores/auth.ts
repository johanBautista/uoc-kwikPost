import { defineStore } from "pinia";
import { IAuthState } from "../utils/interfaces";
import { BASE_URL } from "../utils/constants";

export const useAuthStore = defineStore("auth", {
  state: (): IAuthState => ({
    isAuthenticated: false,
    token: null,
    user: null as any,
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const res = await fetch(`${BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (!res.ok) throw new Error("Login incorrecto");

        const data = await res.json();
        this.token = data.token;
        this.user = data.user;
        this.isAuthenticated = true;
      } catch (error) {
        throw error;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
