<script setup>
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
</template>
