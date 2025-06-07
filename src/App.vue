<script setup>
import { RouterView } from 'vue-router'
</script>

<template>

 <div v-if="!$route.meta.hideTopNav" class="top-nav">
  <router-link to="/Login">Login</router-link> |
  <router-link to="/Forgot">Esqueci minha senha</router-link>
</div>


  <router-view />
</template>

