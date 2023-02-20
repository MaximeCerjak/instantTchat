<template>
    <div class="friend-list">
        <div class="friend-list-header">
            <h2>Friends</h2>
        </div>
        <div class="friend-list-body">
            <Friend v-for="friend in friends" :key="friend.id" :friend="friend" />
        </div>
    </div>
</template>

<script setup>
    import { defineProps, ref } from 'vue'

    const friends = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Paul' },
        { id: 3, name: 'Vincent' },
        { id: 4, name: 'Pierre' },
        { id: 5, name: 'Jacques' },
        { id: 6, name: 'Jean' },
        { id: 7, name: 'Pierre' },
        { id: 8, name: 'Paul' },
        { id: 9, name: 'Jacques' },
        { id: 10, name: 'Vincent' },
        { id: 11, name: 'Jean' },
        { id: 12, name: 'Pierre' },
        { id: 13, name: 'Paul' },
        { id: 14, name: 'Jacques' },
        { id: 15, name: 'Vincent' },
        { id: 16, name: 'Jean' },
        { id: 17, name: 'Pierre' },
        { id: 18, name: 'Paul' },
        { id: 19, name: 'Jacques' },
        { id: 20, name: 'Vincent' },
        { id: 21, name: 'Jean' },
    ]
</script>

<style scoped>
    .friend-list {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .friend-list-header {
        padding: 1rem;
        border-bottom: 1px solid #ccc;
    }

    .friend-list-body {
        flex: 1;
        overflow-y: auto;
    }
</style>