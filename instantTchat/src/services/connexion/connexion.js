// https://edu.tardigrade.land/msg/login
import { api } from 'boot/axios'

export const login = (params) => api.post('/login', params)
