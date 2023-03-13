<template>
    <div id="app">
        <header>
            <p class="logo-block">
                <img src="./public/assets/logo-coq.png" alt="logo" />
            </p>
            <h1>InstanChat</h1>
            <Menu />
            <div v-if="authStore.isAuthenticated || isAuthenticated">
                <button @click="logout" class="logout-btn">LOGOUT</button>
            </div>
        </header>
        <main>
            <RouterView />
        </main>
    </div>
</template>

<script setup>
import useAuthStore from './stores/auth-store';
import Menu from './components/Layout/Menu.vue';
import { ref, onMounted } from 'vue';
import { RouterView, RouterLink } from 'vue-router';

const authStore = useAuthStore();
const isAuthenticated = ref(false);

onMounted(() => {
    const token = localStorage.getItem('token');
    if (token) {
        isAuthenticated.value = true;
    }
});

const logout = () => {
    authStore.clearSession();
};

const props = defineProps({
    user: {
        type: Object,
        required: true
    },
    channels: {
        type: Array,
        required: true
    },
    members: {
        type: Array,
        required: true
    }
});

</script>

<style>
#app {
    margin: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #333;
}

main {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
}

.logout-btn {
    background-color: #61606084;
    color: #fff;
    border: none;
    padding: 5px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2rem;
    height: 40px;
    margin: auto;
}

.logout-btn:hover {
    background-color: #49484884;
}

.logo-block {
    width: 60px;
    height: 60px;
    margin: auto 0;
}

.logo-block img {
    width: 100%;
    height: 100%;
}
</style>
