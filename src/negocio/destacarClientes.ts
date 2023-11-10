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
    public listar(desejoLista:number): Array<ClienteConsumo>{
        let listaClientes: Array<ClienteConsumo> = []
        if (desejoLista===1){
            this.clientes.forEach(cliente =>
                listaClientes.push(new ClienteConsumo(
                    `${cliente.nomeSocial} (${cliente.nome})`,
                    cliente.getProdutosConsumidos.length
                ))
            )
        }
        else if (desejoLista===2){
            this.clientes.forEach(cliente =>
                listaClientes.push(new ClienteConsumo(
                    `${cliente.nomeSocial} (${cliente.nome})`,
                    cliente.getServicosConsumidos.length
                ))
            )
        }
        else if (desejoLista===5){
            let soma: number
            this.clientes.forEach(cliente => {
                soma = 0
                cliente.getProdutosConsumidos.forEach(produto =>
                    soma =+ produto.produtoConsumido.preco
                )
                listaClientes.push(new ClienteConsumo(
                    `${cliente.nomeSocial} (${cliente.nome})`,
                    soma
                ))
            })
        }
        else{
            let soma: number
            this.clientes.forEach(cliente => {
                soma = 0
                cliente.getServicosConsumidos.forEach(produto =>
                    soma =+ produto.servicoConsumido.preco
                )
                listaClientes.push(new ClienteConsumo(
                    `${cliente.nomeSocial} (${cliente.nome})`,
                    soma
                ))
            })
        }
        return listaClientes
    }
    public destacar(pedido: number): void{
        if (![1, 2, 5, 6].includes(pedido)){
            return
        }
        let lista:Array<ClienteConsumo>
        lista = this.listar(pedido)
        let listaOrdenada:Array<ClienteConsumo> = []
        // temporary array holds objects with position and sort-value
        const mapped = lista.map((v, i) => {
          return { i, value: v.quantidadeConsumo};
        });
        
        // sorting the mapped array containing the reduced values
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
        let limite:number = 0
        let count:number = 0
        if (pedido === 1 || pedido ===2 ){
            limite = 10
            listaOrdenada.forEach(cliente =>{
                if (count > limite){
                    return
                }
                count ++
                console.log(`${count}º lugar: ${cliente.nomeCliente}: ${cliente.quantidadeConsumo} consumidos`)
            })
        }
        else{
            limite = 5
            listaOrdenada.forEach(cliente =>{
                if (count > limite){
                    return
                }
                count ++
                console.log(`${count}º lugar: ${cliente.nomeCliente} R$${cliente.quantidadeConsumo} gastos`)
            })
        }
    }
}