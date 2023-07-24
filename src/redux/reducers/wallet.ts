import { AnyAction } from 'redux';
// import { WalletInfos } from '../../types';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const WALLET_INITIAL_STATE = {
  moeda: 'euro',
};

const walletReducer = (state = WALLET_INITIAL_STATE, action: AnyAction) => state;

export default walletReducer;
