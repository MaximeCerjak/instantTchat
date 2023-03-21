import { api } from '../boot/axios' 
import { defineStore } from 'pinia'

const useMessageStore = defineStore({
  id: "message",
  state: () => ({
    socket: null, 
    isConnected: false,
    messages: [],
  }),
  actions: {
    connectToWebSocket(id, token) {
      const ws = new WebSocket(`wss://edu.tardigrade.land/msg/ws/channel/${id}/token/${token}`);
      ws.onopen = (e) => { "WebSocket is open now."; };
    if(ws.readyState === 0){
      this.socket = ws;
    }
      console.log(ws);
    },
    async sendMessageToWebSocket(message,id) {
    
      try {
        const token = localStorage.getItem('token');
      const response = await api.post(`/protected/channel/${id}/message`, message, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
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
    },
  }
});

export default useMessageStore;

