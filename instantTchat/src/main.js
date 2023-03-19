import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.vue'
import router from './router'
import './public/css/app.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#mainApp')
