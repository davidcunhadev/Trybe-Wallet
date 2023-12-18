import './Login.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitUserLogin } from '../redux/actions';

function Login() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: '',
    senha: '',
  });
  const { email, senha } = form;

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement>) => {
    const { name: targetName, value } = target;
    setForm({ ...form, [targetName]: value });
  };
  return (
    <div className="container">
      <form className="form-login">
        <label htmlFor="email">Email:</label>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          id="email"
          onChange={ handleChange }
          value={ email }
          required
          placeholder="Digite seu email"
        />
        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          name="senha"
          id="senha"
          onChange={ handleChange }
          value={ senha }
          data-testid="password-input"
          required
          placeholder="Digite sua senha"

        />
        <button
          disabled={ !email.includes('@') || senha.length < 6 || !email.includes('.com') }
          onClick={ () => {
            dispatch(submitUserLogin(form));
            nav('/carteira');
          } }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
