import { defineStore } from 'pinia'
import { login, extendSession } from '../services/connexion/auth'



const useAuthStore = defineStore({
    id: 'user',
    state: () => ({
        token: null,
        username: null,
    }),
    getters: {
        isAuthenticated: state => !!state.token //Vérifie la pésence du token
    },
    actions: {
        async login(username, password) {
            console.log("login user")
            const response = await login(username, password)
            console.log(response.token)
            this.token = response.token
            this.username = username
            localStorage.setItem('token', response.token);
            /* Set a timeout to refresh the session before it expires. (in 2h50) */
            setTimeout(() => {
                extendSession(this.token)
            }, 1000 * 60 * 60 * 2.85)
        },
        async extendSession() {
            console.log("extend session")
            const response = await extendSession(this.token)
            this.token = response.token
            /* Set a timeout to refresh the session before it expires. (in 2h50) */
            setTimeout(() => {
                extendSession(this.token)
            }, 1000 * 60 * 60 * 2.85)
        },
        clearSession() {
            this.token = null
            this.username = null
            // Arrêter le renouvellement de session
            // stopSessionRenewal()
            localStorage.removeItem('token');
            window.location.reload();
        },
        fetchToken() {
            return this.token;
        }
    },
})

export default useAuthStore