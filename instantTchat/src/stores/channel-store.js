import { api } from '../boot/axios' 
import { defineStore } from 'pinia'

const useChannelStore = defineStore({
    id: 'channel',
    state: () => ({
        channels: [],
        currentChannel: null,
        users: [],
        theme: {}
    }),
    getters: {
        getChannelById: (state) => (id) => {
            return state.channels.find(channel => channel.id === id)
        },
        getAllChannels: (state) => {
            return state.channels
        },
    },
    actions: {
        async fetchChannels(token) {
            try {
                const response = await api.get('/protected/user/channels', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                this.channels = response.data
                return response.data
            } catch (error) {
                throw error
            }
        },
        async createChannel(token, params) {
            try {
                const response = await api.put('/protected/user/channels', params, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                this.channels.push(response.data)
                return response.data
            } catch (error) {
                throw error
            }
        }
    }
})

export default useChannelStore
    
