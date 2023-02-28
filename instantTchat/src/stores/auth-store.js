import { defineStore } from 'pinia'
import { login, refreshToken } from '../services/connexion/auth'


export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        token: null
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
            // Démarrer le renouvellement de session
            // startSessionRenewal()
        },
        async refresh() {
            const response = await refreshToken(this.refreshToken)
            

            // Redémarrer le renouvellement de session
            // startSessionRenewal()
        },
        setSession(access_token, refresh_token, expiration_time) {
            

            // Démarrer le renouvellement de session
            // startSessionRenewal()
        },
        clearSession() {
            this.token = null

            // Arrêter le renouvellement de session
            // stopSessionRenewal()
        },
    },
})