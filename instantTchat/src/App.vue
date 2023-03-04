<template>
    <div id="app">
        <header>
            <p class="logo-block">
                <img src="./public/assets/logo-coq.png" alt="logo" />
            </p>
            <h1>InstanChat</h1>
            <Menu />
        </header>
        <main>
            <div v-if="userStore.isAuthenticated">
                <!-- Afficher la vue HomeView si l'utilisateur est connecté -->
                <HomeView />
            </div>
            <div v-else>
                <!-- Afficher la vue LoginView si l'utilisateur n'est pas connecté -->
                <LoginView />
            </div>
        </main>
    </div>
    <div>

    </div>
</template>

<script setup>
import HomeView from './views/HomeView.vue';
import LoginView from './views/LoginView.vue';
import { useUserStore } from './stores/auth-store';
import Menu from './components/Layout/Menu.vue';

const userStore = useUserStore();

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
    background-color: #ce040484;
    color: #fff;
    border: none;
    padding: 5px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2rem;
    height: 40px;
    margin: auto 0;
}

.logout-btn:hover {
    background-color: rgba(112, 250, 112, 0.707);
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
