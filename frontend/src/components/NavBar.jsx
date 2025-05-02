import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'

export default function NavBar() {
  const { wallet } = useWallet()
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Wallet System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/transactions">Transactions</Nav.Link>
          </Nav>
          {wallet && (
            <div className="d-flex align-items-center text-white gap-3">
              <span>{wallet.name}</span>
              <span className="badge bg-primary">
                ₹{wallet.balance.toFixed(4)}
              </span>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
