import { api } from '../../boot/axios'

// function showSessionExpirationWarning() {
//   // Afficher une popup ou une notification pour informer l'utilisateur que la session expire bientôt
// }

/**
 * Set a timeout to show a session expiration warning when the session is about to expire.
 */
// function scheduleSessionExpirationWarning() {
//     const expiresInMs = userStore.expirationTime - Date.now()
//     const warningTime = expiresInMs - SESSION_EXPIRATION_WARNING_TIME
//     setTimeout(() => {
//     showSessionExpirationWarning()
//     }, warningTime)
// }

export async function login(username, password) {
    try {
        const response = await api.post('/login', username, password)
        console.log("login auth")
    // Planifier l'avertissement d'expiration de session
        // scheduleSessionExpirationWarning()

        return response.data
    } catch (error) {
        throw error
    }
}

// export function logout() {
//     userStore.clearSession()
// }

// export function getToken() {
//     return userStore.accessToken
// }

export async function refreshToken() {
    try {
      // Ajouter le bearer token dans les headers de la requête
        addAuthorizationHeader()

        const response = await api.post('/protected/extend_session')

      // Mettre à jour le store avec le nouveau token
        const { access_token, refresh_token, expiration_time } = response.data
        return { access_token, refresh_token, expiration_time }
    } catch (error) {
        throw error
    }
}

// Appeler extendSession() pour renouveler la session avant qu'elle n'expire
// setInterval(extendSession, SESSION_RENEWAL_INTERVAL)