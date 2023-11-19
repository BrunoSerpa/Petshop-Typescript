import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cliente from '../modelo/cliente';
import FuncoesCliente from '../negocio/funcoesCliente';

const ClientesComponent: React.FC<{clientes: Array<Cliente>, setClientes: React.Dispatch<React.SetStateAction<Array<Cliente>>>
}> = ({ clientes, setClientes }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setClientes(clientes);
  }, [clientes, setClientes]);
  const handleAlterarCliente = (index: number): void => {
    navigate(`/alterar-cliente/${index}`);
  };

  const handleNavegarCadastro = (): void => { 
    navigate('/cadastrar-cliente');
  };
  const handleDeletarCliente = (cpfValor: string): void => {
    const excluindoCliente = new FuncoesCliente(clientes)
    const novosClientes = excluindoCliente.deletarCliente(cpfValor);
    setClientes(novosClientes);
  };
  return (
    <div>
      <h2>Clientes</h2>
      <button className="btn btn-success" onClick={handleNavegarCadastro}>Cadastrar Cliente</button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Funções</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={index}>
              <th scope="col">
                {index + 1}
              </th>
              <th scope="col">
                <div
                  className="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div className="accordion-item">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#cliente${index}`}
                      aria-expanded="false"
                      aria-controls={`cliente${index}`}
                    >
                      {cliente.nome}
                    </button>
                    <div
                      className="accordion-collapse collapse"
                      data-bs-parent={`#cliente${index}`}
                      id={`cliente${index}`}
                    >
                      <div className="card card-body">
                        <div className="container text-center">
                          <div className="row align-items-end">
                            <div className="col">
                              CPF
                            </div>
                            <div className="col">
                              {cliente.getCpf.getValor}
                            </div>
                            <div className="col">
                              {cliente.getCpf.getDataEmissao.getDay()}/{cliente.getCpf.getDataEmissao.getDate()}/{cliente.getCpf.getDataEmissao.getFullYear()}
                            </div>
                            {cliente.getRgs.map((rg,index)=>(
                              <div className="row align-items-end" key={index}>
                                <div className="col">
                                  {index+1}º RG
                                </div>
                                <div className="col">
                                  {rg.getValor}
                                </div>
                                <div className="col">
                                  {rg.getDataEmissao.getDay()}/{rg.getDataEmissao.getDate()}/{rg.getDataEmissao.getFullYear()}
                                </div>
                              </div>
                            ))}
                            {cliente.getTelefones.map((telefone,index)=>(
                              <div className="row align-items-end" key={index}>
                                <div className="col">
                                  {index+1}º Telefone
                                </div>
                                <div className="col">
                                  ({telefone.getDdd}){telefone.getNumero}
                                </div>
                                <div className="col">
                                </div>
                              </div>
                            ))}
                            {cliente.getPets.map((pet, index)=>(
                              <div className="row align-items-end" key={index}>
                                <div className="col">
                                  {index+1}º Pet
                                </div>
                                <div className="col">
                                  {pet.getNome} ({pet.getGenero})
                                </div>
                                <div className="col">
                                  {pet.getRaca} ({pet.getTipo})
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </th>
              <th scope="col">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleAlterarCliente(index)}
                  >Alterar</button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeletarCliente(cliente.getCpf.getValor)}>Excluir</button>
              </th>
              <th scope="col">
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ClientesComponent;