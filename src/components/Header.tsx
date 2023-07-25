import { useSelector } from 'react-redux';
import { RootState } from '../types';

function Header() {
  const userEmail = useSelector((state: RootState) => state.user.email);
  const expenseValue = 0;

  return (
    <section>
      <p data-testid="email-field">
        Email:
        {' '}
        {userEmail}
      </p>
      <p data-testid="total-field">
        Despesa Total: R$
        {' '}
        {expenseValue}
      </p>
      <p data-testid="header-currency-field">BRL</p>
    </section>
  );
}

export default Header;
