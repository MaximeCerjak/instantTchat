<script setup>
// import ChannelSidebar from '../components/ChannelSidebar.vue';
import Channel from '../components/Channel.vue';
import useAuthStore from '../stores/auth-store';

const authStore = useAuthStore();
const user = authStore.user;

console.log(authStore);
</script>

<template>
  <main>
    <Channel />
  </main>
</template>
