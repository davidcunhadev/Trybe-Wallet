import { useSelector } from 'react-redux';
import './header.css';
import { useEffect, useState } from 'react';
import { ExpenseInfos, RootState } from '../types';
import logo from '../styleImgs/logoTrybeWallet.png';
import emailPhoto from '../styleImgs/emailVector.png';
import coins from '../styleImgs/coins.png';

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
    <header className="header">
      <img className="logo" src={ logo } alt="TrybeWallet Logo" />
      <div className="profile">
        <img src={ emailPhoto } alt="Foto do Perfil" />
        <p data-testid="email-field">
          Email:
          {' '}
          {userEmail}
        </p>
      </div>
      <div className="profile">
        <img className="coins" src={ coins } alt="Moedas" />
        <p>
          Despesa Total: R$
        </p>
        <p data-testid="total-field">{totalExpenses.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    </header>
  );
}

export default Header;
