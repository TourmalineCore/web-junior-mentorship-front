import { fireEvent, render, screen } from '@testing-library/react';
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

test('shows name validation message when try to submit with empty name', () => {
  render(
    <NewClientForm
      onClientCreated={() => {}}
    />
  )

  fireEvent.click(screen.getByText('Submit'))

  const validationMessageElement = screen.getByText(`Fill the name`)
  expect(validationMessageElement).toBeInTheDocument()
})
