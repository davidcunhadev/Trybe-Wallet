import { useSelector } from 'react-redux';
import './table.css';
import { RootState } from '../types';

function Table() {
  const expenses = useSelector((state: RootState) => state.wallet.expenses);

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <hr />
      <tbody>
        {expenses && expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{Number(expense.value).toFixed(2)}</td>
            <td>{expense.exchangeRates[expense.currency].name}</td>
            <td>{(Number(expense.exchangeRates[expense.currency].ask).toFixed(2))}</td>
            <td>
              {(Number(expense.value)
          * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
            </td>
            <td>{expense.currency}</td>
            <td className="buttons-container">
              <button>Editar</button>
              <button>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
