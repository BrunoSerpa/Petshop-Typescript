import { InCliente, InItemConsumo, InItemVenda } from "../modelo/Interfaces";

function consumirProduto(clientes: InCliente[], produtos: InItemVenda[]) {
  return {
    consumirProduto: (posicaoCliente: number, posicaoPet: number, posicaoProduto: number) => {
      const clienteConsumidor = clientes[posicaoCliente];
      const petConsumidor = clienteConsumidor.pets[posicaoPet];
      const dataConsumo = new Date();
      const produtoEscolhido = produtos[posicaoProduto];

      if (clienteConsumidor && petConsumidor && produtoEscolhido) {
        const novoItemConsumo: InItemConsumo = {
          itemConsumido: produtoEscolhido,
          dataConsumo,
          petConsumidor,
        };
        clienteConsumidor.produtosConsumidos.push(novoItemConsumo);
      }

      return clientes;
    },
  };
}

export default consumirProduto;
