<script>
import { useUserStore } from '../stores/auth-store'
import { ref } from 'vue'


export default {
  setup() {

    const userStore = useUserStore()

    const username = ref('')
    const password = ref('')

    const submitForm = async () => {
      try {
        await userStore.login({ username: username.value, password: password.value })
        // rediriger l'utilisateur vers une page sécurisée
      } catch (error) {
        console.error(error)
      }
    }

    return {
      username,
      password,
      submitForm
    }

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
  background-color: #fff;
  border-radius: 5px;
}

.connectBtn {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 10px;
}
</style>