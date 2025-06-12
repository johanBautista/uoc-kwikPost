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
    // async fetchUser(userId: string) {
    //   if (!this.token) {
    //     throw new Error("No token, usuario no autenticado");
    //   }
    //   console.log("user", this.token);

    //   const res = await fetch(`http://localhost:3000/user/${userId}`, {
    //     headers: { Authorization: `Bearer ${this.token}` },
    //   });

    //   if (!res.ok) throw new Error("Error al obtener los datos del usuario");

    //   const data = await res.json();
    //   this.user = data;
    //   console.log("Datos del usuario obtenidos:", data);
    // },
  },
});
