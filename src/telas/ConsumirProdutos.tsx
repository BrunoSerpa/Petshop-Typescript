import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import ConsumirProduto from '../negocio/consumirProduto';

const ConsumirProdutoComponent: React.FC<{ clientes: Array<Cliente>, produtos: Array<Produto>, setClientes: React.Dispatch<React.SetStateAction<Array<Cliente>>>}> = ({ clientes, produtos, setClientes }) => {
    const navigate = useNavigate();
    const [idCliente, setIdCliente] = useState<number | undefined>(undefined);
    const [idPet, setIdPet] = useState<number | undefined>(undefined);
    const [idProduto, setIdProduto] = useState<number | undefined>(undefined);
    const [, setAtualizarTabelas] = useState(false);

    const [formData, setFormData] = useState({
      cliente: clientes[idCliente ?? 0],
      pet: idCliente !== undefined && idPet !== undefined ? clientes[idCliente].getPets[idPet] : undefined,
      produto: produtos[idProduto ?? 0],
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
  
    const handleAcharProduto = (id: number): void => {
      if (!isNaN(id) && produtos[id] !== undefined) {
        setIdProduto(id)
        navigate('/consumir-produto');
      }
    };
  
    const handleConsumir = (event: FormEvent): void => {
      event.preventDefault();
      if (idCliente !== undefined && idPet !== undefined && idProduto !== undefined) {
        const consumindo = new ConsumirProduto(clientes, produtos);
        clientes = consumindo.consumirProduto(idCliente, idPet, idProduto);
        setAtualizarTabelas((prev) => !prev);
      }
    };
    return (
    <div className="container-fluid">
      <h1>Consumir Produto</h1>
      <form onSubmit={handleConsumir}>
        <select
          className="form-select"
          onChange={(e) => handleAcharCliente(Number(e.target.value))}
          aria-label="Default select example"
          required
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
          required
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
          onChange={(e) => handleAcharProduto(Number(e.target.value))}
          aria-label="Default select example"
          required
        >
          <option
            style={{display: 'none'}}
          >Escolha um produto</option>
          {produtos.map((produtos, index) => (
            <option value={index}>{produtos.getNome}</option>
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
            {formData.cliente.getProdutosConsumidos.map((produto, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{produto.pet.getNome}</td>
                <td>{produto.itemConsumido.getNome}</td>
                <td>{`${produto.dataConsumo.getDate()}/${produto.dataConsumo.getMonth() + 1}/${produto.dataConsumo.getFullYear()}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default ConsumirProdutoComponent;