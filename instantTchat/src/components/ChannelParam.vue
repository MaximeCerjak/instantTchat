<template>
    <div class="sidebar-channel-param">
        <div class="handleChannel">
            <h2>{{ channel.name }}</h2>
            <button @click="deleteChannel">Supprimer le canal</button>
            <button @click="sendInvitation">Inviter des membres</button>
        </div>
        <div class="users-list">
            <h2>Users</h2>
            <ul>
                <li v-for="member in members" :key="member.id">
                    {{ member }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

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
    }
});

const channel = ref(properties.channel);
const members = ref(properties.users);
const messages = ref(properties.messages);

console.log(channel.value);
console.log(members.value);
console.log(messages.value);

</script>

<style scoped>

.sidebar-channel-param {
    display:flex;
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

</style>