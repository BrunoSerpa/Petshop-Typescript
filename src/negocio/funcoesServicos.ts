import { InItemVenda } from "../modelo/Interfaces";

function FuncoesServico(servicos: InItemVenda[]) {
  return {
    cadastrarServico: (novoServico: InItemVenda) => {
      const servicoExistente = servicos.find(
        (servico) => servico.nome === novoServico.nome && servico.valor === novoServico.valor
      );
      if (!servicoExistente) {
        return [...servicos, novoServico];
      }
      return servicos;
    },
    alterarServico: (servicoAlterado: InItemVenda, posicaoServico: number) => {
      return servicos.map((servico, index) =>
        index === posicaoServico ? servicoAlterado : servico
      );
    },
    deletarServico: (servicoEscolhido: InItemVenda) => {
      return servicos.filter((servico) => servico !== servicoEscolhido);
    },
  };
}

export default FuncoesServico;
