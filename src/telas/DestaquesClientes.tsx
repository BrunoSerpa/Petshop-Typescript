import { useState } from 'react';
import DestacarClientes from '../negocio/destacarClientes';
import Cliente from '../modelo/cliente';
import Destaque from '../modelo/destaque';
const DestacarClientesComponent: React.FC<{ clientes: Array<Cliente> }> = ({ clientes }) => {
  const destacando = new DestacarClientes(clientes);
  const [clientesDestaques, setClientesDestaques] = useState<Array<Destaque>>([]);

  function destacar(opcao: number) {
    let escolha: Array<Destaque>;
    if (opcao === 1) {
      escolha = destacando.produtosQuantidade;
      setClientesDestaques(escolha);
    }
    else if (opcao === 2) {
      escolha = destacando.produtosPreco;
      setClientesDestaques(escolha);
    }
    else if (opcao === 3) {
      escolha = destacando.servicosQuantidade;
      setClientesDestaques(escolha);
    }
    else if (opcao === 4) {
      escolha = destacando.servicosPreco;
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
        Mais consumiram produtos (Quantidade)
      </button>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => destacar(2)}
      >
        Mais gastaram com produtos (Preço)
      </button>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => destacar(3)}
      >
        Mais consumiram serviços (Quantidade)
      </button>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => destacar(4)}
      >
        Mais gastaram com serviços (Preço)
      </button>
      {clientesDestaques !== null && (<>
        <h2>Tabela de quantidade de produto</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Produto</th>
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

export default DestacarClientesComponent;