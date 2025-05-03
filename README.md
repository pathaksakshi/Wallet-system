# 💼 Wallet System

A full-stack MERN application for managing digital wallets and transactions.

---

## 🌐 Deployments

* **Backend**: [https://walletsystem-u93y.onrender.com](https://walletsystem-u93y.onrender.com)
* **Frontend**: [https://wallet-system-hpl9.vercel.app](https://wallet-system-hpl9.vercel.app)

---

## ⚙️ Tech Stack

* **Frontend**: React (Vite), React Router, Axios, Bootstrap, MUI DataGrid
* **Backend**: Node.js, Express, MongoDB, Mongoose, Decimal.js
* **Database**: MongoDB

---

## 📘 API Endpoints

### 1. Initialize Wallet

* **Method**: `POST`
* **Endpoint**: `/api/setup`

**Request**:

```json
{
  "name": "My Wallet",
  "balance": 100.5000
}
```

**Response**:

```json
{
  "id": "65a1b2c3d4e5f6g7h8i9j0k",
  "name": "My Wallet",
  "balance": 100.5000,
  "transactionId": "65a1b2c3d4e5f6g7h8i9j0l",
  "date": "2024-01-15T12:34:56.789Z"
}
```

---

### 2. Credit/Debit Transaction

* **Method**: `POST`
* **Endpoint**: `/api/transactions/:walletId`

**Request**:

```json
{
  "amount": 50.2500,
  "description": "Recharge"
}
```

**Response**:

```json
{
  "balance": 150.7500,
  "transactionId": "65a1b2c3d4e5f6g7h8i9j0m"
}
```

---

### 3. Get Transactions

* **Method**: `GET`
* **Endpoint**: `/api/transactions?walletId=:walletId&skip=0&limit=10`

**Response**:

```json
[
  {
    "id": "65a1b2c3d4e5f6g7h8i9j0m",
    "amount": 50.2500,
    "balance": 150.7500,
    "description": "Recharge",
    "type": "CREDIT",
    "date": "2024-01-15T12:35:00.000Z"
  }
]
```

---

### 4. Get Wallet Details

* **Method**: `GET`
* **Endpoint**: `/api/wallet/:id`

**Response**:

```json
{
  "id": "65a1b2c3d4e5f6g7h8i9j0k",
  "name": "My Wallet",
  "balance": 150.7500,
  "date": "2024-01-15T12:34:56.789Z"
}
```

---

## ⚙️ Backend Setup Instructions

1. Navigate to the backend folder:

```bash
cd backend
npm install
```

2. Create a `.env` file with the following variables:

```
MONGO_URI=<your_mongodb_uri>
PORT=5000
RATE_LIMITING_WINDOW=15
RATE_LIMITING_MAX=100
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

3. Start the backend server:

```bash
npm start
```

---

## 🗄️ Database Design

### Wallet Collection

```js
{
  name: String,
  balance: Decimal128,
  date: Date
}
```

### Transaction Collection

```js
{
  walletId: ObjectId,
  amount: Decimal128,
  balance: Decimal128,
  description: String,
  type: String,
  date: Date
}
```

**Optimizations**:

* Used `Decimal128` for accurate currency calculations
* Indexed `walletId` for optimized queries
* Ensured atomic operations to maintain data consistency

---

## 🌐 Frontend Setup Instructions

1. Navigate to the frontend folder:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Optional `.env` configuration:

```env
VITE_API_URL=http://localhost:5000
```

---

## 🧠 Application Design

* **State Management**: React Context API
* **Persistence**: Wallet data is stored in local storage
* **Main Components**:

  * `WalletSetup`: Create a new wallet
  * `TransactionForm`: Handle credit/debit
  * `Transactions`: Display transaction history

---

## 🎨 UI Libraries

* React Bootstrap – UI forms and layout
* MUI DataGrid – Tabular transaction history
* React Icons – Enhanced visuals and icons

---

## 🚨 Error Handling

* Form validation with inline messages
* Global error toasts for user feedback
* Safe API calls using try/catch with boundaries

---

## 🧪 Testing APIs

Use **Postman** or `curl` to test APIs. Refer to the [API Endpoints](#api-endpoints) section above.

---

## ✅ Features Summary

* Initialize wallet with starting balance
* Perform credit/debit transactions
* View wallet info and transaction history
* React-based responsive UI
* Robust error handling
* Full deployment and hosting
