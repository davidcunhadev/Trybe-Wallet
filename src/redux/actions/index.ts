import { UserLogin } from '../../types';

// Coloque aqui suas actions
export const submitUserLogin = (email: UserLogin) => (
  { type: 'SUBMIT_USER_LOGIN',
    payload: email });
