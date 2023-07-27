import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type UserLogin = {
  email: string
};

export type WalletInfos = {
  currencies: [],
  expenses: ExpenseInfos[],
  editor: boolean,
  idToEdit: number
};

export type RootState = {
  user: UserLogin,
  wallet: WalletInfos
};

export type Currency = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
};

export type CurrencyData = {
  [key: string] : Currency
};

export type FormType = {
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
};

export type ExpenseInfos = {
  id: number,
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates: CurrencyData
};

export type Dispatch = ThunkDispatch<RootState, null, AnyAction>;
