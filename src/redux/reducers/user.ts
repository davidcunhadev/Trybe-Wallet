import { AnyAction } from 'redux';
import { UserLogin } from '../../types';
import { SUBMIT_EMAIL_SUCESS } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const USER_INITIAL_STATE: UserLogin = {
  email: '',
};

const userReducer = (state = USER_INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case SUBMIT_EMAIL_SUCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default userReducer;
