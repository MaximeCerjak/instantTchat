<template>
    <div>
        <!-- a formular to create a instant chat channel -->
        <form @submit.prevent="createChannel">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name" />
            <label for="img">Image</label>
            <input type="text" id="img" v-model="img" />
            <button type="submit">Create</button>
        </form>
    </div>
</template>

<script setup>
import useChannelStore from '../stores/channel-store.js';
import useAuthStore from '../stores/auth-store.js';
import { ref } from 'vue';

const channelStore = useChannelStore();
const authStore = useAuthStore();
const token = authStore.token;
const username = authStore.user.username;

console.log(username)

const name = ref('');
const img = ref('');
const creator = ref('');
const primary_color = ref('');
const primary_color_dark = ref('');
const accent_color = ref('');
const text_color = ref('');
const accent_text_color = ref('');
const users = ref('');

const createChannel = async () => {
    const channel = {
        name: name.value,
        img: img.value,
        creator: creator.value,
        theme: {
            primary_color: primary_color.value,
            primary_color_dark: primary_color_dark.value,
            accent_color: accent_color.value,
            text_color: text_color.value,
            accent_text_color: accent_text_color.value
        },
        users: users.value
    }
    await channelStore.createChannel(token, channel);
}
</script>

<style scoped>

</style>