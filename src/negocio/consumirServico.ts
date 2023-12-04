import { InCliente, InItemConsumo, InItemVenda } from "../modelo/Interfaces";

function consumirServico(clientes: InCliente[], produtos: InItemVenda[]) {
  return {
    consumirServico: (posicaoCliente: number, posicaoPet: number, posicaoServico: number) => {
      const clienteConsumidor = clientes[posicaoCliente];
      const petConsumidor = clienteConsumidor.pets[posicaoPet]; // Corrigido para acessar 'pets' diretamente
      const dataConsumo = new Date();
      const servicoEscolhido = produtos[posicaoServico];

      if (clienteConsumidor && petConsumidor && servicoEscolhido) {
        const novoItemConsumo: InItemConsumo = {
          itemConsumido: servicoEscolhido,
          dataConsumo,
          petConsumidor,
        };
        clienteConsumidor.servicosConsumidos.push(novoItemConsumo); // Corrigido para acessar 'servicosConsumidos' diretamente
      }

      return clientes;
    },
  };
}

export default consumirServico;
