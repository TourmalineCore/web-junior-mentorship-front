import axios from 'axios';

function deleteClientAsync(clientId: number): Promise<boolean> {
  return axios.delete(`http://localhost:5000/clients/${clientId}`)
}

export default deleteClientAsync
