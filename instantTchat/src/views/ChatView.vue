<template>
    <Channel />
    <div class="goBack">
        <button @click="goBack()">Retour</button>
    </div>
    <div class="chat-view">
        <h2 class="channel-name" v-if="currentChannel">{{ currentChannel.name }}</h2>
        <div class="list-chat">
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
            <textarea v-model="messageText" id="message" placeholder="Envoyer un message"></textarea>
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
    <ChannelParam v-if="currentChannel" :channel="currentChannel" :users="users" :messages="messages" :token="token" />
</template>
    
<script setup>
    import Channel from '../components/Channel.vue'
    import ChannelParam from '../components/ChannelParam.vue';
    import useChannelStore from '../stores/channel-store.js';
    import useMessageStore from '../stores/message-store.js';
    // import useAuthStore from '../stores/auth-store.js';
    import { reactive, computed, toRaw, watchEffect, watch, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { mapState, mapActions } from 'vuex';

    const route = useRoute();
    const router = useRouter();
    const channelId = ref(parseInt(route.params.id, 10));
    const channelStore = useChannelStore();
    const messageStore = useMessageStore();
    const token = localStorage.getItem('token');
    const channels = reactive([]);
    const messages = reactive([]);
    const users = reactive([]);
    const username = ref(localStorage.getItem('username'));
    const imgRef = ref({});
    // const { messages } = mapState('message-store', ['messages']) // mapping de la propriété messages du state du store
    const { sendMessageToWebSocket } = mapActions('message-store', ['sendMessageToWebSocket']) // mapping de l'action sendMessageToWebSocket du store
    const messageText = ref('');
    const selectedImage = ref(null);

    watchEffect(() => {
        channelId.value = parseInt(route.params.id, 10);
        console.log('channelId:', channelId.value);
    });

    watch(channelId, async () => {
        await fetchMessages();
    });

    const fetchMessages = async () => {
        if(channels.length === 0) return null;
        messages.length = 0;
        const dbMessages = await messageStore.fetchMessages(route.params.id);
        console.log(dbMessages);
        messages.push(...dbMessages);
    }

    const initialize = async () => {
        if(token) {
            const dbChannels = await channelStore.fetchChannels(token);
            channels.push(...dbChannels);
            await fetchMessages();
        }
    }

    initialize();

    const currentChannel = computed( () => {
        users.length = 0;
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
    
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

//Ambroise
    const sendMessage = () => {
        const message = {
            text: messageText.value,
            image: selectedImage.value,
        };
        sendMessageToWebSocket(message)
        messageText.value = '';
        selectedImage.value = null;
    };
    
    const chooseImage = () => {
        // Ouvrir la fenêtre de sélection de fichier
        const imageInput = $imgRef.imageInput;
        imageInput.click();
    };
    
    const onImageChosen = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            selectedImage.value = reader.result;
        };
        reader.readAsDataURL(file);
    };

    // récupération du channel_id et du token
    const goBack = () => {
        router.push('/'); // Naviguer vers la page précédente
    };

    const connectToWebSocket = async () => {
        // Récupération du channel_id et du token
        await router.isReady();
    }

    connectToWebSocket();
    
</script>
    
<style scoped>
    .channel-name {
        text-align: center;
        font-size: 3em;
        font-weight: 800;
        margin: 0;
        margin-bottom: 30px;
        padding: 0;
        color: #ff7575a4;
        text-shadow: 
        .5px .25px #6d2d2da4,
        .5px .5px #6d2d2da4,
        .5px .75px #6d2d2da4,
        .5px 1px #6d2d2da4,
        .5px 1.25px #6d2d2da4,
        .5px 1.5px #6d2d2da4,
        .5px 1.75px #6d2d2da4,
        .5px 2px #6d2d2da4,
        .5px 2.25px #6d2d2da4,
        .5px 2.5px 1px #6d2d2da4,
        .5px 9px 3px rgba(0, 0, 0, 0.4),
        .5px 11px 5px rgba(0, 0, 0, 0.2),
        .5px 12.5px 17.5px rgba(0, 0, 0, 0.2),
        .5px 15px 30px rgba(0, 0, 0, 0.4);
    }
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
        height: 425px;
        padding: 10px;
        margin-bottom: 15px;
    }

    .goBack {
        position: absolute;
        top: 9.6%;
        left: 17vw;
    }
    .goBack button {
        border-style: none;
        border-radius: 20px;
        padding: 5px 10px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        background-color: #ff7575a4;
    }

    .goBack button:hover {
        background-color: #ff7575;
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