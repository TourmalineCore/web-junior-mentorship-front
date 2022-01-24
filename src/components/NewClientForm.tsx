import { useState } from 'react';
import axios from 'axios';

type NewClientResult = {
  id: number;
}

type NewClientFormProps = {
  onClientCreated: (createdClientId: number) => unknown;
}

function NewClientForm({
  onClientCreated,
}: NewClientFormProps) {
  const [newClientName, setNewClientName] = useState<string>('')
  const [hasTriedToSubmit, setHasTriedToSubmit] = useState<boolean>(false)

  return (
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
          {
            hasTriedToSubmit && !isNameValid() && (
              <span>Fill the name</span>
            )
          }
        </label>
        <input type="submit" value="Submit" />
      </form>
  );

  async function handleSubmit() {
    setHasTriedToSubmit(true)

    if (!isNameValid()) {
      return
    }

    const {
      name,
    } = getNewClientData()

    const {
      data: {
        id: newlyCreatedClientId
      }
    } = await axios.post<NewClientResult>(`http://localhost:5000/clients`, {
      name,
    })

    onClientCreated(newlyCreatedClientId)
  }

  function isNameValid() {
    const {
      name,
    } = getNewClientData()

    return !!name
  }

  function getNewClientData() {
    return {
      name: newClientName.trim()
    }
  }
}

export default NewClientForm;
