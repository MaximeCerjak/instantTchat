import axios from 'axios'
import { useUserStore } from 'stores/user-store'
const userStore = useUserStore()

const api = axios.create({ baseURL: 'https://edu.tardigrade.land/msg' })

export { api }