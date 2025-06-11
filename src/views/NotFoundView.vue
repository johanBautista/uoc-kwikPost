<template>
  <div>
    <img
      class="not-found"
      src="../assets/notfound.jpg"
      alt="pagina no encontrada"
    />
    <small class="not-found-text">404 - Página no encontrada</small>
  </div>
</template>
<script setup></script>
<style scoped>
.not-found {
  width: 100%;
  height: auto;
  width: -webkit-fill-available;
  width: -moz-available;
  width: fill-available;
}
.not-found-text {
  display: flex;
  justify-content: center;
  color: rgba(182, 182, 182, 0.58);
  margin-top: 20px;
}
</style>
