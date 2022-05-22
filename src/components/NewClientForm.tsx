import './NewClientForm.scss'

import { useState } from 'react'
import NewClientDto from '../models/new-client.dto'

type NewClientFormProps = {
  onClientCreated?: (createdClientId: number) => unknown
  createClientCallbackAsync: (newClientData: NewClientDto) => Promise<number>
}

function NewClientForm({
  onClientCreated = () => { },
  createClientCallbackAsync,
}: NewClientFormProps) {
  const [newClientName, setNewClientName] = useState<string>('')
  const [newClientDescription, setNewClientDescription] = useState<string>('')
  const [hasTriedToSubmit, setHasTriedToSubmit] = useState<boolean>(false)

  return (
    <form className="new-client-form" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
      <div className="new-client-form__fields">
        <label className="new-client-form__label">
          Name*:
          <input
            className="new-client-form__input"
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
        <label className="new-client-form__label">
          Description:
          <textarea
            className="new-client-form__input new-client-form__input--textarea"
            name="description"
            value={newClientDescription}
            onChange={(e) => setNewClientDescription(e.target.value)}
            data-testid="new-client-description"
          />
        </label>
      </div>

      <input
        className="new-client-form__btn"
        type="submit"
        value="Submit"
        data-testid="submit-btn-text"
      />
    </form>
  )

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

export default NewClientForm
