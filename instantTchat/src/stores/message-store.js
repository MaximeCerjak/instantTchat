import { WebSocket } from 'socket.io';

export default {
  namespaced: true,
  state: {
    socket: null, 
    isConnected: false,
    messages: [],
  },
  mutations: {
    SOCKET_CONNECT(state, status) {
      state.isConnected = true;
    },
    SOCKET_DISCONNECT(state, status) {
      state.isConnected = false;
    },
    SOCKET_MESSAGE(state, message) {
      state.messages.push(message);
    },
  },
  actions: {
    connectToWebSocket({ commit, dispatch, state }, {id, token}) {
      const socket = new WebSocket(`wss://edu.tardigrade.land/msg/ws/channel/${id}/token/${token}`);
      socket.on('connect', () => {
        console.log('Connected to WebSocket');
        commit('SOCKET_CONNECT');
      });
      socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket');
        commit('SOCKET_DISCONNECT');
      });
      socket.on('message', (message) => {
        console.log('Received message from WebSocket', message);
        commit('SOCKET_MESSAGE', message);
      });
      state.socket = socket;
    },
    sendMessageToWebSocket({ state }, message) {
      state.socket.emit('message', message);
    },
  },
}