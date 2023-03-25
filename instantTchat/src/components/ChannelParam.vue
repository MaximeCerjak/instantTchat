<template>
    <div class="sidebar-channel-param">
        <div class="handleChannel">
            <h2>{{ channelName }}</h2>
            <button @click="showDelete">Supprimer le canal</button>
            <button @click="showInvit">Inviter des membres</button>
        </div>
        <div class="users-list">
            <h2>Users</h2>
            <ul>
                <li v-for="member in members" :key="member.id">
                    <button class="ban-btn" @click="showBan(member)">x</button>{{ member }}
                </li>
            </ul>
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
import { ref, computed } from 'vue';
import useChannelStore from '../stores/channel-store';
import { useRouter } from "vue-router";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const channelStore = useChannelStore();
const router = useRouter();
const modalContent = ref(null);
const userAdd = ref('');
const banMember = ref("")

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
    channel: {
        type: Object,
        required: true
    },
    users: {
        type: Array,
        required: true
    },
    messages: {
        type: Array,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

const channel = ref(properties.channel);
const members = ref(properties.users);
const messages = ref(properties.messages);
const token = ref(properties.token);
const openDeleteModal = ref(false);
const openInvitModal = ref(false);
const openBanModal = ref(false);

const channelName = computed(() => channel.value.name);

const showDelete = () => {
    openDeleteModal.value = true;
}

const cancelDelete = () => {
    openDeleteModal.value = false;
}

const confirmDelete = async () => {
    const deletion = await channelStore.deleteChannel(token.value, channel.value.id, channel.value.creator);
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
    const params = {
        user_id: banMember.value,
        channel_id: channel.value.id
    }
    const channelCreator = channel.value.creator;
    const token = localStorage.getItem('token');
    console.log(token);
    const ban = await channelStore.removeUserFromChannel(token, banMember.value, channel.value.id, params, channelCreator);
    if (!ban) {
        notifyError("Vous ne pouvez bannir des membres que dans vos salons personels !");
    }
    openBanModal.value = false;
}

const showInvit = () => {
    openInvitModal.value = true;
}

const cancelInvit = () => {
    openInvitModal.value = false;
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
        router.push({ name: 'home' });
    }
}

const handleClickOutside = (e) => {
    if (modalContent.value && !modalContent.value.contains(e.target)) {
        openDeleteModal.value = false;
        openInvitModal.value = false;
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