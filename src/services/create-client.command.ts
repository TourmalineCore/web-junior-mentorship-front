import axios from 'axios'
import { API_HOST_URL } from '../config'
import ClientDataDto from '../models/client-data.dto'

type NewClientResponse = {
  id: number
}

async function createClientAsync(newClientData: ClientDataDto): Promise<number> {
  const {
    data: {
      id: newlyCreatedClientId
    }
  } = await axios.post<NewClientResponse>(`${API_HOST_URL}/clients`, newClientData)

  return newlyCreatedClientId
}

export default createClientAsync
