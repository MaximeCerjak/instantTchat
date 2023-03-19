import { api } from '../boot/axios' 
import { defineStore } from "pinia";

const useMessageStore = defineStore({
    id: 'message',
    state: () => ({
        message: "",
        selectedChannel: [
            {
              messages: [],
            }
        ],
        token: "..." //token auth utilisateur
    }),
    getters: {},
    actions: {
        async sendMessage(channelId) {
          try {
            const messageText = this.message;
            const token = localStorage.getItem('token');
      
            const response = await api.post(`/protected/channel/${channelId}/message`, {
              text: messageText
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
      
            console.log('Message envoyé avec succès !');
            
            // Réinitialisation de la zone de texte
            this.message = '';
            console.log(response.data);
            // Ajout du nouveau message à la liste des messages
            this.selectedChannel.messages.push(response.data);
          } catch (error) {
            console.error('Erreur lors de l\'envoi du message :', error);
            throw error;
          }
        },
        async fetchMessages(channelId) {
          try {
            const token = localStorage.getItem('token');
      
            const response = await api.get(`/protected/channel/${channelId}/messages/0`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
      
            console.log('Messages récupérés avec succès !');
      
            // Ajout des messages à la liste des messages
            return response.data;
          } catch (error) {
            console.error('Erreur lors de la récupération des messages :', error);
            throw error;
          }
        }
      }
})

export default useMessageStore