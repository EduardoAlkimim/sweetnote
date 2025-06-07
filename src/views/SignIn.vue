<template>
  <div class="flex h-screen">
    <div class="hidden md:block w-[55%] h-screen">
      <img src="/src/assets/img/signIn.svg" alt="Imagem" class="w-full h-full object-cover" />
    </div>

    <div class="w-full md:w-[45%] flex items-center justify-center">
      <div class="w-full max-w-md px-6">
        <h1 class="text-4xl font-krona font-bold mb-2">Sign In<br />to your <br /> account</h1>
        <p class="text-gray-500 mb-8">Fill up your academy details</p>

        <form class="space-y-4" @submit.prevent="handleLogin">
          <div>
            <input v-model="email" type="email" placeholder="Email"
              class="mt-1 w-full border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required />
          </div>

          <div>
            <input v-model="password" type="password" placeholder="Password"
              class="mt-1 w-full border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required />
          </div>

          <div v-if="errorMessage" class="text-red-600 text-sm mb-2">{{ errorMessage }}</div>

          <div class="flex justify-end">
            <router-link to="/Forgot" class="text-sm text-roxoCustom hover:underline">Forgot Password?</router-link>
          </div>

          <button type="submit"
            class="w-full bg-roxoCustom text-white py-4 rounded-full hover:bg-purple-700 transition">
            Sign In
          </button>

          <div class="flex justify-center">
            <router-link to="/Register" class="text-sm text-roxoCustom hover:underline">Don't have
              account?</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    errorMessage.value = ''

    //try to login with email

    const response = await axios.post('http://localhost:3000/login', {
      email: email.value,
      password: password.value,
    });

    console.log('Response data:', response.data); // <-- Adicione esse console.log para ver o que vem do backend

    if (response.data.message === 'Login bem-sucedido') {
      localStorage.setItem('token', response.data.token);

      // Para garantir que sempre tenha algo, use email como fallback:
      localStorage.setItem('user', JSON.stringify({
        name: response.data.full_name || response.data.name || email.value,
        email: email.value,
      }));

      router.push('/dashboard');
    } else {
      errorMessage.value = 'Falha no login, tente novamente.';
    }




  } catch (error) {
    console.log('Erro ao fazer login:', error)

    if (error.response && error.response.data.error) {
      errorMessage.value = error.response.data.error
    } else if (error.response && error.response.data.message) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = 'Erro ao conectar com o servidor'
    }
  }
}
</script>
