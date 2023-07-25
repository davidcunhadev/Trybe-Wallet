import { Dispatch, ExpenseInfos, UserLogin } from '../../types';

export const SUBMIT_EMAIL_SUCESS = 'SUBMIT_EMAIL_SUCESS';
export const REQUEST_WALLET_DATA = 'REQUEST_WALLET_DATA';
export const REQUEST_WALLET_DATA_SUCCESS = 'REQUEST_WALLET_DATA_SUCCESS';
export const REQUEST_WALLET_DATA_ERROR = 'REQUEST_WALLET_DATA_ERROR';
export const ADD_NEW_EXPENSE = 'ADD_NEW_EXPENSE';

export const API_URL = 'https://economia.awesomeapi.com.br/json/all';

// Coloque aqui suas actions

// Action para capturar o email colocado no input da tela da login.
export const submitUserLogin = (email: UserLogin) => (
  { type: SUBMIT_EMAIL_SUCESS,
    payload: email });

// Action para iniciar o request para a API.
export const requestWalletData = () => ({
  type: REQUEST_WALLET_DATA,
});

// Action caso a requisição seja bem sucedida.
export const requestWalletDataSuccess = (currencies: string[]) => ({
  type: REQUEST_WALLET_DATA_SUCCESS,
  payload: currencies,
});

// Action caso a requisição falhe.
export const requestWalletDataError = (errorMessage: string) => ({
  type: REQUEST_WALLET_DATA_ERROR,
  payload: {
    errorMessage,
  },
});

// Action Thunk para realizar a fetch.
export const fetchDataCurrencies = () => {
  return async (dispatch: Dispatch) => {
    dispatch(requestWalletData());
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const selectData = Object.keys(data).filter((key) => key !== 'USDT');
      dispatch(requestWalletDataSuccess(selectData));
    } catch (error: any) {
      return 'Erro desconhecido ao buscar usuário';
    }
  };
};

export const addNewExpense = (expense: ExpenseInfos) => ({
  type: ADD_NEW_EXPENSE,
  payload: expense,
});
