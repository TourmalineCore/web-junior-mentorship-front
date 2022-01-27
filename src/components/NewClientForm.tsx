import { useState } from 'react';

type NewClientFormProps = {
  onClientCreated?: (createdClientId: number) => unknown;
  createClientCallbackAsync: (name: string) => Promise<number>,
}

function NewClientForm({
  onClientCreated = () => {},
  createClientCallbackAsync,
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
            data-testid="new-client-name"
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

    const newlyCreatedClientId = await createClientCallbackAsync(name)

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
