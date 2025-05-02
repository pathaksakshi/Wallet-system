import { createContext, useContext, useState, useEffect } from 'react'
// import axios from 'axios'
import apiClient from '../api/client'

const WalletContext = createContext()

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(() => {
    const saved = localStorage.getItem('wallet')
    return saved ? JSON.parse(saved) : null
  })
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    if(wallet) {
      localStorage.setItem('wallet', JSON.stringify(wallet))
      fetchTransactions()
    }
  }, [wallet])

  const fetchTransactions = async () => {
    const { data } = await apiClient.get(`/api/transactions?walletId=${wallet.id}`)
    setTransactions(data)
  }

  const createWallet = async (name, balance) => {
    const { data } = await apiClient.post(`/api/setup`, { name, balance })
    setWallet(data)
    return data
  }

  const makeTransaction = async (amount, description) => {
    const { data } = await apiClient.post(`/api/transactions/${wallet.id}`, {
      amount: Number(amount),
      description
    })
    setWallet(prev => ({ ...prev, balance: data.balance }))
    fetchTransactions()
    return data
  }

  return (
    <WalletContext.Provider value={{ 
      wallet, 
      transactions,
      createWallet, 
      makeTransaction 
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)