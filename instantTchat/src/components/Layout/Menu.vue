<template>
     <div class="menu">
            <button @click="showFriends" id="un">Friends</button>
            <button @click="showNewMessage" id="deux">New messages<span class="sticker-notif">{{ newMessage }}</span></button>
            <button @click="showAllConversations" id="trois">All conversations</button>
            <button @click="showInvitation" id="quatre">Invitation<span class="sticker-notif">{{ invitation }}</span></button> 
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

    const invitation = 5;

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
        background-color: #5e5e5e;
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
</style>