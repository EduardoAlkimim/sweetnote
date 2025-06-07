<template>
  <div class="flex h-screen">
    <div class="hidden md:block w-[55%] h-screen">
      <img
        src="/src/assets/img/signIn.svg"
        alt="Imagem"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="w-full md:w-[45%] flex items-center justify-center">
      <div class="w-full max-w-md px-6">
        <h1 class="text-4xl font-krona font-bold mb-2">
          Don't have an <br />
          account yet?
        </h1>
        <p class="text-gray-500 mb-8">Let's start that journey!</p>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div>
            <input
              v-model="fullName"
              type="text"
              placeholder="Full Name"
              class="mt-1 w-full border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="mt-1 w-full border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="mt-1 w-full border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              class="mt-1 w-full border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div class="flex items-center space-x-2 mt-4">
            <input
              v-model="acceptTerms"
              type="checkbox"
              id="acceptTerms"
              class="border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <label for="acceptTerms" class="text-sm text-gray-700">
              Eu aceito os termos de uso
            </label>
          </div>

          <button
            type="submit"
            class="w-full bg-roxoCustom text-white py-4 rounded-full hover:bg-purple-700 transition"
          >
            Sign Up
          </button>

          <p
            v-if="message"
            :class="{'text-green-600': success, 'text-red-600': !success}"
            class="mt-4 text-center"
          >
            {{ message }}
          </p>

          <div class="flex justify-center">
            <router-link
              to="/Login"
              class="text-sm text-roxoCustom hover:underline"
              >I have an account?</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)
const message = ref('')
const success = ref(false)
const router = useRouter()

const API_URL = import.meta.env.SERVER_API || 'http://localhost:3000'

const handleSubmit = async () => {
  message.value = ''
  success.value = false

  if (password.value !== confirmPassword.value) {
    message.value = 'As senhas não coincidem!'
    success.value = false
    return
  }

  try {
    const response = await axios.post(`${API_URL}/register`, {
      full_name: fullName.value,
      email: email.value,
      password: password.value,
    })

    message.value = response.data.message
    success.value = true

    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: fullName.value,
          email: email.value,
        })
      )
    }

    // Redireciona após 2 segundos
    setTimeout(() => {
      router.push('/home')
    }, 2000)
  } catch (error) {
    if (error.response && error.response.data.error) {
      message.value = error.response.data.error
    } else if (error.response && error.response.data.message) {
      message.value = error.response.data.message
    } else {
      message.value = 'Erro ao se conectar com o servidor.'
    }
    success.value = false
  }
}
</script>
