<template>
    <div class="list-chat">
        <!--TODO: affichage des messages précédents-->
    </div>
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
    let $refs;
    
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
            const response = await axios.post('/protected/channel/{channel_id/message}', formData);
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
    .list-chat {
        background-color: #59595966;
        border-radius: 10px;
        width: 850px;
        height: 500px;
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