import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FuncoesPet from '../negocio/funcoesPet';
import Cliente from '../modelo/cliente';

const PetsComponent:  React.FC<{clientes: Array<Cliente>, setClientes: React.Dispatch<React.SetStateAction<Array<Cliente>>>
}> = ({ clientes, setClientes }) => {
  const navegate = useNavigate();
  useEffect(() =>{
    setClientes(clientes);
  }, [clientes, setClientes])
  const handleAlterarPets = (posicaoCliente: number, posicaoPet: number):void =>{
    navegate(`/alterar-pet/${posicaoCliente}-${posicaoPet}`);
  };

  const handleNavegarCadastro = (): void => { 
    navegate('/cadastrar-pet');
  };
  const handleDeletarPets = (posicaoCliente: number, posicaoPet: number): void => {
    const excluindoPet = new FuncoesPet(clientes) 
    const novosClientes = excluindoPet.deletarPet(posicaoCliente, posicaoPet)
    setClientes(novosClientes);
  }
  return (
    <div>
      <h1>Pets</h1>
      <button className="btn btn-success" onClick={handleNavegarCadastro}>Cadastrar Pets</button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Genero</th>
            <th scope="col">Tipo</th>
            <th scope="col">Raça</th>
            <th scope="col">Funções</th>
          </tr>
        </thead>
        <tbody>

          {clientes.map((cliente, numCliente) => cliente.getPets.map((pet, numPet) => (
            <tr key={`${numCliente} ${numPet}`}>
              <th scope="col">{numCliente}{numPet}</th>
              <td scope="col">{pet.getNome}</td>
              <td scope="col">{pet.getGenero}</td>
              <td scope="col">{pet.getRaca}</td>
              <td scope="col">{pet.getTipo}</td>
              <td scope="col">
                <button
                  className="btn btn-warning"
                  onClick={() => handleAlterarPets(numCliente, numPet)}
                >
                  Alterar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeletarPets(numCliente, numPet)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          )))}
        </tbody>
        </table>
    </div>
  );
}
export default PetsComponent;