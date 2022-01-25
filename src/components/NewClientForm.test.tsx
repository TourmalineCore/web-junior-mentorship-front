import { render, screen } from '@testing-library/react';
import NewClientForm from './NewClientForm';

test('does not show name validation message initially', () => {
  render(
    <NewClientForm
      onClientCreated={() => {}}
    />
  )

  const validationMessageElement = screen.queryByText(`Fill the name`)
  expect(validationMessageElement).toBeNull()
})
