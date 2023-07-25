import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ExpenseInfos, RootState } from '../types';

function Header() {
  const userEmail = useSelector((state: RootState) => state.user.email);
  const { expenses } = useSelector((state: RootState) => state.wallet);
  const [totalExpenses, setTotalExpenses] = useState(0);
  console.log(expenses);

  useEffect(() => {
    const calcExpenses = async () => {
      let totalValue = 0;
      expenses.forEach((expense: ExpenseInfos) => {
        if (expense.exchangeRates) {
          const exchangeRate: number = Number(expense.value)
          * Number(expense.exchangeRates[expense.currency].ask);
          totalValue += exchangeRate;
        }
      });
      setTotalExpenses(totalValue);
    };
    calcExpenses();
  }, [expenses]);

  return (
    <header>
      <p data-testid="email-field">
        Email:
        {' '}
        {userEmail}
      </p>
      <p>
        Despesa Total: R$
      </p>
      <p data-testid="total-field">{totalExpenses.toFixed(2)}</p>
      <p data-testid="header-currency-field">BRL</p>
    </header>
  );
}

export default Header;
