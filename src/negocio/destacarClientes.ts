import Cliente from "../modelo/cliente";
class ClienteConsumo {
    public nomeCliente: string;
    public quantidadeConsumo: number;
    constructor(nomeCliente:string, quantidadeConsumo:number) {
        this.nomeCliente=nomeCliente
        this.quantidadeConsumo=quantidadeConsumo
    }
}

export default class DestacarClientes {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
    }
    public get servicosQuantidade(): Array<ClienteConsumo>{
        let listaClientes: Array<ClienteConsumo> = []
        this.clientes.forEach(cliente =>
            listaClientes.push(new ClienteConsumo(
                `${cliente.nomeSocial} (${cliente.nome})`,
                cliente.getServicosConsumidos.length
            ))
        )
        listaClientes = this.listaOrdenada(listaClientes, 10)
        return listaClientes
    }
    public get servicosPreco(): Array<ClienteConsumo>{
        let listaClientes: Array<ClienteConsumo> = []
        this.clientes.forEach(cliente =>{
            let quantidadeGasta:number = 0
            cliente.getServicosConsumidos.forEach(servico => quantidadeGasta += servico.servicoConsumido.preco)
            listaClientes.push(new ClienteConsumo(
                `${cliente.nomeSocial} (${cliente.nome})`,
                quantidadeGasta
            ))
        })
        listaClientes = this.listaOrdenada(listaClientes, 5)
        return listaClientes

    }
    public get produtosQuantidade(): Array<ClienteConsumo>{
        let listaClientes: Array<ClienteConsumo> = []
        this.clientes.forEach(cliente =>
            listaClientes.push(new ClienteConsumo(
                `${cliente.nomeSocial} (${cliente.nome})`,
                cliente.getProdutosConsumidos.length
            ))
        )
        listaClientes = this.listaOrdenada(listaClientes, 10)
        return listaClientes
    }
    public get produtosPreco(): Array<ClienteConsumo>{
        let listaClientes: Array<ClienteConsumo> = []
        this.clientes.forEach(cliente =>{
            let quantidadeGasta:number = 0
            cliente.getProdutosConsumidos.forEach(produto =>
                quantidadeGasta = quantidadeGasta + produto.produtoConsumido.preco
            )
            listaClientes.push(new ClienteConsumo(
                `${cliente.nomeSocial} (${cliente.nome})`,
                quantidadeGasta
            ))
        })
        listaClientes = this.listaOrdenada(listaClientes, 5)
        return listaClientes
    }
    public listaOrdenada(listaSelecionada: Array<ClienteConsumo>, quantPodio: number): Array<ClienteConsumo>{
        let lista:Array<ClienteConsumo>
        lista = listaSelecionada
        let listaOrdenada:Array<ClienteConsumo> = []
        const mapped = lista.map((v, i) => {
          return { i, value: v.quantidadeConsumo};
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
        listaSelecionada = []
        let count:number = 0
        listaOrdenada.forEach(cliente =>{
            if (count >= quantPodio){
                return listaSelecionada
            }
            listaOrdenada.push(cliente)
            count ++
        })
        return listaSelecionada
    }
}