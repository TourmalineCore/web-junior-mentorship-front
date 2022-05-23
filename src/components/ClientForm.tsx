import './ClientForm.scss'

import { useState } from 'react'
import ClientDataDto from '../models/client-data.dto'

type ClientFormProps<SubmitResultType> = {
  initialClientData?: ClientDataDto
  onClientSubmitted?: (submitResult: SubmitResultType) => unknown
  submitClientCallbackAsync: (clientDataDto: ClientDataDto) => Promise<SubmitResultType>
}

function ClientForm<SubmitResultType>({
  initialClientData,
  onClientSubmitted = () => { },
  submitClientCallbackAsync,
}: ClientFormProps<SubmitResultType>) {
  const [newClientName, setNewClientName] = useState<string>(initialClientData ? initialClientData.name : ``)
  const [newClientDescription, setNewClientDescription] = useState<string>(initialClientData ? initialClientData.description || `` : ``)
  
  const [hasTriedToSubmit, setHasTriedToSubmit] = useState<boolean>(false)

  return (
    <form className="client-form" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
      <div className="client-form__fields">
        <label className="client-form__label">
          Name*:
          <input
            className="client-form__input"
            type="text"
            name="name"
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
            required
            data-testid="client-name"
          />
          {
            hasTriedToSubmit && !isNameValid() && (
              <span>Fill the name</span>
            )
          }

        </label>
        <label className="client-form__label">
          Description:
          <textarea
            className="client-form__input client-form__input--textarea"
            name="description"
            value={newClientDescription}
            onChange={(e) => setNewClientDescription(e.target.value)}
            data-testid="client-description"
          />
        </label>
      </div>

      <input
        className="client-form__btn"
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

    const result = await submitClientCallbackAsync(getClientData())

    onClientSubmitted(result)
  }

  function isNameValid() {
    const {
      name,
    } = getClientData()

    return !!name
  }

  function getClientData() {
    return {
      name: newClientName.trim(),
      description: newClientDescription.trim(),
    }
  }
}

export default ClientForm
