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
      ws.onmessage = (e) => {
        const message = JSON.parse(e.data);
        this.handleReceivedMessage(message);
      };
    if(ws.readyState === 0){
      this.socket = ws;
    }
      console.log(ws);
    },
    async sendMessageToWebSocket(message,id) {
      if(message.Text !== "" && message.Text !== null && message.Text !== undefined){
        try {
          const token = localStorage.getItem('token');
          const response = await api.post(`/protected/channel/${id}/message`, message, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(response);
          return true;
        } catch (error) {
          console.error('Erreur lors de l\'envoi du message :', error);
          throw error;
        }
      } else {
        return false;
      }
    },
    async fetchMessages(channelId, offset = 0) {
        try {
          const token = localStorage.getItem('token');

          const response = await api.get(`/protected/channel/${channelId}/messages/${offset}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          console.log(offset);

          // Ajout des messages à la liste des messages
          return response.data;
        } catch (error) {
          console.error('Erreur lors de la récupération des messages :', error);
          throw error;
        }
    },
    async updateMessage(updatedMessage) {
      try {
        const token = localStorage.getItem('token');
        const response = await api.post(`/protected/channel/${updatedMessage.channel_id}/message/moderate`, updatedMessage, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (response.status === 200) {
          console.log('Message mis à jour avec succès !');
          return true;
        } else {
          console.error('Erreur lors de la mise à jour du message');
          return false;
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du message :', error);
        throw error;
      }
    },
    handleReceivedMessage(message) {
      this.messages.push(message);

      const event = new CustomEvent('message-received', { detail: message });
      window.dispatchEvent(event);
    },
  }
});

export default useMessageStore;

