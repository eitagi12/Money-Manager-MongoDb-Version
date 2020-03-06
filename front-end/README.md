# Money Manager

## 📘 Description

Money Manager is a Web application that helps you record your income and expenses

## 📦 Built With

### Frontend

- [x] React
- [x] React Hooks
- [x] Ant Design
- [x] Material-UI

### Backend

- [x] NodeJS
- [x] Express
- [x] MySQL2

## 🛠 Structure

```mermaid
graph LR;
  Money Manager-frontend --> Money Manager-backend;
  Money Manager-backend -->JWT
  JWT -->|Authentication| Money Manager-backend;
  Money Manager-backend --> Sequelize;
  Sequelize --> MySQL;
```

## 📋 Features

- Show total of your accounts
- Show History
- Add/Edit/Delete Income
- Add/Edit/Delete Expense

## 💡 Getting Started

Clone Project

```bash
git clone https://github.com/eitagi12/Income-and-Expense-Account.git
```

### Frontend

```bash
cd Income-and-Expense-Account
/front-end
npm install
npm start
```

### Backend

```bash
cd Income-and-Expense-Account
/back-end
npm install
node index.js
```

Before `node index.js` edit your password and database name in config/config.json

## ⚙️ Configurations

Edit your password and database name in config/config.json

```bash
{
  "development": {
    "username": "root",
    "password": "your-password",
    "database": "your-db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "your-password",
    "database": "your-db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "your-password",
    "database": "your-db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
