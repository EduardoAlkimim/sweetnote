<template>
  <div class="h-screen w-60 bg-white shadow-lg flex flex-col justify-between">
    <!-- Top section -->
    <div>
      <!-- Logo -->
      <div class="p-10 flex items-center">
        <img class="w-30 h-16" src="../assets/img/sweetnote.svg" alt="Logo" />
      </div>

      <!-- Academy Info -->
      <div class="mx-4 mb-4 p-3 rounded-xl bg-gray-100 flex items-center space-x-3 shadow-sm">
        <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" alt="Academy Logo"
          class="w-10 h-10 rounded-full border border-violet-100 bg-white p-2" />
        <div>
          <div class="font-montserrat text-sm font-semibold">{{ user.name || 'Usuário' }}</div>
          <div class="font-montserrat text-xs text-gray-500">{{ user.email }}</div>
        </div>
      </div>

      <hr />

      <nav class="px-5 space-y-2 p-10">
        <div v-for="item in menuItems" :key="item.name" @click="selectItem(item.name)" :class="[
          'flex justify-between items-center rounded-lg p-2 cursor-pointer transition-all',
          activeItem === item.name
            ? 'bg-purple-100 text-purple-700 font-semibold'
            : 'text-gray-600 hover:text-black hover:font-semibold'
        ]">
          <div class="flex items-center space-x-2">
            <img v-if="item.icon" :src="item.icon" alt="" class="w-5 h-5" />
            <span class="font-montserrat text-[12px]">{{ item.label }}</span>
          </div>
          <span v-if="item.badge" class="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {{ item.badge }}
          </span>
        </div>
      </nav>
    </div>

    <!-- Log out -->
    <div class="px-4 py-6">
      <button class="flex items-center space-x-2 text-gray-700 hover:text-red-500" @click="handleLogout">
        <img src="../assets/img/icons/Leave.svg" alt="Logout" class="w-5 h-5" />
        <span class=" text-[12px] font-montserrat">Log Out</span>
      </button>
    </div>
  </div>
</template>

<script>
import DashboardIcon from '../assets/img/icons/Dashboard.svg'
import TeacherIcon from '../assets/img/icons/Teacher.svg'
import StudentIcon from '../assets/img/icons/Student.svg'
import ConfigIcon from '../assets/img/icons/Config.svg'

export default {
  name: 'Sidebar',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user') || '{}'),
      menuItems: [
        { name: 'Dashboard', label: 'Dashboard', icon: DashboardIcon },
        { name: 'Teachers', label: 'Teachers', icon: TeacherIcon },
        { name: 'Student', label: 'Students', icon: StudentIcon },
        { name: 'Config', label: 'Settings', icon: ConfigIcon },
      ],
    };
  },

  computed: {
    activeItem() {
      return this.$route.name;
    },
  },

  methods: {
    selectItem(name) {
      this.$router.push({ name });
    },
    handleLogout() {
      localStorage.clear();
      this.$router.push('/login');
    },
  },
};
</script>
