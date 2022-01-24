import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import NewClientForm from './components/NewClientForm';

type Client = {
  id: number;
  name: string;
}

function App() {
  const [clients, setClients] = useState<Client[]>([])
  const [lastCreatedClientId, setLastCreatedClientId] = useState<number | null>(null)

  useEffect(() => {
    async function fetchClients() {
      const {
        data,
      } = await axios.get<Client[]>(`http://localhost:5000/clients`)
      setClients(data)
    }
    fetchClients();
  }, [lastCreatedClientId]);

  return (
    <div className="App">
      <ul>
        {
          clients.map(({
            id,
            name,
          }) => (
            <li key={id}>
              <span>{id}</span>
              <span>{name}</span>
            </li>
          ))
        }
      </ul>
      <NewClientForm
        onClientCreated={(createdClientId) => setLastCreatedClientId(createdClientId)}
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
}

export default App;
