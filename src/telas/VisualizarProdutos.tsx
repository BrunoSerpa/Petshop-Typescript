import React, { useEffect } from 'react';
import Produto from '../modelo/produto';
import { useNavigate } from 'react-router-dom';
import FuncoesProduto from '../negocio/funcoesProdutos';
const ProdutosComponent: React.FC<{produtos: Array<Produto>, setProdutos: React.Dispatch<React.SetStateAction<Array<Produto>>>
}> = ({ produtos, setProdutos }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setProdutos(produtos);
  }, [produtos, setProdutos]);
  const handleAlterarProduto = (index: number): void => {
    navigate(`/alterar-produto/${index}`);
  };

  const handleNavegarCadastro = (): void => { 
    navigate('/cadastrar-produto');
  };
  const handleDeletarProduto = (idProduto: number): void => {
    const excluindoProduto = new FuncoesProduto(produtos)
    const novosProdutos = excluindoProduto.deletarProduto(produtos[idProduto]);
    setProdutos(novosProdutos);
  };
  return (
    <div>
      <h1>Produtos</h1>
      <button className="btn btn-success" onClick={handleNavegarCadastro}>Cadastrar Pets</button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Produto</th>
            <th scope="col">Funções</th>
          </tr>
        </thead>
        <tbody>

          {produtos.map((produto, numProduto) => (
            <tr key={`${numProduto} ${numProduto}`}>
              <th scope="col">{numProduto + 1}</th>
              <td scope="col">{produto.nome}</td>
              <td scope="col">{produto.preco}</td>
              <td scope="col">
                <button
                  className="btn btn-warning"
                  onClick={() => handleAlterarProduto(numProduto)}
                >
                  Alterar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeletarProduto(numProduto)}
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
export default ProdutosComponent;