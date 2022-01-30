import { useState } from 'react';

type NewClientFormProps = {
  onClientCreated?: (createdClientId: number) => unknown;
  createClientCallbackAsync: (newClientData: {
    name: string, 
    description?: string,
  }) => Promise<number>,
}

function NewClientForm({
  onClientCreated = () => { },
  createClientCallbackAsync,
}: NewClientFormProps) {
  const [newClientName, setNewClientName] = useState<string>('')
  const [newClientDescription, setNewClientDescription] = useState<string>('')
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
      <label>
        Description:
        <textarea
          name="description"
          value={newClientDescription}
          onChange={(e) => setNewClientDescription(e.target.value)}
        />
      </label>

      <input
        type="submit"
        value="Submit"
        data-testid="submit-btn-text"
      />
    </form>
  );

  async function handleSubmit() {
    setHasTriedToSubmit(true)

    if (!isNameValid()) {
      return
    }

    const newlyCreatedClientId = await createClientCallbackAsync(getNewClientData())

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
      name: newClientName.trim(),
      description: newClientDescription.trim(),
    }
  }
}

export default NewClientForm;
