import { fireEvent, render, screen } from '@testing-library/react';
import NewClientForm from './NewClientForm';

test('does not show name validation message initially', () => {
  render(
    <NewClientForm
      onClientCreated={() => { }}
      createClientCallbackAsync={() => Promise.resolve(1)}
    />
  )

  const validationMessageElement = screen.queryByText(`Fill the name`)
  expect(validationMessageElement).toBeNull()
})

test('shows name validation message when try to submit with empty name', () => {
  render(
    <NewClientForm
      createClientCallbackAsync={() => Promise.resolve(1)}
    />
  )

  fireEvent.click(screen.getByText('Submit'))

  const validationMessageElement = screen.getByText(`Fill the name`)
  expect(validationMessageElement).toBeInTheDocument()
})

test('calls create client command with sanitized name', () => {
  const newClientMock = jest.fn();

  render(
    <NewClientForm
      createClientCallbackAsync={newClientMock}
    />
  )

  fillInClientName('  New Client ')

  clickSubmit()

  expect(newClientMock).toHaveBeenCalledWith({ 'description': '', 'name': 'New Client' });
})

test('calls create client command with filled name and description', () => {
  const newClientMock = jest.fn();

  render(
    <NewClientForm
      createClientCallbackAsync={newClientMock}
    />
  )

  const newName = 'Best Client';
  const newDescription = 'nice';

  fillInClientName(newName)
  fireEvent.change(screen.getByTestId('new-client-description'), { target: { value: newDescription } })

  clickSubmit()

  expect(newClientMock).toHaveBeenCalledWith({
    name: newName,
    description: newDescription,
  });
})

test('shows name validation message when try to submit name with spaces only', () => {
  render(
    <NewClientForm
      createClientCallbackAsync={() => Promise.resolve(1)}
    />
  )

  fillInClientName('   ')

  clickSubmit()

  const validationMessageElement = screen.getByText(`Fill the name`)
  expect(validationMessageElement).toBeInTheDocument()
})


test('not to call createClientCallbackAsync if invalid name is submitted', () => {
  const newClientMock = jest.fn();

  render(
    <NewClientForm
      createClientCallbackAsync={newClientMock}
    />
  )

  fillInClientName(' ')

  clickSubmit()

  expect(newClientMock).not.toHaveBeenCalled();
})

function fillInClientName(text: string) {
  fireEvent.change(screen.getByTestId('new-client-name'), { target: { value: text } })
}

function clickSubmit() {
  fireEvent.click(screen.getByTestId('submit-btn-text'))
}
