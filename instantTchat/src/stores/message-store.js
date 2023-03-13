import { api } from '../boot/axios' 
import { defineStore } from "pinia";

const useMessageStore = defineStore({
    id: 'message',
    state: () => ({
        message: "",
        selectedChannel: null,
        token: "..." //token auth utilisateur
    }),
    getters: {},
    actions: {
        async sendMessage() {
          try {
            const messageText = this.message;
            const channelId = this.selectedChannel.id;
            const token = this.token;
      
            const response = await api.post(`/protected/channel/{channel_id}/message`, {
              text: messageText
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
      
            console.log('Message envoyé avec succès !');
            
            // Réinitialisation de la zone de texte
            this.message = '';
      
            // Ajout du nouveau message à la liste des messages
            this.selectedChannel.messages.push(response.data);
          } catch (error) {
            console.error('Erreur lors de l\'envoi du message :', error);
            throw error;
          }
        }
      }
})

export default useMessageStore