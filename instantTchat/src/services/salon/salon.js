// https://edu.tardigrade.land/msg/login
import { api } from '../../boot/axios'
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6ImZhbHNlIiwiaWF0IjoiMTY3NjkwMDU3MiIsInN1YiI6ImEubHVjYXMifQ.fJwjjKPKS0uC6vDBN-wJGnn5TT4R2RjnXPqhLDQSDj8"
export const getChannel = () => {

  return  api.get('/protected/user/channels', { headers: { Authorization: `Bearer ${token}` } } )
  .then((response) => {
    return response.data
  })
  .catch((error) => {
    console.log(error)
  })
}



