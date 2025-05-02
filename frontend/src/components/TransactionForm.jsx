import { useState } from 'react'
import { Form, Button, Card, Stack } from 'react-bootstrap'
import { useWallet } from '../context/WalletContext'

export default function TransactionForm() {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('CREDIT')
  const { makeTransaction } = useWallet()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const transactionAmount = type === 'CREDIT' ? Math.abs(amount) : -Math.abs(amount)
    await makeTransaction(transactionAmount, description)
    setAmount('')
    setDescription('')
  }

  return (
    <Card className="mb-4">
      <Card.Body>
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
                onChange={(e) => setAmount(e.target.value)}
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
              Submit Transaction
            </Button>
          </Stack>
        </Form>
      </Card.Body>
    </Card>
  )
}