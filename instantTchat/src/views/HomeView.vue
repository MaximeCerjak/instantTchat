<script setup>
// import ChannelSidebar from '../components/ChannelSidebar.vue';
import Channel from '../components/Channel.vue';
import useAuthStore from '../stores/auth-store';
import { ref, onMounted } from 'vue';

const authStore = useAuthStore();
const username = localStorage.getItem('username');

</script>

<template>
  <div>
    <h1>Salut {{username}}</h1>
    <Channel />
  </div>
   <div>
    <div v-for="(message, index) in messages" :key="index">{{ message }}</div>
    <input type="text" v-model="newMessage" placeholder="Votre message">
    <button @click="sendMessage">Envoyer</button>
  </div>
</template>
