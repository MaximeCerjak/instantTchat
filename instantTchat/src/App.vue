<template>
  <div id="app">
      <header>
        <p class="logo-block">
          <img src="./public/assets/logo-coq.png" alt="logo" />
        </p>
        <h1>InstanChat</h1>
        <Menu />
        <button @click="logout" class="logout-btn">Logout</button>
      </header>
      <main>
        <sidebar :channels="channels" />
        <router-view :user="user" :channels="channels" />
        <home />
      </main>
      </div>
</template>

<script>
  import Sidebar from './components/ChannelSidebar.vue';
  import Home from './components/Home.vue';
  import Menu from './components/Layout/Menu.vue';
  
  export default {
      name: 'App',
      components: {
      Sidebar,
      Home,
      Menu
      },
      props: {
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
      },
      methods: {
      logout() {
          // code pour déconnecter l'utilisateur
      }
      }
  };
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
