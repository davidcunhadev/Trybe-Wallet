import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import App from '../App';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

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
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mockData),
    });

    renderWithRouterAndRedux(<Wallet />);
    expect(global.fetch).toBeCalledTimes(1);
  });

  test('Se ao renderizar a página, o valor inicial da despesa seja 0 e que o texto BRL esteja na tela', () => {
    const expenseValue = screen.getByText(/0\.00/i);
    expect(expenseValue).toBeTruthy();

    const brlCurrency = screen.getByText(/brl/i);
    expect(brlCurrency).toBeInTheDocument();
  });

  test('Se ao preencher os campos, o valor do estado é alterado', async () => {
    const user = userEvent.setup();

    const valueInput = screen.getByRole('textbox', { name: 'Valor:' });
    const currencySelected = await screen.findByRole('combobox', { name: 'Moeda:' });
    const methodInput = screen.getByRole('combobox', { name: 'Método de Pagamento:' });
    const tagInput = screen.getByRole('combobox', { name: 'Tag:' });
    const descriptionInput = screen.getByRole('textbox', { name: 'Descrição:' });
    const button = screen.getByRole('button', { name: /adicionar despesas/i });

    await user.type(valueInput, '5');
    await user.selectOptions(currencySelected, 'USD');
    await user.selectOptions(methodInput, 'Dinheiro');
    await user.selectOptions(tagInput, 'Alimentação');
    await user.type(descriptionInput, 'Comida');
    await user.click(button);
  });
});
