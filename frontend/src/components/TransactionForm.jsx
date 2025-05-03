import { useState } from 'react'
import { Form, Button, Card, Stack, Alert, Spinner } from 'react-bootstrap'
import { useWallet } from '../context/WalletContext'

export default function TransactionForm() {
  const [amount, setAmount] = useState('')
  const [apiError, setApiError] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('CREDIT')
  
  const { makeTransaction ,wallet,loading} = useWallet()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    try {
    const transactionAmount = type === 'CREDIT' ? Math.abs(amount) : -Math.abs(amount)
    if (type === 'DEBIT' && Math.abs(amount) > wallet.balance) {
      setApiError('Insufficient balance for this transaction');
      return;
    }
    await makeTransaction(transactionAmount, description)
    setAmount('')
    setDescription('')
    } catch (error) {
      setApiError(error.message || 'There was some Error while creating transaction. Please try again.')
    }
  }

  return (
    <Card className="mb-4">
      <Card.Body>
      {apiError && <Alert variant="danger" className="mb-4">{apiError}</Alert>}
        <Card.Title className="mb-4">New Transaction</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Stack gap={3}>
            <div className="d-grid gap-2">
              <Button 
                variant={type === 'CREDIT' ? 'success' : 'outline-success'}
                onClick={() => setType('CREDIT')}
              >
                Credit
              </Button>
              <Button 
                variant={type === 'DEBIT' ? 'danger' : 'outline-danger'}
                onClick={() => setType('DEBIT')}
              >
                Debit
              </Button>
            </div>

            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                step="0.0001"
                value={amount}
                onChange={(e) => {
                  const validValue = e.target.value.replace(/[^0-9.]/g, '');
                  setAmount(validValue);
                }}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
            {loading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
            Processing...
          </>
        ) : (
          'Submit Transaction'
        )}
              {/* Submit Transaction */}
            </Button>
          </Stack>
        </Form>
      </Card.Body>
    </Card>
  )
}