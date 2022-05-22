import {
  Link,
  useNavigate,
} from 'react-router-dom'
import NewClientForm from '../components/NewClientForm'
import createClientAsync from '../services/create-client.command'

function NewClientPage() {
  let navigate = useNavigate()
  return (
    <div>
      <div>
        <Link to="/">Go back to Home Page</Link>
      </div>
      Create a New CLient!
      <NewClientForm
        onClientCreated={() => navigate(`/`)}
        createClientCallbackAsync={createClientAsync}
      />
    </div>
  )
}

export default NewClientPage
