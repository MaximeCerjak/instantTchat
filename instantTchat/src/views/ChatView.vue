<template>
    <div class="list-chat">
        <h2 v-if="currentChannel">{{ currentChannel.name }}</h2>
        <!--TODO: affichage des messages précédents-->
    </div>
    <Channel />
    <div class="chat-box">
        <textarea v-model="message" id="message" cols="100" rows="10" placeholder="Envoyer un message"></textarea>
        <div class="image-preview" v-if="selectedImage">
            <img :src="selectedImage" />
        </div>
        <div class="button-box">
            <button class="send-button" @click="sendMessage">Envoyer</button>
            <button class="add-img" @click="chooseImage">Image</button>
            <input type="file" ref="imageInput" style="display: none" @change="onImageChosen">
        </div>
    </div>
</template>
    
<script setup>
    import axios from 'axios';
    import Channel from '../components/Channel.vue'
    import useChannelStore from '../stores/channel-store.js';
    // import useAuthStore from '../stores/auth-store.js';
    import { reactive, computed, toRaw, watchEffect, ref } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const channelId = ref(parseInt(route.params.id, 10));
    const channelStore = useChannelStore();
    const token = localStorage.getItem('token');
    const channels = reactive([]);
    let $refs;

    // watch(route.params, (newParams) => {
    //     channelId.value = parseInt(newParams.id, 10);
    //     console.log(channelId);
    // });

    watchEffect(() => {
        channelId.value = parseInt(route.params.id, 10);
        console.log('channelId:', channelId.value);
    });

    const initialize = async () => {
        if(token) {
            const dbChannels = await channelStore.fetchChannels(token);
            channels.push(...dbChannels);
        }
    }

    initialize();

    const currentChannel = computed( () => {
        if(channels.length === 0) return null;
        const channelz = toRaw(channels);
        console.log(channelz);
        const canal = channelz.find(channel => channel.id === channelId.value);
        console.log(canal)
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

    Channel {
        margin-right: 1em;
    }
    .list-chat {
        background-color: #59595966;
        border-radius: 10px;
        width: 65vw;
        height: 500px;
        margin: 0 auto 0 20vw;
    }
    .chat-box {
        width: 66.5vw;
        position: absolute;
        bottom: 2px;
        border-radius: 10px;
        display: flex;
        margin: 0 auto 0 6.5vw;
    }

    .button-box {
        display: flex;
        flex-direction: column;
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
        width: calc(100% - 100px);
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