<template>
    <div>
        <!-- a formular to create a instant chat channel -->
        <form @submit.prevent="createChannel" class="add-canal">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name" />
            <button type="submit">Create</button>
        </form>
        <Channel />
    </div>
</template>

<script setup>
import useChannelStore from '../stores/channel-store.js';
import { ref } from 'vue';
import Channel from '../components/Channel.vue';
import router from '../router';

const channelStore = useChannelStore();

const token = localStorage.getItem('token');
const username = localStorage.getItem('username');

console.log(username)

const name = ref('');
const primary_color = ref('');
const primary_color_dark = ref('');
const accent_color = ref('');
const text_color = ref('');
const accent_text_color = ref('');
const users = ref('');

const createChannel = async () => {
    const channel = {
        name: name.value,
        img: "https://example.com/image.jpg",
        // theme: {
        //     primary_color: primary_color.value,
        //     primary_color_dark: primary_color_dark.value,
        //     accent_color: accent_color.value,
        //     text_color: text_color.value,
        //     accent_text_color: accent_text_color.value
        // },
        // users: users.value
    }
    await channelStore.createChannel(token, channel);
    router.push('/');
}
</script>

<style scoped>
.add-canal {
    display: flex;
    flex-direction: column;
    padding: 1em;
    background-color : rgb(124, 121, 121);
    width : 500px;
    height: 350px;
    border-radius: 15px;
}
</style>