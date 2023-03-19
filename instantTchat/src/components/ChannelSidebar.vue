<script setup>
    import {getChannel} from '../services/salon/salon'
    import { ref } from 'vue'
    const members = []

  const channels = ref([]);
  console.log(1,channels.value)

  channels.value = await getChannel(); 
  console.log(2,channels.value)

    const selectConversation = (id) => {
        console.log(id)
    }

    const deleteConversation = (id) => {
        console.log(id)
    }
    

    // const props = defineProps({
    //     channels: {
    //         type: Array,
    //         required: true
    //     },
    //     members: {
    //         type: Array,
    //         required: true
    //     }
    // })
</script>

<template>
    <div class="sidebar"> 
        <div class="sb-channels">
            <h2>Channels</h2>
                <ul>
                    <li v-for="channel of channels" :key="channel.id">
                        <router-link :to="{ name: 'canal', params: { id: channel.id, token: token } }">
                            {{ channel.name }}
                            <span class="avatar-block"><span class="avatar">{{ channel.name.charAt(0).toUpperCase() }}</span></span>
                        </router-link>
                    </li>
                </ul>
        </div>      
    </div>
</template>
    

    
<style scoped>
    .sidebar {
        display:flex;
        flex-direction: row;
        position: absolute;
        top: 8.7%;
        left: 0;
        height: 100%;
        background-color: #333;
        width: 26%;
    }

    .sb-channels {
        display:flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background-color: #181818;
        color: grey;
        text-align: center;
        overflow-y:scroll;
        overflow-x: hidden;
        margin-bottom: 50px;
        padding: 10px 20px 10px 35px;
        text-align: center;
        scrollbar-width: none;
        scrollbar-color: #252525 #181818;
    }

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
        scrollbar-width: none;
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