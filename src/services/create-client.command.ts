import axios from 'axios';
import NewClientDto from '../models/new-client.dto';

type NewClientResponse = {
  id: number;
}

async function createClientAsync(newClientData: NewClientDto): Promise<number> {
  const {
    data: {
      id: newlyCreatedClientId
    }
  } = await axios.post<NewClientResponse>(`http://localhost:5000/clients`, newClientData)

  return newlyCreatedClientId
}

export default createClientAsync
