import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { useEffect, useState } from 'react'

import ClientForm from '../components/ClientForm'

import axios from 'axios'

import { API_HOST_URL } from '../config'
import updateClientAsync from '../services/update-client.command'

type Client = {
  id: number
  name: string
  description: string
}

function UpdateClientPage() {
  let navigate = useNavigate()

  const [initialClientData, setInitialClientData] = useState<Client | null>(null)

  const {
    id,
  } = useParams();

  useEffect(() => {
    async function fetchClientData() {
      const {
        data,
      } = await axios.get<Client>(`${API_HOST_URL}/clients/${id}`)

      setInitialClientData(data)
    }
    fetchClientData();
  }, [id])

  return (
    <div className="new-client">
      <Link to="/" className="new-client__link">Go back to Home Page</Link>
      <div className="new-client__title">Update the Client!</div>
      {
        initialClientData && (
          <ClientForm<boolean>
            initialClientData={initialClientData}
            onClientSubmitted={() => navigate(`/`)}
            submitClientCallbackAsync={(clientDataDto) => updateClientAsync({
              id: Number(id),
              name: clientDataDto.name,
              description: clientDataDto.description,
            })}
          />
        )
      }
    </div>
  )
}

export default UpdateClientPage
