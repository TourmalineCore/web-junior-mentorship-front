import './App.css'

import { useEffect, useState } from 'react'
import axios from 'axios'
import NewClientForm from './components/NewClientForm'
import createClientAsync from './services/create-client.command'
import deleteClientAsync from './services/delete-client.command'

type Client = {
  id: number
  name: string
  description: string
}

function App() {
  const [clients, setClients] = useState<Client[]>([])

  const [isDeleteConfirmationShown, setIsDeleteConfirmationShown] = useState(false)
  const [clientIdToBeDeleted, setClientIdToBeDeleted] = useState<number | null>(null)

  useEffect(() => {
    fetchClients()
  }, [])

  return (
    <div className="App">
      <ul>
        {
          clients.map(({
            id,
            name,
            description,
          }) => (
            <li key={id}>
              <span>{id}</span>
              <span>{name}</span>
              <span>{description}</span>
              {
                isDeleteConfirmationShown && clientIdToBeDeleted === id
                  ? (
                    <span>
                      Are you sure you want to delete this user?
                      <button type="button"
                        onClick={() => onConfirmDeleteClick(id)}>
                        Yes
                      </button>
                      <button type="button"
                        onClick={() => onRejectDeleteClick()}>
                        No
                      </button>
                    </span>
                  )
                  : (
                    <button type="button" onClick={() => onDeleteClick(id)}>
                      Delete
                    </button>
                  )
              }
            </li>
          ))
        }
      </ul>
      <NewClientForm
        onClientCreated={(createdClientId) => fetchClients()}
        createClientCallbackAsync={createClientAsync}
      />
    </div>
  )

  function onDeleteClick(clientId: number) {
    setIsDeleteConfirmationShown(true)
    setClientIdToBeDeleted(clientId)
  }

  function onRejectDeleteClick() {
    setIsDeleteConfirmationShown(false)
    setClientIdToBeDeleted(null)
  }

  async function onConfirmDeleteClick(clientId: number) {
    await deleteClientAsync(clientId)

    await fetchClients()

    setIsDeleteConfirmationShown(false) 
    setClientIdToBeDeleted(null)
  }

  async function fetchClients() {
    const {
      data,
    } = await axios.get<Client[]>(`http://localhost:5000/clients`)

    setClients(data)
  }
}

export default App
