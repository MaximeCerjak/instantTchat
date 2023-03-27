<template>
    <div class="sidebar-channel-param">
        <div class="handleChannel">
            <h2 :style="{ color: channel?.theme?.accent_text_color }">{{ channel.creator }}</h2>
            <h3 :style="{ color: channel?.theme?.accent_color }">{{ channel.name }}</h3>
            <button @click="showUpdate">Modifier le canal</button>
            <button @click="showDelete">Supprimer le canal</button>
            <button @click="showInvit">Inviter des membres</button>
        </div>
        <div class="users-list">
            <h2>Utilisateurs</h2>
            <ul>
                <li v-for="member in members" :key="member.id">
                    <button class="ban-btn" @click="showBan(member)">x</button>{{ member }}
                </li>
            </ul>
        </div>
    </div>
    <div v-if="openUpdateModal" class="update-mod" @click="handleClickOutside">
        <div ref="modalContent" class="mod-container">
            <h2>Modifier le canal</h2>
            <form @submit.prevent="submitUpdateForm" class="addUserForm">
                <label for="channelName">Nom du channel</label>
                
                <input type="text" :value="currentChannel.name" readonly>
                <input type="text" id="channelName" v-model="updateName">
                <label for="channelImg">Image du channel</label>
                <input type="text" :value="currentChannel.img" readonly>
                <input type="text" id="channelImg" v-model="updateImg">
                <div class="btn-box">
                    <button class="valid-btn" type="submit">Confirmer</button>
                    <button class="cancel-btn" @click="cancelUpdate">Annuler</button>
                </div>
            </form>
        </div>
    </div>
    <div v-if="openDeleteModal" class="delete-mod" @click="handleClickOutside">
        <div ref="modalContent">
            <p>Êtes-vous sûr de vouloir supprimer ce canal ?</p>
            <div class="btn-box">
                <button class="del-btn" @click="confirmDelete">Confirmer</button>
                <button class="cancel-btn" @click="cancelDelete">Annuler</button>
            </div>
        </div>
    </div>
    <div v-if="openInvitModal" class="invit-mod" @click="handleClickOutside">
        <div ref="modalContent" class="mod-container">
            <h2>Inviter des membres</h2>
            <form @submit.prevent="submitForm" class="addUserForm">
                <label for="username">Nom d'utilisateur</label>
                <input type="text" id="username" v-model="userAdd">
                <div class="btn-box">
                    <button class="valid-btn" type="submit">Confirmer</button>
                    <button class="cancel-btn" @click="cancelInvit">Annuler</button>
                </div>
            </form>
        </div>
    </div>
    <div v-if="openBanModal" class="delete-mod" @click="handleClickOutside">
        <div>
            <p>Êtes-vous sûr de vouloir bannir {{ banMember }} ?</p>
            <div class="btn-box">
                <button class="del-btn" @click="confirmBan()">Confirmer</button>
                <button class="cancel-btn" @click="cancelBan">Annuler</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import useChannelStore from '../stores/channel-store';
import { useRouter, useRoute } from "vue-router";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const channelStore = useChannelStore();
const currentChannel = computed(() => channelStore.currentChannel);
const router = useRouter();
const modalContent = ref(null);
const userAdd = ref('');
const updateName = ref('');
const updateImg = ref('');
const banMember = ref("");
const route = useRoute();

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

