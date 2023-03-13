import { api } from '../../boot/axios'

export async function login(username, password) {
    try {
        const response = await api.post('/login', username, password)
        console.log("login auth")
        return response.data
    } catch (error) {
        throw error
    }
}

/* Call api at /extend_extesion to extend the session */
export async function extendSession(token) {
    try {
            const response = await api.post('/extend_session', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log("extend session")
            return response.data
    } catch (error) {
        throw error
    }
}