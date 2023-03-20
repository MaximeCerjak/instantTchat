import { api } from '../boot/axios' 
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';

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
                this.channelId = response.data[0].id
                return response.data
            } catch (error) {
                throw error
            }
        },
        async createChannel(token, params) {
            try {
                const response = await api.put('/protected/channel', params, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                this.channels.push(response.data)
                return response.data
            } catch (error) {
                throw error
            }
        },
        async deleteChannel(token, id, channelCreator) {
          const userCreator = localStorage.getItem('username');
          console.log(channelCreator, userCreator)
          if (userCreator !== channelCreator) {
            return false;
          } else {
            try {
              const response = await api.delete(`/protected/channel/${id}`, {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              })
              this.channels = this.channels.filter(channel => channel.id !== id)
                return response.data
            } catch (error) {
                throw error
            }
          }
            
        },
        async updateChannel(token, id, params) {
          try{
            const response = await api.post(`/protected/channel/${id}/update_metadata`, params, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            this.channels = this.channels.map(channel => {
              if(channel.id === id) {
                return response.data
              } else {
                return channel
              }
            })
            return response.data
          }
          catch(error) {
            throw error
          }
        },
        async addUserToChannel(token, id, channelCreator, params, user) {
          const userCreator = localStorage.getItem('username');
          console.log(channelCreator, userCreator)
          if (userCreator !== channelCreator) {
            return false;
          } else {
            try {
              const response = await api.put(`/protected/channel/${id}/user/${user}`, params, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
              return response.data
              }
              catch(error) {
                throw error
              }
          }
        },
        async removeUserFromChannel(token, id, params) {
          try{
            const response = await api.delete(`/protected/channel/${id}/user/${user.id}`, params, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            this.channels = this.channels.map(channel => {
              if(channel.id === id) {
                return response.data
              } else {
                return channel
              }
            })
            return response.data
          }
          catch(error) {
            throw error
          }
        },
}
})


export default useChannelStore
    
