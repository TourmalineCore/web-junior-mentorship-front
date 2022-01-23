import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [clients, setClients] = useState([])
  
  useEffect(() => {
    axios.get(`http://localhost:5000/clients`)
      .then(({data}) => {
        setClients(data)
      })
  }, [])

  return (
    <div className="App">
      {clients.length}
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
