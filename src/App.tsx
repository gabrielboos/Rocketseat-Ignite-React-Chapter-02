import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Headers";
import { GlobalStyle } from "./styles/global";
import { createServer, Model } from "miragejs";
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";

createServer({

  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Xupisco',
          type: 'deposit',
          category: 'Serviço',
          amount: 50,
          createdAt: new Date('2021-07-13 21:00:00'),
        },
        {
          id: 2,
          title: 'Listerine',
          type: 'withdraw',
          category: 'Saúde',
          amount: 35,
          createdAt: new Date('2021-07-13 21:10:00'),
        }
      ],
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data);
    });
  }
});

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  return (
    <TransactionsProvider >
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />

      <GlobalStyle />
    </TransactionsProvider>
  );
}