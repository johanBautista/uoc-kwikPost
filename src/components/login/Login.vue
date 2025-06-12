<template>
  <div class="login-container">
    <h2>Bienvenido</h2>
    <p>Inicia sesión en tu cuenta</p>

    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="form-group">
        <label for="username">Nombre de usuario:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          @blur="validateUsername"
          @input="validateUsername"
          :class="{
            'is-invalid': usernameError,
            'is-valid': !usernameError && username,
          }"
          placeholder="Tu nombre de usuario"
          required
        />
        <div v-if="usernameError" class="error-message">
          {{ usernameError }}
        </div>
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          @blur="validatePassword"
          @input="validatePassword"
          :class="{
            'is-invalid': passwordError,
            'is-valid': !passwordError && password,
          }"
          placeholder="Mín. 8 caracteres, mayús, minús, número"
          required
        />
        <div v-if="passwordError" class="error-message">
          {{ passwordError }}
        </div>
      </div>

      <button type="submit" class="btn-login">Iniciar Sesión</button>
      <p class="forgot-password"><a href="#">¿Olvidaste tu contraseña?</a></p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  isValidPassword,
  isValidUsername,
} from "../../utils/loginFormValidator";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const username = ref("");
const password = ref("");
const usernameError = ref("");
const passwordError = ref("");
const error = ref("");

const authStore = useAuthStore();
const router = useRouter();

const validateUsername = () => {
  if (!username.value) {
    usernameError.value = "El nombre de usuario es obligatorio.";
  } else if (!isValidUsername(username.value)) {
    usernameError.value =
      "El nombre de usuario debe tener al menos 3 caracteres.";
  } else {
    usernameError.value = "";
  }
};

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = "La contraseña es obligatoria.";
  } else if (!isValidPassword(password.value)) {
    passwordError.value =
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.";
  } else {
    passwordError.value = "";
  }
};

const isFormValid = computed(() => {
  return (
    !usernameError.value &&
    username.value &&
    !passwordError.value &&
    password.value
  );
});

const handleSubmit = async () => {
  validateUsername();
  validatePassword();

  if (isFormValid.value) {
    try {
      error.value = "";
      await authStore.login(username.value, password.value);
      router.push("/profile");
    } catch (err) {
      error.value = err.message || "Error al iniciar sesión";
    }
  } else {
    console.log("Formulario de login inválido. Por favor, revisa los errores.");
  }
};
</script>

<style scoped>
.login-container {
  padding: 30px;
  text-align: center;
  width: 350px;
  margin: 50px auto;
}

h2 {
  color: var(--black-color);
  margin-bottom: 10px;
}

p {
  color: var(--light-color);
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  color: var(--grey-color);
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  box-sizing: border-box;
}

input.is-invalid {
  border-color: var(--error-color);
  box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.25);
}

.error-message {
  color: var(--error-color);
  font-size: 0.85em;
  margin-top: 5px;
  height: 18px;
}

input.is-valid {
  border-color: green;
  box-shadow: 0 0 0 0.2rem rgba(0, 128, 0, 0.25);
}

.btn-login {
  background-color: var(--primary-color);
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  width: 100%;
  margin-top: 20px;
}

.btn-login:hover {
  background-color: var(--primary-color-dark);
}

.forgot-password {
  margin-top: 15px;
  font-size: 0.9em;
}

.forgot-password a {
  color: var(--primary-color);
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}
</style>
