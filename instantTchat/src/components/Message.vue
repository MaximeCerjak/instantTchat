<template>
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
</template>

<script setup>
    const newMessageModal = ref(false);
    const showNewMessage = () => {
        friendListOpen.value = false;
        allConversationsModal.value = false;
        invitationModal.value = false;
        friendModal.value = false;
        newMessageModal.value = !newMessageModal.value;
    }

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
</script>

<style scoped>
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
</style>