const properties = defineProps({
    users: {
        type: Array,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

const channel = ref(currentChannel.value);
const members = ref(channel.value.users);
const token = properties.token
const openUpdateModal = ref(false);
const openDeleteModal = ref(false);
const openInvitModal = ref(false);
const openBanModal = ref(false);

watch(currentChannel, (newChannel) => {
    console.log("newChannel", JSON.stringify(newChannel, null, 2));
    channel.value = newChannel;
    members.value = newChannel.users;
});
const showUpdate = () => {
    openUpdateModal.value = true;
}
const cancelUpdate = () => {
    openUpdateModal.value = false;
}
const showDelete = () => {
    openDeleteModal.value = true;
}

const cancelDelete = () => {
    openDeleteModal.value = false;
}

const confirmDelete = async () => {
    const deletion = await channelStore.deleteChannel(token, channel.value.id, channel.value.creator);
    console.log(deletion)
    if (!deletion) {
        notifyError("Vous ne pouvez supprimer que les canaux que vous avez créés !");
    } else {
        openDeleteModal.value = false;
        router.push({ name: 'home' });
    }
}

const showBan = (id) => {
    openBanModal.value = true
    banMember.value = id
}

const cancelBan = () => {
    openBanModal.value = false;
}

const confirmBan = async () => {
    const channelCreator = channel.value.creator;
    const token = localStorage.getItem('token');
    console.log(token);
    const ban = await channelStore.removeUserFromChannel(token, banMember.value, channel.value.id, channelCreator);
    if (!ban) {
        notifyError("Vous ne pouvez bannir des membres que dans vos salons personels !");
        openBanModal.value = false;
        return;
    }
    openBanModal.value = false;
    members.value = members.value.filter(member => member !== banMember.value);
}

const showInvit = () => {
    openInvitModal.value = true;
}

const cancelInvit = () => {
    openInvitModal.value = false;
}

const submitUpdateForm = async () => {

  
    const params = {
        name: updateName.value,
        img: updateImg.value,
        theme :  { 
          primary_color: "",
          primary_color_dark: "",
          accent_color: "", 
          text_color: "",
          accent_text_color: ""
        } 
    }

    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const channelCreator = channel.value.creator;
    const channelId = channel.value.id;
    console.log( token,  channelId, params)

    if(channelCreator === user){
      const invitation = await channelStore.updateChannel(token,channelId,params);
      openUpdateModal.value = false;
        members.value.push(user);
        userAdd.value = '';
    }else{
      notifyError("Vous ne pouvez pas modifier les canaux que vous n'avez pas créés !");
    }

  
}

const submitForm = async () => {
    const params = {
        username: userAdd.value,
        channel_id: channel.value.id
    }
    const user = params.username;
    const token = localStorage.getItem('token');
    const channelCreator = channel.value.creator;
    const channelId = channel.value.id;

    const invitation = await channelStore.addUserToChannel(token, channelId, channelCreator, params, user);

    if (!invitation) {
        notifyError("Vous ne pouvez inviter des membres que dans vos salons personels !");
    } else {
        openInvitModal.value = false;
        members.value.push(user);
        userAdd.value = '';
    }
}


const handleClickOutside = (e) => {
    if (modalContent.value && !modalContent.value.contains(e.target)) {
        openDeleteModal.value = false;
        openInvitModal.value = false;
        openUpdateModal.value = false;
    }
}

</script>

<style scoped>
.sidebar-channel-param {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 8.7%;
    right: 0;
    height: 100%;
    background-color: #181818;
    width: 15vw;
    color: rgb(175, 175, 175);
}

.handleChannel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.handleChannel button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    margin: 10px 0;
    border-radius: 10px;
    background-color: #59595966;
    border: none;
    outline-style: none;
    color: white;
    font-size: 1rem;
    margin-right: 2px;
    cursor: pointer;
    padding: 1rem;
}

.handleChannel h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
}

.users-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #000000;
    overflow-y: scroll;
    scrollbar-width: none;
    padding-top: 10px;
    padding-bottom: 60px;
}

.users-list li {
    list-style: none;
    display: flex;
}

.update-mod{
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}

.delete-mod {
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}

.invit-mod {
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}

.delete-mod div {
    background-color: #181818;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.delete-mod p {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: rgb(214, 213, 213);
}

.btn-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
}

.btn-box button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    margin: 10px 0;
    border-radius: 10px;
    border: none;
    outline-style: none;
    color: white;
    font-size: 1rem;
    margin-right: 2px;
    cursor: pointer;
    padding: 1rem;
}

.del-btn {
    background-color: #ff0000;
}

.del-btn:hover {
    background-color: #7e0101;
}

.cancel-btn {
    background-color: #59595966;
}

.cancel-btn:hover {
    background-color: #292929;
}

.valid-btn {
    background-color: rgba(98, 221, 27, 0.822);
}

.valid-btn:hover {
    background-color: rgba(58, 131, 15, 0.6);
}

.ban-btn {
    background-color: #ff0000;
    color: #FFFFFF;
    margin-right: 5px;
    border-radius: 13px;
    height: 25px;
    width: 25px;
    padding: 0px;
    padding-bottom: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.mod-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #181818;
    padding: 20px;
    border-radius: 10px;
    color: rgb(214, 213, 213);
    width: 30%;
}

.addUserForm {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 20px;
    border-radius: 10px;
    color: rgb(214, 213, 213);
    width: 90%;
}

.addUserForm h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
}

.addUserForm input {
    width: 100%;
    height: 50px;
    margin: 10px 0;
    border-radius: 10px;
    border: none;
    outline-style: none;
    font-size: 1rem;
    margin-right: 2px;
    padding: 1rem;
    background-color: rgb(214, 213, 213);
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.25);
}
</style>