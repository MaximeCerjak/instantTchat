import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.vue'
import router from './router'
import './public/css/app.css'
import Vue3Toastify from 'vue3-toastify';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Toastify, {
    autoClose: 3000,
    position: 'top-center',
    transition: 'Vue-Toastification__bounce',
    maxToasts: 20
});

app.mount('#mainApp')
