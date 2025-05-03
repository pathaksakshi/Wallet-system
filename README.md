# 💼 Wallet System

A full-stack application for managing digital wallets and transactions.

---

## 🛠️ Backend

* **Backend Deployment**: [https://walletsystem-u93y.onrender.com](https://walletsystem-u93y.onrender.com)
* **Frontend Deployment**: [https://wallet-system-hpl9.vercel.app](https://wallet-system-hpl9.vercel.app)

### 📘 API Endpoints

#### 1. Initialize Wallet

* **Method**: `POST`

* **Endpoint**: `/api/setup`

* **Request**:

  ```json
  {
    "name": "My Wallet",
    "balance": 100.5000
  }
  ```

* **Response**:

  ```json
  {
    "id": "65a1b2c3d4e5f6g7h8i9j0k",
    "name": "My Wallet",
    "balance": 100.5000,
    "transactionId": "65a1b2c3d4e5f6g7h8i9j0l",
    "date": "2024-01-15T12:34:56.789Z"
  }
  ```

#### 2. Credit/Debit Transaction

* **Method**: `POST`

* **Endpoint**: `/api/transactions/:walletId`

* **Request**:

  ```json
  {
    "amount": 50.2500,
    "description": "Recharge"
  }
  ```

* **Response**:

  ```json
  {
    "balance": 150.7500,
    "transactionId": "65a1b2c3d4e5f6g7h8i9j0m"
  }
  ```

#### 3. Get Transactions

* **Method**: `GET`
* **Endpoint**: `/api/transactions?walletId=:walletId&skip=0&limit=10`
* **Response**:

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

#### 4. Get Wallet Details

* **Method**: `GET`
* **Endpoint**: `/api/wallet/:id`
* **Response**:

  ```json
  {
    "id": "65a1b2c3d4e5f6g7h8i9j0k",
    "name": "My Wallet",
    "balance": 150.7500,
    "date": "2024-01-15T12:34:56.789Z"
  }
  ```

---

### ⚙️ Backend Setup Instructions

1. **Install dependencies**:

   ```bash
   cd backend
   npm install
   ```

2. **Create `.env` file** and add all the required environment variables.

3. **Start the server**:

   ```bash
   npm start
   ```

---

### 🗄️ Database Design

**MongoDB** with 2 collections:

#### 🪪 Wallet Collection

```js
{
  name: String,
  balance: Decimal128,
  date: Date
}
```

#### 💰 Transaction Collection

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

* Use of `Decimal128` for precise financial calculations.
* Indexes on `walletId` for fast lookups.
* Atomic updates for transaction and balance integrity.

---

## 🌐 Frontend

### 📡 API Consumption

* **Base URL**: `http://localhost:5173/api`

#### Endpoints:

```js
// Initialize Wallet
POST /setup

// Create Transaction
POST /transact/:walletId

// Get Transactions
GET /transactions?walletId=:id

// Get Wallet
GET /wallet/:id
```

---

### ⚙️ Frontend Setup Instructions

1. **Install dependencies**:

   ```bash
   cd frontend
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Optional**: Configure API base URL in `.env`:

   ```env
   VITE_API_URL=http://localhost:5000
   ```

---

### 🧠 Application Design

* **State Management**: React Context API
* **Local Storage**: For wallet data persistence
* **Key Components**:

  * `WalletSetup`: Initial wallet creation
  * `TransactionForm`: Handles credits/debits
  * `Transactions`: Lists wallet transactions

---

### 🎨 UI Libraries

* React Bootstrap (Layout and forms)
* MUI DataGrid (Transaction table)
* React Icons (Visual indicators)

---

### 🚨 Error Handling

* Inline validation for form fields
* Global toast messages for errors
* API error boundaries for safe API access

---

## 🧰 Technologies Used

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* Decimal.js

### Frontend

* React
* React Router
* Axios
* Bootstrap
* MUI DataGrid

---

## 🚀 Running the Project

1. **Start MongoDB** service

2. Open separate terminals for backend and frontend:

   ```bash
   # Backend
   cd backend
   npm start
   ```

   ```bash
   # Frontend
   cd frontend
   npm run dev
   ```

3. **Access the app** at: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Testing APIs

You can use **Postman** or `curl` to test the APIs. Refer to the examples in the [API Endpoints](#api-endpoints) section.

---

## ✅ Features Summary

* Create wallets with initial balances
* Record and retrieve credit/debit transactions
* View real-time updated wallet balance
* Persist wallet data in local storage
* User-friendly interface with responsive UI
* Proper error handling for smooth UX

