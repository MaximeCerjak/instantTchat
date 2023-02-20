<template>
    <div class="home">
        <h1>Home</h1>
        <div class="menu">
            <button @click="showFriends">Friends</button>
            <button @click="showNewMessage">New messages<span class="sticker-notif">{{ newMessage }}</span></button>
            <button @click="showAllConversations">All conversations</button>
            <button @click="showInvitation">Invitation<span class="sticker-notif">{{ invitation }}</span></button> 
        </div>
        <div class="main-content">
            <div v-if="friendModal">
                <div class="div-content friends">
                    <h2>Friends</h2>
                    <button class="add-btn" @click="addFriendForm">Ajouter</button>
                    <div class="friend-list" v-if="friendListOpen">
                        <button class="friend-list-more" @click="showFriendList">-</button>
                        <div class="friend-block">
                            <div v-for="friend in friends" :key="friend.id">
                                <div class="span-grp" @click="selectConversation(friend.id)">
                                    <span class="avatar-friend">{{ friend.name.charAt(0).toUpperCase() }}</span>
                                    <span class="status-sticker-friend" :class="friend.status"></span>
                                    <span class="member-name">{{ friend.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="friend-list-more" @click="showFriendList">...</button>
                </div>
            </div>
            <div v-if="newMessageModal">
                <div class="div-content messages">
                    <h2>Messages</h2>
                    <ul>
                        <li v-for="message in messages" :key="message.id">
                            {{ message.content }}
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="allConversationsModal">
                <div class="div-content conversations">
                    <h2>Conversations</h2>
                    <ul>
                        <li v-for="conversation in conversations" :key="conversation.id">
                            {{ conversation.content }}
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="invitationModal">
                <div class="div-content invitations">
                    <h2>Invitations</h2>
                    <ul>
                        <li v-for="invitation in invitations" :key="invitation.id">
                            {{ invitation.content }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
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

    const newMessageModal = ref(false);
    const showNewMessage = () => {
        friendListOpen.value = false;
        allConversationsModal.value = false;
        invitationModal.value = false;
        friendModal.value = false;
        newMessageModal.value = !newMessageModal.value;
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


    const friends = [
        { id: 1, name: 'John', status: 'online' },
        { id: 2, name: 'Paul', status: 'offline' },
        { id: 3, name: 'Vincent', status: 'online' },
        { id: 4, name: 'Pierre', status: 'offline' },
        { id: 5, name: 'Jacques', status: 'online' },
        { id: 6, name: 'Jean', status: 'offline' },
        { id: 7, name: 'Pierre', status: 'online' },
        { id: 8, name: 'Paul', status: 'offline' },
        { id: 9, name: 'Jacques', status: 'online' },
        { id: 10, name: 'Vincent', status: 'offline' },
        { id: 11, name: 'Jean', status: 'online' },
        { id: 12, name: 'Pierre', status: 'offline' },
        { id: 13, name: 'Paul', status: 'online' },
        { id: 14, name: 'Jacques', status: 'offline' },
        { id: 15, name: 'Vincent', status: 'online' },
        { id: 16, name: 'Jean', status: 'offline' },
        { id: 17, name: 'Pierre', status: 'online' },
        { id: 18, name: 'Paul', status: 'offline' },
        { id: 19, name: 'Jacques', status: 'online' },
        { id: 20, name: 'Vincent', status: 'offline' },
        { id: 21, name: 'Jean', status: 'online' },
    ]

    const messages = [
        { id: 1, content: 'Hello', status: 'read' },
        { id: 2, content: 'How are you?', status: 'read' },
        { id: 3, content: 'I\'m fine, thanks', status: 'read' },
        { id: 4, content: 'What about you?', status: 'read' },
        { id: 5, content: 'I\'m fine too', status: 'read' },
        { id: 6, content: 'See you later', status: 'read' },
        { id: 7, content: 'Bye', status: 'no-read' },
        { id: 8, content: 'Hello', status: 'no-read' },
        { id: 9, content: 'How are you?', status: 'no-read' },
    ]

    const newMessage = 12;
    const invitation = 5;

</script>

<style scoped>
    .home {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 74%;
        background-color: #494646;
        text-align: center;
        overflow-y: scroll;
        scrollbar-width:none;
    }

    .main-content {
        display: flex;
        flex: 1;
        text-align: start;
        justify-content: center;
        width: 100%;
        padding: 80px 0;
    }

    .div-content {
        width: 600px;
        height: 450px;
        text-align: center;
        background-color: #333;
        color: #c7c4c4;
        overflow-y: scroll;
        scrollbar-width: none;
        margin-bottom: 1em;
        padding-top: 10px;
        border-radius: 10px;
    }

    .friends {
    }

    .messages {
    }

    .menu {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 60%;
        margin: 0 auto;
    }

    .menu button {
        background-color: #333;
        color: #fff;
        border: none;
        font-size: 1rem;
        cursor: pointer;
        padding: 2px 5px;
        border-radius: 5px;
    }

    .sticker-notif {
        background-color: rgb(206, 21, 21);
        color: #fff;
        border-radius: 50%;
        padding: 0 5px;
        margin-left: 5px;
        font-size: 0.8rem;
    }

    .menu button:hover {
        background-color: rgb(151, 44, 44);
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

    .span-grp {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 125px;
        padding: 0 10px;
        margin-bottom: 1em;
        text-align: center;
    }

    .friend-list {
        padding: 10px 50px;
        margin: 0;
    }

    .friend-block {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin: 30px auto 0;
    }

    .friend-list li {
        padding: 5px 0;
        border-bottom: 1px solid #fff;
    }

    .friend-list li:hover {
        background-color: rgb(95, 91, 91);
        cursor: pointer;
    }

    .friend-list-more {
        background-color: #1a1818;
        color: #fff;
        border: none;
        font-size: 1rem;
        cursor: pointer;
        padding: 2px 12px;
        border-radius: 5px;
        margin-top: 5px;
        font-weight: bold;
    }

    .friend-list-more:hover {
        background-color: rgb(107, 98, 98);
    }

    .avatar-friend {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
        background-color: #1a1818;
    }

    .status-sticker-friend {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 5px;
        position: relative;
        top: 0;
        left: 20px;
    }

    .add-btn {
        position: relative;
        top: -9%;
        left:85%;
    }

</style>