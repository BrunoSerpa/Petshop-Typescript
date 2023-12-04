import Cliente from "../modelo/cliente";
import Destaque from "../modelo/destaque";
import { InDestaque } from "../modelo/Interfaces";

function criarDadosCliente(cliente: ReturnType<typeof Cliente>, quantidadeInicial: number): ReturnType<typeof Destaque> {
    const clienteDestacado: InDestaque = {
        nomeDestacado: cliente.getNomeSocial ? `${cliente.getNomeSocial()} (${cliente.getNome()})` : cliente.getNome(),
        quantidadeDestacado: quantidadeInicial,
    };

    return Destaque(clienteDestacado);
}

function calcularSomaQuantidade(dadosCliente: ReturnType<typeof Destaque>, itensConsumidos: any[]): void {
    itensConsumidos.forEach((item) => {
        // Certifique-se de que o objeto tem um método getPreco()
        dadosCliente.somaQuantidadeDestacado(item.itemConsumido.getPreco());
    });
}

function listaOrdenada(listaSelecionada: ReturnType<typeof Destaque>[], quantPodio: number): ReturnType<typeof Destaque>[] {
    return listaSelecionada
        .sort((a, b) => b.getQuantidade() - a.getQuantidade())
        .slice(0, quantPodio);
}

function getServicosQuantidade(clientes: ReturnType<typeof Cliente>[]): ReturnType<typeof Destaque>[] {
    const listaClientes: ReturnType<typeof Destaque>[] = clientes.map((cliente) =>
        criarDadosCliente(cliente, cliente.getServicosConsumidos().length)
    );

    return listaOrdenada(listaClientes, 10);
}

function getServicosPreco(clientes: ReturnType<typeof Cliente>[]): ReturnType<typeof Destaque>[] {
    const listaClientes: ReturnType<typeof Destaque>[] = clientes.map((cliente) => {
        const dadosCliente = criarDadosCliente(cliente, 0);
        calcularSomaQuantidade(dadosCliente, cliente.getServicosConsumidos());
        return dadosCliente;
    });

    return listaOrdenada(listaClientes, 5);
}

function getProdutosQuantidade(clientes: ReturnType<typeof Cliente>[]): ReturnType<typeof Destaque>[] {
    const listaClientes: ReturnType<typeof Destaque>[] = clientes.map((cliente) =>
        criarDadosCliente(cliente, cliente.getProdutosConsumidos().length)
    );

    return listaOrdenada(listaClientes, 10);
}

function getProdutosPreco(clientes: ReturnType<typeof Cliente>[]): ReturnType<typeof Destaque>[] {
    const listaClientes: ReturnType<typeof Destaque>[] = clientes.map((cliente) => {
        const dadosCliente = criarDadosCliente(cliente, 0);
        calcularSomaQuantidade(dadosCliente, cliente.getProdutosConsumidos());
        return dadosCliente;
    });

    return listaOrdenada(listaClientes, 5);
}

export {getProdutosPreco, getProdutosQuantidade, getServicosPreco, getServicosQuantidade, listaOrdenada}