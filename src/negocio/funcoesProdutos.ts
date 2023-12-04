import { InItemVenda } from "../modelo/Interfaces";

function FuncoesProduto(produtos: InItemVenda[]) {
  return {
    cadastrarProduto: (novoProduto: InItemVenda) => {
      const produtoExistente = produtos.find(
        (produto) => produto.nome === novoProduto.nome && produto.valor === novoProduto.valor
      );
      if (!produtoExistente) {
        return [...produtos, novoProduto];
      }
      return produtos;
    },
    alterarProduto: (produtoAlterado: InItemVenda, posicaoProduto: number) => {
      return produtos.map((produto, index) =>
        index === posicaoProduto ? produtoAlterado : produto
      );
    },
    deletarProduto: (produtoEscolhido: InItemVenda) => {
      return produtos.filter((produto) => produto !== produtoEscolhido);
    },
  };
}

export default FuncoesProduto;
