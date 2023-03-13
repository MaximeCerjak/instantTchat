<template>
    <div class="sidebar"> 
        <div class="sb-channels">
            <h2>Channels</h2>
            <ul>
                <li v-for="channel in channels" :key="channel.id">
                    {{ channel.name }}
                    <span class="avatar-block"><span class="avatar">{{ channel.name.charAt(0).toUpperCase() }}</span></span>
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
import { ref, reactive } from 'vue';
import router from '../router'


const channelStore = useChannelStore();
const authStore = useAuthStore();

const token = localStorage.getItem('token');
const username = authStore.username;
const channels = reactive([]);


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


const canals = [
    {
        "id": 54,
        "name": "OurChannel",
        "img": "https://example.com/image.png",
        "creator": "jsos10",
        "theme": {
            "primary_color": "#E91E63",
            "primary_color_dark": "#C2185B",
            "accent_color": "#00BCD4",
            "text_color": "#212121",
            "accent_text_color": "#FFFFFF"
        },
        "users": [
            "adupont01"
        ]
    },
    {
        "id": 55,
        "name": "OurChannel2",
        "img": "https://example.com/image.png",
        "creator": "jsos10",
        "theme": {
            "primary_color": "#E91E63",
            "primary_color_dark": "#C2185B",
            "accent_color": "#00BCD4",
            "text_color": "#212121",
            "accent_text_color": "#FFFFFF"
        },
        "users": [
            "adupont01"
        ]
    }
]

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
    width: 26%;
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

.sb-members {
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px 20px;
    background-color: #252525;
    width: 85%;
    color: whitesmoke;
    width: 100%;
    overflow-y:scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    scrollbar-color: #252525 #181818;
}

.header-members {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    font-size: 1.2rem;
}

h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    margin-bottom: 5px;
}

router-link {
    color: black;
    text-decoration: none;
}

.member-li {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0;
    width:100%;
}

.member-ul {
    width: 100%;
}

.delete-button {
    display:flex;
    justify-content: center;
    align-items: center;
    background-color: #333;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    color: #ccc;
    font-weight: bold;
    font-size: 0.8rem;
}

.delete-button:hover {
    background-color: #dc3545;
}

.span-grp {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.btn-grp {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 0;
}

</style>