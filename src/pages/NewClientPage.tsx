import './NewClientPage.scss'

import {
  Link,
  useNavigate,
} from 'react-router-dom'
import ClientForm from '../components/ClientForm'
import createClientAsync from '../services/create-client.command'

function NewClientPage() {
  let navigate = useNavigate()
  
  return (
    <div className="new-client">
      <Link to="/" className="new-client__link">Go back to Home Page</Link>
      <div className="new-client__title">Create a New CLient!</div>
      <ClientForm<number>
        onClientSubmitted={() => navigate(`/`)}
        submitClientCallbackAsync={createClientAsync}
      />
    </div>
  )
}

export default NewClientPage
