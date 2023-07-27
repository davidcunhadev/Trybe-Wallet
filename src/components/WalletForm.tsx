import { useDispatch, useSelector } from 'react-redux';
import './walletForm.css';
import { useEffect, useState } from 'react';
import { Dispatch, FormType, RootState } from '../types';
import { API_URL, addNewExpense, fetchDataCurrencies } from '../redux/actions';

const INITIAL_FORM_STATE = {
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
};

function WalletForm() {
  const dispatch: Dispatch = useDispatch();
  const currencies = useSelector((state: RootState) => state.wallet.currencies);

  const [id, setId] = useState(0);

  useEffect(() => {
    dispatch(fetchDataCurrencies());
  }, [dispatch]);

  const [form, setForm] = useState<FormType>(INITIAL_FORM_STATE);

  const { currency, description, method, tag, value } = form;

  const handleChange = ({ target }:
  React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement>) => {
    const { name, value: targetValue } = target;
    setForm({ ...form, [name]: targetValue });
  };

  const fetchData = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  };

  const handleClick = async () => {
    const newExpense = {
      id,
      ...form,
      exchangeRates: await fetchData(),
    };
    dispatch(addNewExpense(newExpense));
    setId(id + 1);
    setForm(INITIAL_FORM_STATE);
  };
  return (
    <form>
      <label htmlFor="value">Valor: </label>
      <input
        onChange={ handleChange }
        data-testid="value-input"
        type="text"
        name="value"
        id="value"
        value={ value }
      />

      <label htmlFor="currency">Moeda: </label>
      <select
        onChange={ handleChange }
        data-testid="currency-input"
        name="currency"
        id="currency"
        value={ currency }
      >
        {currencies.map((curr) => <option key={ curr } value={ curr }>{curr}</option>)}
      </select>

      <label htmlFor="method">Método de Pagamento: </label>
      <select
        onChange={ handleChange }
        data-testid="method-input"
        name="method"
        id="method"
        value={ method }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>

      <label htmlFor="tag">Tag: </label>
      <select
        onChange={ handleChange }
        data-testid="tag-input"
        name="tag"
        id="tag"
        value={ tag }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>

      <label htmlFor="description">Descrição: </label>
      <input
        onChange={ handleChange }
        data-testid="description-input"
        type="text"
        name="description"
        id="description"
        value={ description }
      />

      <button type="button" onClick={ handleClick }>Adicionar despesas</button>
    </form>
  );
}

export default WalletForm;
