<template>
    <Channel />
    <div class="goBack">
        <button @click="goBack()">Accueil</button>
    </div>
    <div class="chat-view" :style="{ backgroundColor: currentChannel?.theme?.primary_color }">
        <h2 class="channel-name" v-if="currentChannel">{{ currentChannel.name }}</h2>
        <div class="list-chat" :style="{ color: currentChannel?.theme?.accent_text_color }" ref="listMessage">
            <div class="loadMoreContainer">
                <button class="btn-loadMore" @click="loadMoreMessages()" :style="{backgroundColor: currentChannel?.theme?.accent_color, color: currentChannel?.theme?.accent_text_color}">Charger plus de messages</button>
            </div>
            <div v-for="message in messages" :key="message.id" class="message-box"
            :style="{ backgroundColor: currentChannel?.theme?.primary_color_dark }">
                <div v-if="message.Image">
                    <img class="chat-img" :src="message.Image" alt="image" />
                </div>
                <div class="message-info"
                    :style="{ color: currentChannel?.theme?.accent_color, 'justify-content': message.author === username ? 'flex-end' : 'flex-start' }">
                    <div class="info-message">
                        <p>{{ message.author }}</p>
                        <p class="date-info">{{ formatDate(message.timestamp) }}</p>
                    </div>
                    <span>
                        <i class="material-icons" v-if="username === currentChannel.creator"
                            @click="openModeratorModal(message)">more_vert</i>
                    </span>
                    <div class="moderator-modal" v-if="showModeratorModal">
                        <div class="moderator-modal-content">
                            <div class="moderator-modal-body">
                                <div class="moderator-box">
                                    <div class="header-moderator">
                                        <h3>Modifier le message</h3>
                                    </div>
                                    <form class="mod-form" @submit.prevent="submitMod">
                                        <textarea v-model="modMessage" :placeholder="modMessage"></textarea>
                                        <div class="moderator-modal-footer">
                                            <button type="submit">Modifier</button>
                                            <button class="close-button"
                                                @click="showModeratorModal = !showModeratorModal">Close</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p :style="{ 'text-align': message.author === username ? 'end' : 'start' }">{{ message.content.Text }}</p>
            </div>
        </div>
        <div class="chat-box" :style="{ color: currentChannel?.theme?.text_color }">
            <textarea v-model="messageText" id="message" @keydown.enter="sendMessage"
                placeholder="Envoyer un message"></textarea>
            <div class="button-box">
                <button class="send-button" @click="sendMessage()"
                    :style="{ backgroundColor: currentChannel?.theme?.primary_color_dark, color: currentChannel?.theme?.accent_text_color }">Envoyer</button>
            </div>
        </div>
    </div>
    <ChannelParam v-if="currentChannel" :users="users" :token="token" @update:channel="refreshCurrentChannel"/>
</template>
    
<script setup>
import Channel from '../components/Channel.vue'
import ChannelParam from '../components/ChannelParam.vue';
import useChannelStore from '../stores/channel-store.js';
import useMessageStore from '../stores/message-store.js';
import { reactive, toRaw, watchEffect, watch, ref, nextTick, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const notifyError = (string) => {
    toast(string, {
        autoClose: 3000,
        position: "top-right",
        type: "error",
        transition: "Vue-Toastification__bounce",
        maxToasts: 20,
        theme: "dark",
    });
}

onMounted(() => {
    window.addEventListener('message-received', handleNewMessage)
});

onUnmounted(() => {
    window.removeEventListener('message-received', handleNewMessage)
});

const handleNewMessage = (event) => {
    // Mettre à jour le composant avec le nouveau message reçu
    const message = event.detail;
    messages.push(message);
    scrollToLastMessage();
}

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
const messageText = ref('');
const selectedImage = ref(null);
const currentChannel = ref(null);
const showModeratorModal = ref(false);
const modMessage = ref('');
const selectedMessage = ref(null);
const displayedMessages = ref(0);
const listMessage = ref(null);

watch(channelId, async (newValue) => {
    console.log('channelId:', newValue);
    await fetchMessages();
});


watchEffect(() => {
    channelId.value = parseInt(route.params.id, 10);
    console.log('channelId:', channelId.value);
});

watchEffect(() => {
    if (channels.length === 0) return;
    const channelz = toRaw(channels);
    const canal = channelz.find(channel => channel.id === channelId.value);
    currentChannel.value = canal;
    channelStore.currentChannel = canal;

    users.length = 0;
    const members = canal.users;
    members.forEach(member => {
        users.push(member);
    });
});

const fetchMessages = async () => {
    // if(channels.length === 0) return null;
    messages.length = 0;
    const dbMessages = await messageStore.fetchMessages(route.params.id);
    console.log(dbMessages);
    messages.push(...dbMessages);
}

const loadMoreMessages = async () => {
    let newTab = [];
    displayedMessages.value += 40;
    const dbMessages = await messageStore.fetchMessages(route.params.id, displayedMessages.value);
    newTab.push(...dbMessages);
    newTab.push(...messages);
    messages.length = 0;
    messages.push(...newTab);
}

const initialize = async () => {
    if (token) {
        const dbChannels = await channelStore.fetchChannels(token);
        channels.push(...dbChannels);
        await fetchMessages();
        await scrollToLastMessage();
    }
}

const refreshCurrentChannel = async () => {
    const dbChannels = await channelStore.fetchChannels(token);
    channels.length = 0;
    channels.push(...dbChannels);
    const channelz = toRaw(channels);
    const canal = channelz.find(channel => channel.id === channelId.value);
    currentChannel.value = canal;
    channelStore.currentChannel = canal;
    users.length = 0;
    const members = canal.users;
    members.forEach(member => {
        users.push(member);
    });
}

initialize();

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
};


