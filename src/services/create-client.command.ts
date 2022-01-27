import axios from 'axios';

type NewClientResponse = {
  id: number;
}

async function createClientAsync(name: string): Promise<number> {
  const {
    data: {
      id: newlyCreatedClientId
    }
  } = await axios.post<NewClientResponse>(`http://localhost:5000/clients`, {
    name,
  })

  return newlyCreatedClientId
}

export default createClientAsync
