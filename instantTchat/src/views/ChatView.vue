<template>
    <Channel />
    <div class="chat-view">
        <div class="list-chat">
            <h2 v-if="currentChannel">{{ currentChannel.name }}</h2>
            <div v-for="message in messages" :key="message.id" class="message-box">
                <div v-if="message.image">
                    <img :src="message.image" alt="image" />
                </div>
                <div class="message-info">
                    <p>{{ message.author }}</p>
                    <p>{{ formatDate(message.timestamp) }}</p>
                </div>
                <p :style="{ 'text-align': message.author === username ? 'end' : 'start' }">{{ message.content.Text }}</p>
            </div>
        </div>
        <div class="chat-box">
            <textarea v-model="message" id="message" placeholder="Envoyer un message"></textarea>
            <div class="image-preview" v-if="selectedImage">
                <img :src="selectedImage" />
            </div>
            <div class="button-box">
                <button class="send-button" @click="sendMessage">Envoyer</button>
                <button class="add-img" @click="chooseImage">Image</button>
                <input type="file" ref="imageInput" style="display: none" @change="onImageChosen">
            </div>
        </div>
    </div>
    <ChannelParam v-if="currentChannel" :channel="currentChannel" :users="users" :messages="messages" />
</template>
    
<script setup>
    import axios from 'axios';
    import Channel from '../components/Channel.vue'
    import ChannelParam from '../components/ChannelParam.vue';
    import useChannelStore from '../stores/channel-store.js';
    import useMessageStore from '../stores/message-store.js';
    // import useAuthStore from '../stores/auth-store.js';
    import { reactive, computed, toRaw, watchEffect, watch, ref } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const channelId = ref(parseInt(route.params.id, 10));
    const channelStore = useChannelStore();
    const messageStore = useMessageStore();
    const token = localStorage.getItem('token');
    const channels = reactive([]);
    const messages = reactive([]);
    const users = reactive([]);
    const username = ref(localStorage.getItem('username'));
    let $refs;

    watchEffect(() => {
        channelId.value = parseInt(route.params.id, 10);
        console.log('channelId:', channelId.value);
    });

    watchEffect(() => {
        messages.value = messageStore.fetchMessages(channelId.value);
    });

    const initialize = async () => {
        if(token) {
            const dbChannels = await channelStore.fetchChannels(token);
            channels.push(...dbChannels);
        }
    }

    const fetchMessages = async () => {
        if(channels.length === 0) {
            const dbMessages = await messageStore.fetchMessages(route.params.id);
            console.log(dbMessages);
            messages.push(...dbMessages);
        }
    }


    initialize();
    fetchMessages();

    const currentChannel = computed( () => {
        if(channels.length === 0) return null;
        const channelz = toRaw(channels);
        const canal = channelz.find(channel => channel.id === channelId.value);
        const members = canal.users;
        members.forEach(member => {
            users.push(member);
        });
        return canal;
    });

    const data = () => ({
        message: '',
        selectedImage: null
    });
    
    const sendMessage = async () => {
        try {
            let formData = new FormData();
            formData.append('message', message);
            if (selectedImage) {
                formData.append('image', selectedImage);
            }
            const response = await axios.post('/protected/channel//message', formData);
            console.log('Message envoyé en base de données', response);
            message= '';
            selectedImage= null;
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message', error);
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const chooseImage = () => {
        // Ouvrir la fenêtre de sélection de fichier
        const imageInput = $refs.imageInput;
        imageInput.click();
    };
    
    const onImageChosen = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            selectedImage = reader.result;
        };
        reader.readAsDataURL(file);
    };
    
</script>
    
<style scoped>
    .chat-view {
        display: flex;
        flex-direction: column;
        width: 60vw;
        margin: 0 auto;
        padding: 1em;
    }
    .list-chat {
        background-color: #59595966;
        border-radius: 10px;
        width: auto;
        height: 500px;
        padding: 10px;
        margin-bottom: 15px;
    }
    .chat-box {
        width: auto;
        bottom: 2px;
        border-radius: 10px;
        display: flex;
        width: 100%;
    }

    .button-box {
        display: flex;
        flex-direction: column;
    }

    .message-box {
        display: flex;
        flex-direction: column;
        margin: 10px;
        background-color: #59595966;
        border-radius: 10px;
        padding: 10px;
    }

    .message-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    #message {
        resize: none;
        border-radius: 10px;
        background-color: #59595966;
        border: none;
        outline-style: none;
        color: white;
        padding: 10px;
        margin-right: 2px;
        height: 70px;
        width: 100%;
    }

    .send-button, .add-img {
        padding: 5px 10px;
        border: none;
        background-color: #59595966;
        color:#b0b0b0a4;
        margin-bottom: 2px;
        border-radius: 10px;
    }

    .send-button:hover , .add-img:hover {
        background-color: #89898966;
    }
</style>