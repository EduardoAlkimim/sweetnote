<template>
  <div class="flex min-h-screen bg-gray-100">
    <SiderBar />
    <div class="flex-1 p-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div class="flex space-x-4">
          <button class="bg-purple-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-purple-700 transition-colors">
            Recent Activity
          </button>
          <button class="bg-white text-gray-700 px-5 py-2 rounded-full shadow-md border border-gray-300 hover:bg-gray-50 transition-colors">
            Flags <span class="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">2</span>
          </button>
          <button class="bg-white text-gray-700 px-5 py-2 rounded-full shadow-md border border-gray-300 flex items-center hover:bg-gray-50 transition-colors">
            All time
            <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
        <div class="relative">
          <input
            type="text"
            placeholder="Search..."
            class="pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="space-y-4">
        <div
          v-for="activity in activities"
          :key="activity.id"
          class="flex items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div class="flex items-center space-x-4 flex-grow">
            <div class="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0"></div> <div class="flex-shrink-0">
              <img v-if="activity.actionIcon" :src="activity.actionIcon" alt="Action Icon" class="w-8 h-8 object-contain" />
            </div>
            <div>
              <p class="text-gray-800">
                <span class="font-semibold">{{ activity.userName }}</span>
                {{ activity.description }}
                <span v-if="activity.target" class="font-semibold text-purple-700">{{ activity.target }}</span>
                <span v-if="activity.link" class="text-blue-500 hover:underline cursor-pointer">({{ activity.link }})</span>
                <span v-if="activity.messages" class="text-gray-500"> ({{ activity.messages }} messages)</span>
                <span v-if="activity.duration" class="text-gray-500"> ({{ activity.duration }})</span>
              </p>
              <p class="text-sm text-gray-500">Today, {{ activity.time }}</p>
            </div>
          </div>
          <div v-if="activity.mediaType === 'video'" class="ml-auto flex-shrink-0 relative">
            <div class="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded-full">
              {{ activity.mediaDuration }}
            </div>
          </div>
          <div v-else-if="activity.mediaType === 'chat'" class="ml-auto flex-shrink-0">
            <div class="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
            </div>
          </div>
          <div v-else-if="activity.mediaType === 'voice'" class="ml-auto flex-shrink-0">
            <div class="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.26c0 .818.924 1.258 1.597.818l3.197-2.132c.673-.44.673-1.42 0-1.86z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center space-x-2 mt-8">
        <button class="p-2 rounded-full hover:bg-gray-200">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <span class="px-4 py-2 rounded-full bg-purple-600 text-white">1</span>
        <button class="px-4 py-2 rounded-full hover:bg-gray-200 text-gray-700">2</button>
        <button class="px-4 py-2 rounded-full hover:bg-gray-200 text-gray-700">3</button>
        <span class="px-4 py-2 text-gray-500">...</span>
        <button class="px-4 py-2 rounded-full hover:bg-gray-200 text-gray-700">32</button>
        <button class="p-2 rounded-full hover:bg-gray-200">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import SiderBar from '../components/SiderBar.vue';
import { ref } from 'vue';

// Simulate data for the activity list
const activities = ref([
  {
    id: 1,
    userName: 'Talan Kenter',
    // userAvatar: 'https://via.placeholder.com/48/9b59b6/ffffff?text=TK', // REMOVIDO
    description: 'sent a video to',
    target: 'Jaxson Dorwart',
    link: 'Beginner level tutorials',
    time: '14:30PM',
    mediaType: 'video',
    //mediaThumbnail: 'https://via.placeholder.com/128x80/cccccc/ffffff?text=Video',
    mediaDuration: '10:25',
    //actionIcon: '/icons/video-camera.svg'
  },
  {
    id: 2,
    userName: 'Adison Geidt',
    // userAvatar: 'https://via.placeholder.com/48/3498db/ffffff?text=AG', // REMOVIDO
    description: 'had a chat with',
    target: 'Maren Levin',
    messages: 8,
    time: '12:30PM',
    mediaType: 'chat',
    //actionIcon: '/icons/chat-bubble.svg'
  },
  {
    id: 3,
    userName: 'Adison Geidt',
    // userAvatar: 'https://via.placeholder.com/48/3498db/ffffff?text=AG', // REMOVIDO
    description: 'sent a voice message to',
    target: 'Maren Levin',
    duration: '00:54',
    time: '11:05AM',
    mediaType: 'voice',
    //actionIcon: '/icons/microphone.svg'
  },
  {
    id: 4,
    userName: 'Carter Geidt',
    // userAvatar: 'https://via.placeholder.com/48/e74c3c/ffffff?text=CG', // REMOVIDO
    description: 'had a chat with',
    target: 'Nolan Franci',
    messages: 5,
    time: '07:56AM',
    mediaType: 'chat',
    //actionIcon: '/icons/chat-bubble.svg'
  },
  // Add more activities as needed
]);
</script>

<style scoped>
/* No specific styles needed if using Tailwind extensively, but you can add custom ones here */
</style>