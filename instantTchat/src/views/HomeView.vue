<script setup>
// import ChannelSidebar from '../components/ChannelSidebar.vue';
import Channel from '../components/Channel.vue';
import useAuthStore from '../stores/auth-store';
import Chat from '../components/Chat.vue';

const authStore = useAuthStore();
const user = authStore.user;

console.log(authStore);
</script>

<template>
  <main>
    <Channel />
    <Chat />
  </main>
</template>
