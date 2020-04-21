import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const transaction = this.transactions;

    return transaction;
  }

  public getBalance(): Balance {
    // TODO
    const { income, outcome } = this.transactions.reduce(
      (acumulador: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            acumulador.income += transaction.value;
            break;
          case 'outcome':
            acumulador.outcome += transaction.value;
            break;
          default:
            break;
        }
        return acumulador;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
