<template>
    <div class="sidebar"> 
        <div class="sb-channels">
            <h2>Channels</h2>
                <ul>
                    <li v-for="channel in channels" :key="channel.id">
                    <!-- <router-link :to="{ name: 'channel', params: { id: channel.id } }"> -->
                        {{ channel.name }}
                        <span class="avatar-block"><span class="avatar">{{ channel.name.charAt(0).toUpperCase() }}</span></span>
                    <!-- </router-link> -->
                    </li>
                </ul>
        </div>      
    </div>
</template>
    
<script setup>
    import { defineProps } from 'vue'

    const channels = [
        { id: 1, name: 'General' },
        { id: 2, name: 'Random' },
        { id: 3, name: 'Vue' },
        { id: 4, name: 'React' },
        { id: 5, name: 'Angular'},
        { id: 6, name: 'Svelte' },
        { id: 7, name: 'Node' },
        { id: 8, name: 'Express' },
        { id: 9, name: 'MongoDB' },
        { id: 10, name: 'MySQL' },
        { id: 11, name: 'PostgreSQL' },
        { id: 12, name: 'Redis' },
        { id: 13, name: 'GraphQL' },
        { id: 14, name: 'Apollo' },
        { id: 15, name: 'Docker' },
        { id: 16, name: 'Kubernetes' },
        { id: 17, name: 'AWS' },
        { id: 18, name: 'GCP' },
        { id: 19, name: 'Azure' },
        { id: 20, name: 'Terraform' },
        { id: 21, name: 'Ansible' },
        { id: 22, name: 'Puppet' },
        { id: 23, name: 'Chef' },
        { id: 24, name: 'Git' },
        { id: 25, name: 'GitHub' },
        { id: 26, name: 'GitLab' },
        { id: 27, name: 'BitBucket' },
        { id: 28, name: 'Jenkins' },
        { id: 29, name: 'Travis' },
        { id: 30, name: 'CircleCI' },
        { id: 31, name: 'Babel' },
        { id: 32, name: 'Webpack' },
        { id: 33, name: 'Rollup' },
        { id: 34, name: 'Vite' },
        { id: 35, name: 'NPM' },
        { id: 36, name: 'Yarn' },
        { id: 37, name: 'Lerna' },
        { id: 38, name: 'Bash' },
        { id: 39, name: 'Zsh' },
        { id: 40, name: 'Fish' },
        { id: 41, name: 'C' },
        { id: 42, name: 'C++' }
    ]

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