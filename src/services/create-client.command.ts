import axios from 'axios';

type NewClientResponse = {
  id: number;
}

async function createClientAsync(newClientData: {name: string, description?: string}): Promise<number> {
  const {
    data: {
      id: newlyCreatedClientId
    }
  } = await axios.post<NewClientResponse>(`http://localhost:5000/clients`, {
    name: newClientData.name,
    description: newClientData.description,
  })

  return newlyCreatedClientId
}

export default createClientAsync
