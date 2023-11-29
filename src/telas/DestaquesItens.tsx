import { useState } from 'react';
import Cliente from '../modelo/cliente';
import DestacarItens from '../negocio/destacarItens';
import Destaque from '../modelo/destaque';

const DestacarItensComponent: React.FC<{ clientes: Array<Cliente> }> = ({ clientes }) => {
  const destacando = new DestacarItens(clientes);
  const [clientesDestaques, setClientesDestaques] = useState<Array<Destaque>>([]);

  function destacar(opcao: number) {
    let escolha: Array<Destaque>;
    if (opcao === 1) {
      escolha = destacando.produtoRaca;
      setClientesDestaques(escolha);
    }
    else if (opcao === 2) {
      escolha = destacando.produtoTipo;
      setClientesDestaques(escolha);
    }
    else if (opcao === 3) {
      escolha = destacando.servicoRaca;
      setClientesDestaques(escolha);
    }
    else if (opcao === 4) {
      escolha = destacando.servicoTipo;
      setClientesDestaques(escolha);
    }
  }

  return (
    <div className="container-fluid">
      <h1>Destacar Clientes</h1>
      <p> LISTAR OS CLIENTES QUE:</p>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => destacar(1)}
      >
        Produtos mais consumidos (Tipo)
      </button>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => destacar(2)}
      >
        Produtos mais consumidos (Raça)
      </button>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => destacar(3)}
      >
        Serviços mais consumidos (Tipo)
      </button>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => destacar(4)}
      >
        Serviços mais consumidos (Raça)
      </button>
      {clientesDestaques !== null && (<>
        <h2>Tabela de quantidade de produto</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Item</th>
            </tr>
          </thead>
          <tbody>
            {clientesDestaques.map((destaque, index) => (
              <tr key={`${index}`}>
                <td>{index + 1}</td>
                <td>{destaque.getNome}</td>
                <td>{destaque.getQuantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
      )}
    </div>
  );
};

export default DestacarItensComponent;