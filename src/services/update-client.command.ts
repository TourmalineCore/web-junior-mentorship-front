import axios from 'axios'
import { API_HOST_URL } from '../config'
import UpdatedClientDto from '../models/updated-client.dto'

function updateClientAsync(updatedClientData: UpdatedClientDto): Promise<boolean> {
  const {
    id: updatedClientId
  } = updatedClientData

  return axios.post(`${API_HOST_URL}/clients/${updatedClientId}`, updatedClientData)
}

export default updateClientAsync