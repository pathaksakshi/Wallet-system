import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import { WalletProvider } from './context/WalletContext'
import Dashboard from './pages/ Dashboard'
import WalletSetup from './pages/WalletSetup'
import Transactions from './pages/Transactions'
import NavBar from './components/NavBar'

export default function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <NavBar />
        <Container className="my-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/setup" element={<WalletSetup />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </WalletProvider>
  )
}