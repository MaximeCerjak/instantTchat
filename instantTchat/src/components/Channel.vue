<template>
    <div class="sidebar"> 
        <div class="sb-channels">
            <h2>Channels</h2>
            <h3>Mes canaux</h3>
            <ul class="my-canals">
                <li v-for="channel in myChannels" :key="channel.id" @click="showCanal(channel.id)">
                        {{ channel.name }}
                        
                        <span class="avatar-block"><span class="avatar"><img class="img" :src="channel.img"></span></span>
                </li>
            </ul>
            <h3>Les canaux invités</h3>
            <ul class="other-canals">
                <li v-for="channel in otherChannels" :key="channel.id" @click="showCanal(channel.id)">
                        {{ channel.name }}
                        <span class="avatar-block"><span class="avatar"><img :src="channel.img"></span></span>
                </li>
            </ul>
            <button @click="printChannels">Print channels</button>
            <!-- a button root to create channel formular -->
            <button @click="createChannel">+</button>
        </div>  
    </div>
</template>

<script setup>
import useChannelStore from '../stores/channel-store.js';
import useAuthStore from '../stores/auth-store.js';
import useMessageStore from '../stores/message-store';
import { ref, reactive, computed } from 'vue';
import router from '../router'


const channelStore = useChannelStore();
const authStore = useAuthStore();
const messageStore = useMessageStore();

const token = localStorage.getItem('token');
const username = authStore.username;
const channels = reactive([]);

const myChannels = computed(() => {
    const username = localStorage.getItem('username');
    return channels.filter(channel => channel.creator === username);
});

const otherChannels = computed(() => {
    const username = localStorage.getItem('username');
    return channels.filter(channel => channel.creator !== username);
});


const showCanal = (id) => {
    const channelId = id;
    const token = localStorage.getItem('token');
    try {
        messageStore.connectToWebSocket(channelId, token)
    } catch (error) {
        console.log(error)
    } finally{
        router.push(`/canal/${channelId}`)
    }
}

const initialize = async () => {
    if(token) {
        const dbChannels = await channelStore.fetchChannels(token);
        channels.push(...dbChannels);
    }
}


/*Function print channels in console*/
const printChannels = async () => {
    const channels = await channelStore.fetchChannels(token);
    console.log(channels, username);
}

const createChannel = () => {
    router.push({ name: 'add-canal' })
}

initialize();

</script>

<style scoped>
.sidebar {
    display:flex;
    flex-direction: row;
    position: absolute;
    top: 8.7%;
    left: 0;
    height: 100%;
    background-color: #333;
    width: 20vw;
}

.sb-channels {
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #181818;
    color: grey;
    text-align: center;
    overflow-y:scroll;
    overflow-x: hidden;
    margin-bottom: 50px;
    padding: 10px 20px 10px 35px;
    text-align: center;
    scrollbar-width: none;
    scrollbar-color: #252525 #181818;
}

h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
}

h3 {
    font-size: 1rem;
    margin-bottom: 15px;
    margin-top: 30px;
    background-color: #333;
    width: 100%;
    padding: 5px;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    margin-bottom: 5px;
}

.avatar-block {
    margin: 0 auto;
}
.img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
}

router-link {
    color: black;
    text-decoration: none;
}

button {
    border-style: none;
    border-radius: 20px;
    background-color: #b0b0b0a4;
    margin-bottom: 5px;
    color: white;
    padding: 5px 12px;
    font-family: Arial, Helvetica, sans-serif;
}
</style>