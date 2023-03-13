<template>
        <div class="menu">
            <button @click="showFriends" id="un">Friends</button>
            <button @click="showNewMessage" id="deux">New messages<span class="sticker-notif">{{ newMessage }}</span></button>
            <button @click="showAllConversations" id="trois">All conversations</button>
            <button @click="showInvitation" id="quatre">Invitation<span class="sticker-notif">{{ invitation }}</span></button> 
        </div>
</template>

<script setup>

    import { defineProps, ref } from 'vue'

    const friendListOpen = ref(false);
    const showFriendList = () => {
        friendListOpen.value = !friendListOpen.value;
    }

    const friendModal = ref(false);
    const showFriends = () => {
        friendListOpen.value = false;
        newMessageModal.value = false;
        allConversationsModal.value = false;
        invitationModal.value = false;
        friendModal.value = !friendModal.value;
    }

    const allConversationsModal = ref(false);
    const showAllConversations = () => {
        friendListOpen.value = false;
        newMessageModal.value = false;
        invitationModal.value = false;
        friendModal.value = false;
        allConversationsModal.value = !allConversationsModal.value;
    }

    const invitationModal = ref(false);
    const showInvitation = () => {
        friendListOpen.value = false;
        newMessageModal.value = false;
        allConversationsModal.value = false;
        friendModal.value = false;
        invitationModal.value = !invitationModal.value;
    }

</script>

<style scoped>
 .menu {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 60%;
        margin: 0 auto;
    }

    .menu button {
        color: #fff;
        border: none;
        font-size: 1rem;
        cursor: pointer;
        padding: 2px 20px;
        border-radius: 5px;
    }

    #un  {
        background-color: rgb(77, 130, 198);
    }
    #un:hover {
        background-color: rgb(63, 107, 164);
    }

    #deux  {
        background-color: rgb(81, 198, 77);
    }
    #deux:hover {
        background-color: rgb(67, 164, 63);
    }

    #trois  {
        background-color: rgb(211, 164, 43);
    }
    #trois:hover {
        background-color: rgb(164, 127, 32);
    }

    #quatre  {
        background-color: rgb(233, 116, 220);
    }
    #quatre:hover {
        background-color: rgb(183, 91, 173);
    }
    .sticker-notif {
        background-color: rgb(206, 21, 21);
        color: #fff;
        border-radius: 50%;
        padding: 0 5px;
        margin-left: 5px;
        font-size: 0.8rem;
    }
    .menu button:focus {
        outline: none;
    }

    .menu button:active {
        background-color: #f00;
    }

    .menu button:nth-child(2) {
        position: relative;
    }

    .menu button:nth-child(4) {
        position: relative;
    }

    .menu button:nth-child(2) .sticker-notif {
        position: absolute;
        top: -10px;
        right: -10px;
    }

    .menu button:nth-child(4) .sticker-notif {
        position: absolute;
        top: -10px;
        right: -10px;
    }

    .menu button:nth-child(2):hover .sticker-notif {
        background-color: #fff;
        color: #f00;
        font-weight: bold;
    }

    .menu button:nth-child(4):hover .sticker-notif {
        background-color: #fff;
        color: #f00;
        font-weight: bold;
    }
</style>