<script setup>
import useAuthStore from '../stores/auth-store'
import { ref } from 'vue'

const authStore = useAuthStore()

const username = ref('')
const password = ref('')

const submitForm = async () => {
  try {
    await authStore.login({ username: username.value, password: password.value })
    // rediriger l'utilisateur vers une page sécurisée
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <form @submit.prevent="submitForm" class="loginForm">
    <label for="username">Nom d'utilisateur</label>
    <input type="text" id="username" v-model="username">

    <label for="password">Mot de passe</label>
    <input type="password" id="password" v-model="password">

    <button class="connectBtn" type="submit">Se connecter</button>
  </form>
</template>
  
<style scoped>
.loginForm {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
}

.connectBtn {
  background-color: rgb(51, 51, 51);
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.connectBtn:hover {
  background-color: #605f5f;
}

#username, #password {
  border-style: none;
  border-radius: 5px;
  padding: 2px 10px;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>