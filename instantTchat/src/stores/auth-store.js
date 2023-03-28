import { defineStore } from 'pinia'
import router from '../router/index.js'
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
        async login(params) {
            console.log("login user")
            console.log(params.username)
            const response = await login(params);
            this.token = response.token;
            this.username = params.username;
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', params.username);
            /* Set a timeout to refresh the session before it expires. (in 2h50) */
            setTimeout(() => {
                extendSession(this.token)
            }, 1000 * 60 * 60 * 2.85)
            router.push('/');
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
            
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.reload();
            
        },
        fetchToken() {
            return this.token;
        }
    },
})


export default useAuthStore