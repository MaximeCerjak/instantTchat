<template>   
   <div class="sb-members">
        <div class="header-members">
            <h2>Members</h2><span class="add-memb">+</span>
        </div>
        <ul class="member-ul">
            <li v-for="member in members" :key="member.id" class="member-li">
                <div class="span-grp" @click="selectConversation(member.id)">
                    <span class="avatar-member">{{ member.name.charAt(0).toUpperCase() }}</span>
                    <span class="status-sticker" :class="member.status"></span>
                    <span class="member-name">{{ member.name }}</span>
                </div>
                
                <button class="delete-button" @click="deleteConversation">
                    X
                </button>
                
            </li>
        </ul>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue'

    const members = [
        { id: 1, name: 'John', status: 'online' },
        { id: 2, name: 'Paul', status: 'offline' },
        { id: 3, name: 'Vincent', status: 'busy'},
        { id: 4, name: 'Pierre', status: 'online' },
        { id: 5, name: 'Jacques', status: 'offline' },
        { id: 6, name: 'Jean', status: 'busy' },
        { id: 7, name: 'Pierre', status: 'no-disturb' },
        { id: 8, name: 'Paul', status: 'online' },
        { id: 9, name: 'Jacques', status: 'offline' },
        { id: 10, name: 'Vincent', status: 'busy' },
        { id: 11, name: 'Jean', status: 'no-disturb' },
        { id: 12, name: 'Pierre', status: 'online' },
        { id: 13, name: 'Paul', status: 'offline' },
        { id: 14, name: 'Jacques', status: 'busy' },
        { id: 15, name: 'Vincent', status: 'no-disturb' },
        { id: 16, name: 'Jean', status: 'online' },
        { id: 17, name: 'Pierre', status: 'offline' },
        { id: 18, name: 'Paul', status: 'busy' },
        { id: 19, name: 'Jacques', status: 'no-disturb' },
        { id: 20, name: 'Vincent', status: 'online' },
        { id: 21, name: 'Jean', status: 'offline' },
        { id: 22, name: 'Pierre', status: 'busy' },
        { id: 23, name: 'Paul', status: 'no-disturb' },
        { id: 24, name: 'Jacques', status: 'online' },
        { id: 25, name: 'Vincent', status: 'offline' },
        { id: 26, name: 'Jean', status: 'busy' },
        { id: 27, name: 'Pierre', status: 'no-disturb' },
        { id: 28, name: 'Paul', status: 'online' },
        { id: 29, name: 'Jacques', status: 'offline' },
        { id: 30, name: 'Vincent', status: 'busy' },
        { id: 31, name: 'Jean', status: 'no-disturb' },
        { id: 32, name: 'Pierre', status: 'online' },
        { id: 33, name: 'Paul', status: 'offline' }
    ]

</script>

<style scoped>
     .sb-members {
        display:flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 10px 20px;
        background-color: #252525;
        width: 85%;
        color: whitesmoke;
        width: 100%;
        overflow-y:scroll;
        overflow-x: hidden;
        scrollbar-width: 1px;
        scrollbar-color: #252525 #181818;
    }

    .header-members {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 10px;
        font-size: 1.2rem;
    }

    h2 {
        font-size: 1.2rem;
        margin-bottom: 10px;
    }
    
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    li {
        margin-bottom: 5px;
    }
    
    router-link {
        color: black;
        text-decoration: none;
    }

    .member-li {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 15px 0;
        width:100%;
    }

    .member-ul {
        width: 100%;
    }

    .delete-button {
        display:flex;
        justify-content: center;
        align-items: center;
        background-color: #333;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        color: #ccc;
        font-weight: bold;
        font-size: 0.8rem;
    }

    .delete-button:hover {
        background-color: #dc3545;
    }

    .span-grp {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .btn-grp {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 0;
    }

</style>