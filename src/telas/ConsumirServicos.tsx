import React, { FormEvent, useState, useEffect } from 'react';
import Cliente from '../modelo/cliente';
import Servico from '../modelo/servico';
import ConsumirServico from '../negocio/consumirServico';
import { useNavigate } from 'react-router-dom';
const ConsumirServicoComponent: React.FC<{ clientes: Array<Cliente>, servicos: Array<Servico>, setClientes: React.Dispatch<React.SetStateAction<Array<Cliente>>>}> = ({ clientes, servicos, setClientes }) => {
    const navigate = useNavigate();
    const [idCliente, setIdCliente] = useState<number | undefined>(undefined);
    const [idPet, setIdPet] = useState<number | undefined>(undefined);
    const [idServico, setIdServico] = useState<number | undefined>(undefined);
    const [, setAtualizarTabelas] = useState(false);

    const [formData, setFormData] = useState({
      cliente: clientes[idCliente ?? 0],
      pet: idCliente !== undefined && idPet !== undefined ? clientes[idCliente].getPets[idPet] : undefined,
      servico: servicos[idServico ?? 0],
    });
 
    useEffect(() => {
      if (idCliente !== undefined && idCliente >= 0) {
        const clienteSelecionado = clientes[idCliente];
        setFormData((prevData) => ({ ...prevData, cliente: clienteSelecionado, pet: undefined }));
      }
    }, [idCliente, setClientes, clientes]);
  
    const handleAcharCliente = (id: number): void => {
      if (!isNaN(id) && clientes[id] !== undefined) {
        setIdCliente(id)
        formData.cliente = clientes[id];
      }
    };
  
    const handleAcharPet = (id: number): void => {
      if (!isNaN(id) && idCliente !== undefined && clientes[idCliente]?.getPets[id] !== undefined) {
        setIdPet(id)
        formData.pet = formData.cliente.getPets[id];
      }
    };
  
    const handleAcharServico = (id: number): void => {
      if (!isNaN(id) && servicos[id] !== undefined) {
        setIdServico(id)
        navigate('/consumir-servico');
      }
    };
  
    const handleConsumir = (event: FormEvent): void => {
      event.preventDefault();
      if (idCliente !== undefined && idPet !== undefined && idServico !== undefined) {
        const consumindo = new ConsumirServico(clientes, servicos);
        clientes = consumindo.consumirServico(idCliente, idPet, idServico);
        setAtualizarTabelas((prev) => !prev);
      }
    };
    return (
    <div className="container-fluid">
      <h1>Consumir Serviço</h1>
      <form onSubmit={handleConsumir}>
        <select
          className="form-select"
          onChange={(e) => handleAcharCliente(Number(e.target.value))}
          aria-label="Default select example"
        >
          <option
            style={{display: 'none'}}
          >Escolha o dono</option>
          {clientes.map((cliente, index) => (
            <option value={index}>{cliente.nome} ({cliente.getCpf.getValor})</option>
          ))}
        </select>
        <select
          className="form-select"
          onChange={(e) => handleAcharPet(Number(e.target.value))}
          aria-label="Default select example"
        >
          <option
            style={{display: 'none'}}
          >Escolha o dono</option>
          {formData.cliente.getPets.map((pet, index) => (
            <option value={index}>{pet.getNome}</option>
          ))}
        </select>
        <select
          className="form-select"
          onChange={(e) => handleAcharServico(Number(e.target.value))}
          aria-label="Default select example"
        >
          <option
            style={{display: 'none'}}
          >Escolha um serviço</option>
          {servicos.map((servicos, index) => (
            <option value={index}>{servicos.nome}</option>
          ))}
        </select>
        <div className="input-group mb-3">
            <button type="submit" className="btn btn-outline-success">
              consumir
            </button>
          </div>
      </form>
      {idCliente !== undefined && (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Pet</th>
              <th>Serviço</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {formData.cliente.getServicosConsumidos.map((servico, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{servico.pet.getNome}</td>
                <td>{servico.servicoConsumido.nome}</td>
                <td>{`${servico.dataConsumo.getDate()}/${servico.dataConsumo.getMonth() + 1}/${servico.dataConsumo.getFullYear()}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default ConsumirServicoComponent;