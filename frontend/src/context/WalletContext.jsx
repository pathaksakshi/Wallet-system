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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(wallet) {
      localStorage.setItem('wallet', JSON.stringify(wallet))
      fetchTransactions()
    }
  }, [wallet])

  const fetchTransactions = async () => {
    setLoading(true);
    try{
      const { data } = await apiClient.get(`/api/transactions?walletId=${wallet.id}`)
    setTransactions(data)
    }finally{
      setLoading(false)
    }
  }

  const createWallet = async (name, balance) => {
    setLoading(true);
    try{
      const { data } = await apiClient.post(`/api/setup`, { name, balance })
      setWallet(data)
      return data
    }finally{
      setLoading(false)
    }
   
  }

  const makeTransaction = async (amount, description) => {
    setLoading(true);
    try{
      const { data } = await apiClient.post(`/api/transactions/${wallet.id}`, {
        amount: Number(amount),
        description
      })
      setWallet(prev => ({ ...prev, balance: data.balance }))
      fetchTransactions()
      return data
    }finally{
      setLoading(false)
    }
  
  }

  return (
    <WalletContext.Provider value={{ 
      wallet, 
      loading,
      setLoading,
      transactions,
      createWallet, 
      makeTransaction 
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)