import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import NewClientForm from './components/NewClientForm';
import createClientAsync from './services/create-client.command';

type Client = {
  id: number;
  name: string;
  description: string;
}

function App() {
  const [clients, setClients] = useState<Client[]>([])
  const [lastCreatedClientId, setLastCreatedClientId] = useState<number | null>(null)
  const [isConfirmationShown, setIsConfirmationShown] = useState(false)
  const [clientIdToBeDeleted, setClientIdToBeDeleted] = useState<number | null>(null)
  const [lastDeletedClientId, setLastDeletedClientId] = useState<number | null>(null)

  useEffect(() => {
    async function fetchClients() {
      const {
        data,
      } = await axios.get<Client[]>(`http://localhost:5000/clients`)
      setClients(data)
    }
    fetchClients();
  }, [lastCreatedClientId, lastDeletedClientId]);

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
              
              {isConfirmationShown && clientIdToBeDeleted === id
              ? (
                <span>
                  Are you sure you want to delete this user?
                  <button type="button"
                   onClick={()=> onYesClick(id)}>
                    Yes
                  </button>
                  <button type="button" 
                    onClick={()=> onNoClick(id)}>
                      No
                    </button>
                </span>
              )
              : (
                <button type="button" onClick={()=> onDeleteClick(id)}>
                  Delete
                </button> 
                )
              }
            </li>
          ))
        }
      </ul>
      <NewClientForm
        onClientCreated={(createdClientId) => setLastCreatedClientId(createdClientId)}
        createClientCallbackAsync={createClientAsync}
      />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );

  function onDeleteClick(clientId: number) {
    setIsConfirmationShown(true);
    setClientIdToBeDeleted(clientId); 
  }

  function onNoClick(clientId: number) {
    setIsConfirmationShown(false);
    setClientIdToBeDeleted(null); 
  }

  async function onYesClick(clientId: number) {
    await axios.delete<Client[]>(`http://localhost:5000/clients/${clientId}`)
    setLastDeletedClientId(clientId);
    setIsConfirmationShown(false);
    setClientIdToBeDeleted(null); 
  }
}

export default App;
