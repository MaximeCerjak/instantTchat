import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        token: null
    }),
    getters: {
        isAuthenticated: state => !!state.token
    },
    actions: {
    async login(params) {
        const response = await api.post('/login', params)
        this.token = response.data.token
      // vous pouvez stocker d'autres informations d'utilisateur ici
    },
    logout() {
        this.token = null
      // vous pouvez effacer d'autres informations d'utilisateur ici
    }
    }
})
