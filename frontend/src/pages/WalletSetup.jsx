import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Container, Card, Alert } from 'react-bootstrap'
import { useWallet } from '../context/WalletContext'

export default function WalletSetup() {
  const [name, setName] = useState('')
  const [balance, setBalance] = useState('0') // Initialize with '0'
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const { createWallet } = useWallet()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}
    
    if (!name.trim()) {
      newErrors.name = 'Wallet name is required'
    }
    
    // Convert to number even if empty (will be treated as 0)
    const balanceValue = balance === '' ? 0 : parseFloat(balance)
    if (isNaN(balanceValue)) {
      newErrors.balance = 'Invalid balance amount'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    setErrors({})
    
    if (!validateForm()) return

    try {
      // Convert empty string to 0, otherwise use parsed value
      const balanceValue = balance === '' ? 0 : parseFloat(balance)
      await createWallet(name, balanceValue)
      navigate('/')
    } catch (error) {
      setApiError(error.message || 'Failed to create wallet. Please try again.')
    }
  }

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <Card>
        <Card.Body>
          <Card.Title className="mb-4 text-center">Create New Wallet</Card.Title>
          
          {apiError && <Alert variant="danger" className="mb-4">{apiError}</Alert>}

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Wallet Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => {
                  const value = e.target.value;
                  // Block input if it contains numbers
                  if (!/\d/.test(value)) {
                    setName(value);
                  }
                }}
                isInvalid={!!errors.name}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Initial Balance</Form.Label>
              <Form.Control
                type="number"
                step="0.0001"
                value={balance}
                onChange={(e) => setBalance(e.target.value || '0')} // Reset to '0' if empty
                isInvalid={!!errors.balance}
                placeholder="0.0000"
              />
              <Form.Control.Feedback type="invalid">
                {errors.balance}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg">
                Create Wallet
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}