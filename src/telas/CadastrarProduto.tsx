import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Produto from "../modelo/produto";
import FuncoesProduto from '../negocio/funcoesProdutos';

const CadastrarProdutosComponent: React.FC<{ produtos: Array<Produto> }> = ({ produtos }) => {
  /* Forms */
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(Number());
  const [centavos, setCentavos] = useState(Number());
  const handleNomeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNome(event.target.value);
  };
  const handlePrecoChance = (event: ChangeEvent<HTMLInputElement>): void => {
    setPreco(Number(event.target.value));
  };
  const handleCentavosChance = (event: ChangeEvent<HTMLInputElement>): void => {
    setCentavos(Number(event.target.value));
  };

  const cadastrandoProdutos = new FuncoesProduto(produtos)
  const navigate = useNavigate();
  const handleCadastrar = (event: FormEvent): void => {
    event.preventDefault();
    const dadosForm = new Produto(nome, preco + centavos / 100);
    produtos = cadastrandoProdutos.cadastrarProduto(dadosForm);
    navigate('/produtos');
  }
  return (
    <div className="container-fluid">
      <h1>Cadastrar Produto</h1>
      <form onSubmit={handleCadastrar}>
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
            required
            onChange={handleNomeChange}
            value={nome}
          />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="nome" className="input-group-text">
            Preço R$
          </label>
          <input
            min={0}
            aria-label="Nome"
            aria-describedby="basic-addon1"
            className="form-control"
            type="number"
            placeholder="Nome"
            required
            onChange={handlePrecoChance}
            value={preco}
          />
          <label htmlFor="nome" className="input-group-text">
            ,
          </label>
          <input
            min={0}
            max={99}
            aria-label="Nome"
            aria-describedby="basic-addon1"
            className="form-control"
            type="number"
            placeholder="Nome"
            required
            onChange={handleCentavosChance}
            value={centavos}
          />
        </div>
        <div className="input-group mb-3">
          <button type="submit" className="btn btn-outline-success">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
export default CadastrarProdutosComponent;