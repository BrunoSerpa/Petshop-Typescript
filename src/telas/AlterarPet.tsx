import React, { ChangeEvent, FormEvent, useState } from 'react';
import Cliente from '../modelo/cliente';
import Pet from '../modelo/pet';
import { useNavigate } from 'react-router-dom';

const AlterarPetsComponent: React.FC<{ clientes: Array<Cliente>, posicaoCliente: number, posicaoPet: number }> = ({clientes,  posicaoCliente, posicaoPet}) => {
  const [formData, setFormData] = useState({
    nome: clientes[posicaoCliente].getPets[posicaoPet].getNome,
    genero: clientes[posicaoCliente].getPets[posicaoPet].getGenero,
    raca: clientes[posicaoCliente].getPets[posicaoPet].getRaca,
    tipo: clientes[posicaoCliente].getPets[posicaoPet].getTipo,
  })
  const dadosForm = new Pet(
    formData.nome,
    formData.raca,
    formData.genero,
    formData.tipo
  );
  const handleInputChange = (field: string, value: any): void => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };
  const handleNomeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    handleInputChange('nome', event.target.value);
  };
  const handleGeneroChange = (event: ChangeEvent<HTMLInputElement>): void => {
    handleInputChange('genero', event.target.value);
  };
  const handleRacaChange = (event: ChangeEvent<HTMLInputElement>): void => {
    handleInputChange('raca', event.target.value);
  };
  const handleTipoChange = (event: ChangeEvent<HTMLInputElement>): void => {
    handleInputChange('tipo', event.target.value);
  };
  const navigate = useNavigate();
  const handleAlterarPets = (event: FormEvent): void =>{
    event.preventDefault();
    let clientesAntigos= clientes
    clientes = []
    clientesAntigos.forEach((cliente, index) =>{ 
      if (index === posicaoCliente){
        cliente.setPet(dadosForm, posicaoPet)
      }
      clientes.push(cliente)
    })
    navigate('/clientes');
  }

  return (
    <div className="container-fluid">
      <h1>Alterar Pet</h1>
      <form onSubmit={handleAlterarPets}>
        {/* Seção do Nome */}
        <div className="input-group mb-3">
          <label htmlFor="nome" className="input-group-text">
            Nome
          </label>
          <input
            aria-label="Nome"
            aria-describedby="basic-addon1"
            className="form-control"
            type="text"
            placeholder="Nome"
            onChange={handleNomeChange}
            value={formData.nome}
          />
        </div>
        {/* Seção do Gênero */}
        <div className="input-group mb-3">
          <div className="form-check form-check-inline">
              <input
              className="form-check-input"
              name={`inlineRadioOptions`}
              type="radio"
              value="Macho"
              checked={formData.genero === "Macho"}
              onChange={(e) => (handleGeneroChange(e))}
            />
            <label className="form-check-label" htmlFor={`inlineRadio1`}>
              Macho
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              id={`inlineRadio2`}
              name={`inlineRadioOptions`}
              type="radio"
              value="Fêmea"
              checked={formData.genero === "Fêmea"}
              onChange={(e) => (handleGeneroChange(e))}
            />
            <label className="form-check-label" htmlFor={`inlineRadio2`}>
              Fêmea
            </label>
          </div>
        </div>
        {/* Seção da Raça */}
        <div className="input-group mb-3">
          <label htmlFor="raca" className="input-group-text">
            Raça
          </label>
          <input
            aria-label="Raca"
            aria-describedby="basic-addon1"
            className="form-control"
            type="text"
            placeholder="Raça"
            onChange={handleRacaChange}
            value={formData.raca}
          />
        </div>
        {/* Seção da Tipo */}
        <div className="input-group mb-3">
          <label htmlFor="tipo" className="input-group-text">
            Tipo
          </label>
          <input
            aria-label="Tipo"
            aria-describedby="basic-addon1"
            className="form-control"
            type="text"
            placeholder="Tipo"
            onChange={handleTipoChange}
            value={formData.tipo}
          />
        </div>
        <div className="input-group mb-3">
          <button type="submit" className="btn btn-outline-success">
            Alterar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AlterarPetsComponent;
