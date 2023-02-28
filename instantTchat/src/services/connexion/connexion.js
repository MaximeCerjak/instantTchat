// https://edu.tardigrade.land/msg/login
import { api } from 'boot/axios'

export const login = async (params) => await api.post('/login', params)
