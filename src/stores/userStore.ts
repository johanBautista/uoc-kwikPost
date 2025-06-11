import { defineStore } from "pinia";
import { UserStoreState } from "../utils/interfaces";

export const useUserStore = defineStore("userStore", {
  state: (): UserStoreState => ({
    isAuthenticated: false,
    token: null,
    user: null as any,
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const res = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (!res.ok) throw new Error("Login incorrecto");

        const data = await res.json();
        console.log("Login exitoso:", data);

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