const sendMessage = async () => {
    let message;

    const regex = /.(png|jpe?g|gif)$/i;
    if(regex.test(messageText.value)) {
        message = {
            Image: messageText.value,
        }
        console.log(messageText.value);
    } else if (messageText.value === "" || messageText.value === null) {
        notifyError('Votre message ne peut être vide');
        return;
    } else {
        message = {
            Text: messageText.value,
        };
    }
    const newSend = await messageStore.sendMessageToWebSocket(message,channelId.value);
    if(!newSend) {
        console.log(newSend);
        notifyError('Votre message ne peut être vide');
        return;
    } else {
        messageText.value = '';
        selectedImage.value = null;
    }
};

const scrollToLastMessage = async () => {
    await nextTick();
    listMessage.value.scrollTop = listMessage.value.scrollHeight;
};

const goBack = () => {
    router.push('/'); 
};

const connectToWebSocket = async () => {
    await router.isReady();
};

const openModeratorModal = (message) => {
    selectedMessage.value = message;
    modMessage.value = message.content.Text;
    showModeratorModal.value = true;
};

const submitMod = async () => {
    const updatedMessage = {
        channel_id: channelId.value,
        timestamp: selectedMessage.value.timestamp,
        author: selectedMessage.value.author,
        content: {
            Text: modMessage.value,
        }
    };

    const updateSuccess = await messageStore.updateMessage(updatedMessage);

    if (updateSuccess) {
        showModeratorModal.value = false;
        modMessage.value = '';
        selectedMessage.value = null;
        await fetchMessages();
    } else {
        notifyError('Erreur lors de la mise à jour du message');
    }
};

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
    color: var(--main-color);
    text-shadow:
        .5px .25px var(--second-color),
        .5px .5px var(--second-color),
        .5px .75px var(--second-color),
        .5px 1px var(--second-color),
        .5px 1.25px var(--second-color),
        .5px 1.5px var(--second-color),
        .5px 1.75px var(--second-color),
        .5px 2px var(--second-color),
        .5px 2.25px var(--second-color),
        .5px 2.5px 1px var(--second-color),
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
    border-radius: 20px;
}

.loadMoreContainer {
    width: 100%;
    display: flex;
    justify-content: center;
}
.btn-loadMore {
    border: none;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    font-weight: 800;
    cursor: pointer;
    width: 30%;
    opacity: 0.6;
}

.list-chat {
    background-color: #59595966;
    border-radius: 10px;
    width: auto;
    height: 425px;
    padding: 10px;
    margin-bottom: 15px;
    overflow-y: scroll;
    scrollbar-width: none;
    display: flex;
    flex-direction: column;
}

.list-chat::-webkit-scrollbar {
    display: none;
}

.list-chat .message {
    display: flex;
    flex-direction: column;
    margin: 10px;
    background-color: #59595966;
    border-radius: 10px;
    padding: 10px;
}

.info-message {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.date-info {
    margin-left: 10px;
    ;
}

.chat-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
}
.material-icons {
    font-size: 1.5em;
    color: white;
}

.goBack {
    position: absolute;
    top: 16%;
    left: 22%;
}

.goBack button {
    border-style: none;
    border-radius: 20px;
    padding: 5px 10px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    background-color: #ffffff81;
}

.goBack button:hover {
    background-color: #ffffffc0;
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
        word-wrap: break-word;
    }

.message-info {
    display: flex;
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

.send-button,
.add-img {
    padding: 5px 10px;
    border: none;
    background-color: #59595966;
    color: #b0b0b0a4;
    margin-bottom: 2px;
    border-radius: 10px;
}

.send-button:hover,
.add-img:hover {
    background-color: #89898966;
}

.moderator-modal {
    position: absolute;
    top: 20%;
    left: 50%;
    width: 30%;
    height: 30%;
    background-color: rgba(0, 0, 0, 0.693);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
}

.mod-form textarea {
    border-style: none;
    border-radius: 10px;
    padding: 5px;
}

.moderator-modal-footer button {
    margin-right: 2px;
    border-style: none;
    border-radius: 20px;
    padding: 5px 10px;
    font-weight: bold;
}
</style>