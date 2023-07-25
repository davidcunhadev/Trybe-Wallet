import { AnyAction } from 'redux';
import { WalletInfos } from '../../types';
import { ADD_NEW_EXPENSE, REQUEST_WALLET_DATA,
  REQUEST_WALLET_DATA_ERROR,
  REQUEST_WALLET_DATA_SUCCESS } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const WALLET_INITIAL_STATE: WalletInfos = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = WALLET_INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case REQUEST_WALLET_DATA: {
      return { ...state, isLoading: true };
    }
    case REQUEST_WALLET_DATA_SUCCESS: {
      return { ...state, isLoading: false, currencies: action.payload, errorMessage: '' };
    }
    case REQUEST_WALLET_DATA_ERROR: {
      return { ...state, isLoading: false, errorMessage: action.payload.errorMessage };
    }
    case ADD_NEW_EXPENSE: {
      return { ...state, expenses: [...state.expenses, action.payload] };
    }
    default: return state;
  }
};

export default walletReducer;
