// https://edu.tardigrade.land/msg/login
import { api } from '../../boot/axios'
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6ImZhbHNlIiwiaWF0IjoiMTY3NzU5MDk1NyIsInN1YiI6ImEubHVjYXMifQ.8z6UPRcv4Y_kh7ci3KRyZvfLNzGo8YSsWhVuKO9sGG4"
export const getChannel = () => {

  return  api.get('/protected/user/channels', { headers: { Authorization: `Bearer ${token}` } } )
  .then((response) => {
    return response.data
  })
  .catch((error) => {
    console.log(error)
  })
}


