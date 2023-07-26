import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import App from '../App';
import Wallet from '../pages/Wallet';

describe('Testes na tela de login', () => {
  test('Testa se os campos email e senha estão presentes na tela', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByRole('textbox', { name: /email:/i });
    const senha = screen.getByLabelText(/senha:/i);

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });

  test('Se o botão começa desabilitado, e após o usuário preencher os campos o botão é habilitado, e após o click o usuário é redirecinado para a /carteira', async () => {
    renderWithRouterAndRedux(<App />);

    const user = userEvent.setup();

    const email = screen.getByRole('textbox', { name: /email:/i });
    const senha = screen.getByLabelText(/senha:/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();
    await user.type(email, 'tryber@teste.com');
    expect(email).toHaveValue('tryber@teste.com');
    await user.type(senha, 'abc123');
    expect(senha).toHaveValue('abc123');
    expect(button).not.toBeDisabled();
    await user.click(button);

    const expenses = screen.getByText(/despesa total: r\$/i);
    expect(expenses).toBeInTheDocument();
  });
});

describe('Testes na tela da carteira', () => {
  test('Se ao renderizar a página, o valor inicial da despesa seja 0 e que o texto BRL esteja na tela', () => {
    renderWithRouterAndRedux(<Wallet />);

    const expenseValue = screen.getByText(/0\.00/i);
    expect(expenseValue).toBeTruthy();

    const brlCurrency = screen.getByText(/brl/i);
    expect(brlCurrency).toBeInTheDocument();
  });

  // test('Se ao preencher os campos, o valor do estado é alterado', async () => {
  //   renderWithRouterAndRedux(<Wallet />);

  //   const user = userEvent.setup();

  //   const valueInput = screen.getByTestId('value-input');
  //   const selectCurrencyElement = screen.getByTestId('currency-input');
  //   const currencySelected = screen.getByRole('option', { name: 'USD' });
  //   const methodInput = screen.getByTestId('method-input');
  //   const tagInput = screen.getByTestId('tag-input');
  //   const descriptionInput = screen.getByTestId('description-input');

  //   await user.type(valueInput, '5');
  //   // await user.selectOptions(selectCurrencyElement, currencySelected);
  // });
});
