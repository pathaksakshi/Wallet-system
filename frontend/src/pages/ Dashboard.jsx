import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Container, Button } from 'react-bootstrap'
import { useWallet } from '../context/WalletContext'
import TransactionForm from '../components/TransactionForm'

export default function Dashboard() {
  const { wallet } = useWallet()
  const navigate = useNavigate()

  useEffect(() => {
    !wallet && navigate('/setup')
  }, [wallet, navigate])

  return (
    <Container>
      <Card className="mt-4">
        <Card.Body>
          <Card.Title className="text-center mb-4">Wallet Balance</Card.Title>
          <Card.Text className="display-4 text-center text-primary mb-5">
            ₹{wallet?.balance.toFixed(4)}
          </Card.Text>
          <TransactionForm />
          <div className="text-center mt-4">
            <Button 
              variant="outline-secondary" 
              href="/transactions"
              size="lg"
            >
              View Transaction History
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}