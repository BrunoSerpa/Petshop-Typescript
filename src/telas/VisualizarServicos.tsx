import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Servico from '../modelo/servico';
import FuncoesServico from '../negocio/funcoesServicos';

const ServicosComponent: React.FC<{servicos: Array<Servico>, setServicos: React.Dispatch<React.SetStateAction<Array<Servico>>>
}> = ({ servicos, setServicos }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setServicos(servicos);
  }, [servicos, setServicos]);
  const handleAlterarServico = (index: number): void => {
    navigate(`/alterar-servico/${index}`);
  };

  const handleNavegarCadastro = (): void => { 
    navigate('/cadastrar-servico');
  };
  const handleDeletarServico = (idServico: number): void => {
    const excluindoServico = new FuncoesServico(servicos)
    const novosServicos = excluindoServico.deletarServico(servicos[idServico]);
    setServicos(novosServicos);
  };
  return (
    <div>
      <h1>Serviços</h1>
      <button className="btn btn-success" onClick={handleNavegarCadastro}>Cadastrar Pets</button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Serviço</th>
            <th scope="col">Funções</th>
          </tr>
        </thead>
        <tbody>

          {servicos.map((servico, numServico) => (
            <tr key={`${numServico} ${numServico}`}>
              <th scope="col">{numServico + 1}</th>
              <td>{servico.getNome}</td>
              <td>{servico.getPreco}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleAlterarServico(numServico)}
                >
                  Alterar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeletarServico(numServico)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
  );
}
export default ServicosComponent;