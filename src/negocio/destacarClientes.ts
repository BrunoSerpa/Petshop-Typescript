import Cliente from "../modelo/cliente"
import Destaque from "../modelo/destaque"

export default class DestacarClientes {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
    }
    public get servicosQuantidade(): Array<Destaque> {
        let listaClientes: Array<Destaque> = []
        this.clientes.forEach(cliente =>
            listaClientes.push(new Destaque(
                cliente.nomeSocial ? `${cliente.nomeSocial} (${cliente.nome})` : `${cliente.nome}`,
                cliente.getServicosConsumidos.length
            ))
        )
        listaClientes = this.listaOrdenada(listaClientes, 10)
        return listaClientes
    }
    public get servicosPreco(): Array<Destaque> {
        let listaClientes: Array<Destaque> = []
        this.clientes.forEach(cliente => {
            const dadosCliente = new Destaque(
                cliente.nomeSocial ? `${cliente.nomeSocial} (${cliente.nome})` : `${cliente.nome}`,
                0
            )
            cliente.getServicosConsumidos.forEach(servico =>
                dadosCliente.SomaQuantidadeDestacado = servico.itemConsumido.getPreco
            )
            listaClientes.push(dadosCliente)
        })
        listaClientes = this.listaOrdenada(listaClientes, 5)
        return listaClientes
    }
    public get produtosQuantidade(): Array<Destaque> {
        let listaClientes: Array<Destaque> = []
        this.clientes.forEach(cliente =>
            listaClientes.push(new Destaque(
                cliente.nomeSocial ? `${cliente.nomeSocial} (${cliente.nome})` : `${cliente.nome}`,
                cliente.getProdutosConsumidos.length
            ))
        )
        listaClientes = this.listaOrdenada(listaClientes, 10)
        return listaClientes
    }
    public get produtosPreco(): Array<Destaque> {
        let listaClientes: Array<Destaque> = []
        this.clientes.forEach(cliente => {
            const dadosCliente = new Destaque(
                cliente.nomeSocial ? `${cliente.nomeSocial} (${cliente.nome})` : `${cliente.nome}`,
                0
            )
            cliente.getProdutosConsumidos.forEach(servico =>
                dadosCliente.SomaQuantidadeDestacado = servico.itemConsumido.getPreco
            )
            listaClientes.push(dadosCliente)
        })
        listaClientes = this.listaOrdenada(listaClientes, 5)
        return listaClientes
    }
    public listaOrdenada(listaSelecionada: Array<Destaque>, quantPodio: number): Array<Destaque> {
        let lista: Array<Destaque>;
        lista = listaSelecionada;
        let listaOrdenada: Array<Destaque> = [];
        const mapped = lista.map((v, i) => {
            return { i, value: v.getQuantidade };
        });
        mapped.sort((a, b) => {
            if (a.value < b.value) {
                return 1;
            }
            if (a.value > b.value) {
                return -1;
            }
            return 0;
        });
        listaOrdenada = mapped.map((v) => lista[v.i]);
        listaSelecionada = [];
        let count: number = 0;
        listaOrdenada.forEach((cliente) => {
            if (count >= quantPodio) {
                return;
            }
            listaSelecionada.push(cliente);
            count++;
        });
        return listaSelecionada;
    }

}