<template>
    <div class="home">
        <h1>Home</h1>
        <ChannelSidebar />
    </div>
</template>

<script setup>
  import ChannelSidebar from './ChannelSidebar.vue';  

  
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

    h1 {
        font-size: 50px;
        font-weight: bolder;
        color: white;
    }
    
</style>