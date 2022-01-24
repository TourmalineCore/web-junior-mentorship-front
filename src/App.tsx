import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

type Client = {
  id: number;
  name: string;
}

type NewClientResult = {
  id: number;
}

function App() {
  const [clients, setClients] = useState<Client[]>([])
  const [newClientName, setNewClientName] = useState<string>('')
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
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <label>
          Name*:
          <input
            type="text"
            name="name"
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
            required
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
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

  async function handleSubmit() {
    const trimmedName = newClientName.trim()
    if (!trimmedName) {
      return
    }

    const {
      data: {
        id: newlyCreatedClientId
      }
    } = await axios.post<NewClientResult>(`http://localhost:5000/clients`, {
      name: trimmedName,
    })

    setLastCreatedClientId(newlyCreatedClientId)
  }
}

export default App;
