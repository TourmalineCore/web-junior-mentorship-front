import axios from 'axios'
import { API_HOST_URL } from '../config'
import NewClientDto from '../models/new-client.dto'

type NewClientResponse = {
  id: number
}

async function createClientAsync(newClientData: NewClientDto): Promise<number> {
  const {
    data: {
      id: newlyCreatedClientId
    }
  } = await axios.post<NewClientResponse>(`${API_HOST_URL}/clients`, newClientData)

  return newlyCreatedClientId
}

export default createClientAsync
