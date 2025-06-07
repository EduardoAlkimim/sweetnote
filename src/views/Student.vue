<!-- src/views/Dashboard.vue -->
<template>
  <div class="flex">
    <SiderBar /> <!-- Aqui você mostra o componente -->
    <div class="flex-1 p-4">
      <h1 class="text-2xl font-bold">student</h1>
      <!-- Conteúdo principal do dashboard -->
    </div>
  </div>
</template>

<script setup>
import SiderBar from '../components/SiderBar.vue';
</script>

<style scoped>
/* estilos se precisar */
</style>
