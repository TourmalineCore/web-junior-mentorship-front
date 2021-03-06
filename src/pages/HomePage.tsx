import './HomePage.scss'

import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { debounce } from 'lodash';

import deleteClientAsync from '../services/delete-client.command'
import { API_HOST_URL } from '../config'

type Client = {
  id: number
  name: string
  description?: string
}

function HomePage() {
  const [clientNameSearchTerm, setClientNameSearchTerm] = useState(``);

  const [clients, setClients] = useState<Client[]>([])

  const [isDeleteConfirmationShown, setIsDeleteConfirmationShown] = useState(false)
  const [clientIdToBeDeleted, setClientIdToBeDeleted] = useState<number | null>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedFetchClients = useCallback(
    debounce((clientNameTerm: string) => {
      fetchClients(clientNameTerm)
    }, 1000),
    []
  );

  useEffect(() => {
    fetchClients()
  }, [])

  return (
    <div className="clients">
      <input
        type="text"
        value={clientNameSearchTerm}
        onChange={(e) => handleClientNameSearchChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            handleClientNameSearchChange(``);
          }
        }}
        placeholder="Enter name"
      />
      <ul className="clients__list">
        {
          clients.map(({
            id,
            name,
            description,
          }) => (
            <li className="clients__item" key={id}>
              <span className="clients__id">{id}</span>
              <Link className="clients__link" to={`/clients/${id}`}>
                <span className="clients__name">{name}</span>
              </Link>
              <span className="clients__description">{description}</span>
              {
                isDeleteConfirmationShown && clientIdToBeDeleted === id
                  ? (
                    <span className="clients__confirmation">
                      Are you sure you want to delete this user?
                      <button className="clients__btn" type='button'
                        onClick={() => onConfirmDeleteClick(id)}>
                        Yes
                      </button>
                      <button className="clients__btn" type='button'
                        onClick={() => onRejectDeleteClick()}>
                        No
                      </button>
                    </span>
                  )
                  : (
                    <button className="clients__btn" type='button' onClick={() => onDeleteClick(id)}>
                      Delete
                    </button>
                  )
              }
            </li>
          ))
        }
      </ul>
      <Link className="clients__link" to='/new-client'>Create a New Client</Link>
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

  async function fetchClients(clientNameTerm: string = ``) {
    const {
      data,
    } = await axios.get<Client[]>(`${API_HOST_URL}/clients?searchTerm=${clientNameTerm}`)

    setClients(data)
  }

  function handleClientNameSearchChange(newClientNameSearchTerm: string = ``) {
    setClientNameSearchTerm(newClientNameSearchTerm)
    memoizedFetchClients(newClientNameSearchTerm)
  }
}

export default HomePage
