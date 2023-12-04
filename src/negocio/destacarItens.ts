import { InDestaque } from "../modelo/Interfaces";
import Cliente from "../modelo/cliente";
import Destaque from "../modelo/destaque";

function somaItensSeparados(listaItensSeparados: Array<ReturnType<typeof Destaque>>): Array<ReturnType<typeof Destaque>> {
    const listaProdutosDestaques: Array<ReturnType<typeof Destaque>> = [];
    listaItensSeparados.forEach(destaque => {
        const destaqueExistente = listaProdutosDestaques.find(destaquesExistentes =>
            destaquesExistentes.getNome === destaque.getNome
        );
        if (destaqueExistente) {
            destaqueExistente.somaQuantidadeDestacado(1);
        } else {
            listaProdutosDestaques.push(destaque);
        }
    });
    return listaProdutosDestaques;
}

function criarDestaque(itemConsumido: any, pet: any): ReturnType<typeof Destaque> {
    const clienteDestacado: InDestaque = {
        nomeDestacado: `${itemConsumido.getNome()} (${pet.getTipo() || pet.getRaca()})`,
        quantidadeDestacado: 1
    };
    return Destaque(clienteDestacado);
}
function destacarItens(clientes: Array<ReturnType<typeof Cliente>>): ReturnType<typeof Destaque>[] {
    const listaItensSeparados: Array<ReturnType<typeof Destaque>> = [];
    clientes.forEach(cliente =>
        cliente.getProdutosConsumidos().forEach(consumo =>
            consumo.itemConsumido.nome && consumo.petConsumidor.tipo &&
            listaItensSeparados.push(criarDestaque(consumo.itemConsumido, consumo.petConsumidor))
        )
    );
    const listaProdutosDestaques = somaItensSeparados(listaItensSeparados);
    const listaOrdenadaDestaques = listaOrdenada(listaProdutosDestaques);
    return listaOrdenadaDestaques;
}

function listaOrdenada(listaSelecionada: ReturnType<typeof Destaque>[]): ReturnType<typeof Destaque>[] {
    return listaSelecionada
        .sort((a, b) => b.getQuantidade() - a.getQuantidade());
}

export default destacarItens;
