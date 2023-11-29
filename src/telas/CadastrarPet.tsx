import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cliente from '../modelo/cliente';
import Pet from '../modelo/pet';

const CadastrarPetsComponent: React.FC<{ clientes: Array<Cliente> }> = ({ clientes }) => {
  const [idCliente, setIdCliente] = useState(Number());
  const [formData, setFormData] = useState({
    index: idCliente,
    nome: '',
    genero: '',
    raca: '',
    tipo: '',
  });
  const navigate = useNavigate();
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
  const handleAlterarPets = (event: FormEvent): void => {
    event.preventDefault();
    let clientesAntigos = clientes
    clientes = []
    clientesAntigos.forEach((cliente, index) => {
      if (index === idCliente - 1) {
        cliente.getPets.push(dadosForm)
      }
      clientes.push(cliente)
    })
    navigate('/clientes');
  }
  const handleAcharCliente = (idCliente: number): void => {
    if (!isNaN(idCliente) && clientes[idCliente] !== undefined) {
      formData.index = idCliente
      setIdCliente(idCliente + 1);
    }
  };
  const handleCancelar = (): void => {
    setIdCliente(Number());
  };


  return (
    <div className="container-fluid">
      <h1>Alterar Pet</h1>
      {idCliente ? (
        <form onSubmit={handleAlterarPets}>
          <div className="input-group mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              disabled
            >
              <option>{clientes[formData.index].nome}</option>
            </select>
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => handleCancelar()}
            >
              Cancelar
            </button>
          </div>
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
      ) : (
        <select
          className="form-select"
          onChange={(e) => handleAcharCliente(Number(e.target.value))}
          aria-label="Default select example"
        >
          <option
            style={{ display: 'none' }}
          >Escolha o dono</option>
          {clientes.map((cliente, index) => (
            <option value={index}>{cliente.nome} ({cliente.getCpf.getValor})</option>
          ))}
        </select>
      )
      }
    </div>
  );
};

export default CadastrarPetsComponent;
