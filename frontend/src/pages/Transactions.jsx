import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Container, Card, Button } from 'react-bootstrap'
import { useWallet } from '../context/WalletContext'

const columns = [
  { 
    field: 'date', 
    headerName: 'Date', 
    width: 200,
    valueFormatter: (params) => {
      if (!params) return 'N/A'
      try {
        return new Date(params).toLocaleString()
      } catch {
        return 'Invalid Date'
      }
    }
  },
  { 
    field: 'description', 
    headerName: 'Description', 
    width: 250,
    valueFormatter: (params) => params || 'No description'
  },
  { 
    field: 'amount', 
    headerName: 'Amount', 
    width: 150,
    valueFormatter: (params) => {
      const value = parseFloat(params)
      return isNaN(value) ? 'Invalid' : value.toFixed(4)
    },
    cellClassName: (params) => {
      if (!params?.row) return ''
      return params.row.type === 'CREDIT' ? 'text-success' : 'text-danger'
    }
  },
  { 
    field: 'balance', 
    headerName: 'Balance', 
    width: 150,
    valueFormatter: (params) => {
      const value = parseFloat(params)
      return isNaN(value) ? 'Invalid' : value.toFixed(4)
    }
  },
  { 
    field: 'type', 
    headerName: 'Type', 
    width: 120,
    cellClassName: (params) => {
      if (!params?.value) return ''
      return params.value === 'CREDIT' ? 'bg-success-subtle' : 'bg-danger-subtle'
    }
  },
]

export default function Transactions() {
  const { transactions } = useWallet()
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })

  // Client-side pagination
  const paginatedTransactions = transactions.slice(
    paginationModel.page * paginationModel.pageSize,
    (paginationModel.page + 1) * paginationModel.pageSize
  )

  const handleExport = () => {
    const csvContent = [
      'Date,Description,Amount,Balance,Type',
      ...transactions.map(t => 
        `${t.date || ''},${t.description || ''},${t.amount?.toFixed(4) || ''},${t.balance?.toFixed(4) || ''},${t.type || ''}`
      )
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'transactions.csv'
    link.click()
  }

  // Transform transactions to match expected format
  const transformedTransactions = transactions.map(t => ({
    ...t,
    amount: parseFloat(t.amount),
    balance: parseFloat(t.balance),
    date: t.date  
  }))

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Card.Title className="mb-0">Transaction History</Card.Title>
            <Button variant="success" onClick={handleExport}>
              Export CSV
            </Button>
          </div>
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={transformedTransactions}
              columns={columns}
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              disableRowSelectionOnClick
              getRowId={(row) => row.id}
              rowCount={transactions.length}
            />
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}