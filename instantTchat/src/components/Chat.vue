<template>
    <div class="chat">
        <Channel :channel="currentChannel" />
        <MessageList :messages="messages" />
        <MessageForm @submit="handleMessageSubmit" />
    </div>
</template>
    
<script>
    import Channel from '@/components/Channel.vue';
    import MessageList from '@/components/MessageList.vue';
    import MessageForm from '@/components/MessageForm.vue';
    
    export default {
        components: {
        Channel,
        MessageList,
        MessageForm,
        },
        props: {
        currentChannel: {
            type: Object,
            required: true,
        },
        messages: {
            type: Array,
            required: true,
        },
        },
        methods: {
        handleMessageSubmit(message) {
            this.$emit('submit', message);
        },
        },
    };
</script>
    
<style scoped>
    .chat {
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: #f9f9f9;
    }
</style>