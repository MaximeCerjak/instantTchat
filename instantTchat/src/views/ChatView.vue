<template>
    <Channel />
    <div class="goBack">
        <button @click="goBack()">Retour</button>
    </div>
    <div class="chat-container">
        <div class="list-chat">
            <div v-for="message in messages" :key="message.id">{{ message.text }}</div>
        </div>
        <div class="chat-box">
            <textarea v-model="messageText" id="message" cols="100" rows="10" placeholder="Envoyer un message"></textarea>
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
</template>
    
<script setup>
    import Channel from '../components/Channel.vue'
    import { ref } from 'vue'
    import { mapState, mapActions } from 'vuex'
    import { useRouter } from 'vue-router'


    const { messages } = mapState('message-store', ['messages']) // mapping de la propriété messages du state du store
    const { sendMessageToWebSocket } = mapActions('message-store', ['sendMessageToWebSocket']) // mapping de l'action sendMessageToWebSocket du store

    const messageText = ref('');
    const selectedImage = ref(null);

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
        const imageInput = $refs.imageInput;
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
    const route = useRouter();
    const channel_id = ref('');
    const token = ref('');

    const goBack = () => {
        route.go(-1); // Naviguer vers la page précédente
    };

    const connectToWebSocket = async () => {
    // Récupération du channel_id et du token
    await route.isReady()
    channel_id.value = route.params;
    token.value = localStorage.getItem('token');
    }

    connectToWebSocket();
    
</script>
    
<style scoped>

    .goBack {
        position: absolute;
        top: 10%;
        right: 10%;
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

    .list-chat {
        background-color: #59595966;
        border-radius: 10px;
        width: 850px;
        height: auto;
        min-height: 400px;
    }
    
    .chat-box {
        position: absolute;
        bottom: 2px;
        border-radius: 10px;
        display: flex;
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