import React, { useState } from 'react';
import Cliente from '../modelo/cliente';
import DestacarClientes from '../negocio/destacarClientes';
import ClienteConsumo from '../modelo/destaqueConsumo';

const DestacarClientesComponent: React.FC<{ clientes: Array<Cliente> }> = ({ clientes }) => {
  const destacando = new DestacarClientes(clientes);
  const [clientesDestaques, setClientesDestaques] = useState<Array<ClienteConsumo>>([]);
  const [titulos, setTitulos] = useState<Array<string>>([]);

  function destacar(opcao: number) {
    let hank: Array<ClienteConsumo>;
    if (opcao === 1) {
      hank = destacando.produtosQuantidade;
      setTitulos(['',''])
      setClientesDestaques(hank);
    }
    else if (opcao === 2) {
      hank = destacando.produtosPreco;
      setClientesDestaques(hank);
    }
    else if (opcao === 3) {
      hank = destacando.servicosQuantidade;
      setClientesDestaques(hank);
    }
    else if (opcao === 4) {
      hank = destacando.servicosPreco;
      setClientesDestaques(hank);
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
            {clientesDestaques.map((cliente, index) => (
              <tr key={`${index}`}>
                <td>{index+1}</td>
                <td>{cliente.nomeCliente}</td>
                <td>{cliente.quantidadeConsumo}</td>
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