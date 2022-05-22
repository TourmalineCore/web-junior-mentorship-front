import axios from 'axios'
import { API_HOST_URL } from '../config'

function deleteClientAsync(clientId: number): Promise<boolean> {
  return axios.delete(`${API_HOST_URL}/clients/${clientId}`)
}

export default deleteClientAsync
