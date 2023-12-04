import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
class ClienteConsumo {
    public nomeCliente: string;
    public quantidadeConsumo: number;
    constructor(nomeCliente: string, quantidadeConsumo: number) {
        this.nomeCliente = nomeCliente
        this.quantidadeConsumo = quantidadeConsumo
    }
}

export default class Destacar {
    private entrada: Entrada;
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public listar(desejoLista: number): Array<ClienteConsumo> {
        let listaClientes: Array<ClienteConsumo> = []
        if (desejoLista === 1) {
            this.clientes.forEach(cliente => {
                const nome = cliente.nomeSocial ? `${cliente.nomeSocial} (${cliente.nome})` : `${cliente.nome}`
                listaClientes.push(new ClienteConsumo(
                    nome,
                    cliente.getProdutosConsumidos.length
                ))
            })
        }
        else if (desejoLista === 2) {
            this.clientes.forEach(cliente => {
                const nome = cliente.nomeSocial ? `${cliente.nomeSocial} (${cliente.nome})` : `${cliente.nome}`
                listaClientes.push(new ClienteConsumo(
                    nome,
                    cliente.getServicosConsumidos.length
                ))
            })
        }
        else if (desejoLista == 3) {
            let ListaProdutosSeparados: Array<ClienteConsumo>
            ListaProdutosSeparados = []
            console.log(`Informe o dado que deseja alterar:`)
            console.log("1 - listar por tipo")
            console.log("2 - listar por raca")
            let listaDesejado = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
            if (listaDesejado == 1) {
                this.clientes.forEach(cliente =>
                    cliente.getProdutosConsumidos.forEach(produto =>
                        ListaProdutosSeparados.push(new ClienteConsumo(`${produto.pet && produto.pet.getTipo} (${produto.itemConsumido.getNome})`, 1))
                    )
                )
            }
            else if (listaDesejado == 2) {
                this.clientes.forEach(cliente =>
                    cliente.getProdutosConsumidos.forEach(produto =>
                        ListaProdutosSeparados.push(new ClienteConsumo(`${produto.pet && produto.pet.getRaca} (${produto.itemConsumido.getNome})`, 1))
                    )
                )
            }
            else {
                console.log(`Informe uma opção válida`)
                return ListaProdutosSeparados
            }

            ListaProdutosSeparados.forEach(cliente => {
                let achouCliente = listaClientes.find(
                    clienteAntigo => clienteAntigo.nomeCliente === cliente.nomeCliente
                )
                if (achouCliente) {
                    cliente = new ClienteConsumo(achouCliente.nomeCliente, (achouCliente.quantidadeConsumo++))
                }
                listaClientes.push(cliente)
            })
        }
        else if (desejoLista == 4) {
            let ListaServicosSeparados: Array<ClienteConsumo>
            ListaServicosSeparados = []
            console.log(`Informe o dado que deseja alterar:`)
            console.log("1 - listar por tipo")
            console.log("2 - listar por raca")
            let listaDesejado = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
            if (listaDesejado == 1) {
                this.clientes.forEach(cliente =>
                    cliente.getServicosConsumidos.forEach(servico =>
                        ListaServicosSeparados.push(new ClienteConsumo(`${servico.pet && servico.pet.getTipo} (${servico.itemConsumido.getNome})`, 1))
                    )
                )
            }
            else if (listaDesejado == 2) {
                this.clientes.forEach(cliente =>
                    cliente.getServicosConsumidos.forEach(servico => {
                        ListaServicosSeparados.push(new ClienteConsumo(`${servico.pet && servico.pet.getRaca} (${servico.itemConsumido.getNome})`, 1))
                    })
                )
            }
            else {
                console.log(`Informe uma opção válida`)
                return ListaServicosSeparados
            }
            ListaServicosSeparados.forEach(cliente => {
                let achouCliente = listaClientes.find(
                    clienteAntigo => clienteAntigo.nomeCliente === cliente.nomeCliente
                )
                if (achouCliente) {
                    cliente = new ClienteConsumo(achouCliente.nomeCliente, (achouCliente.quantidadeConsumo++))
                }
                listaClientes.push(cliente)
            })
        }
        else if (desejoLista === 5) {
            let soma: number
            this.clientes.forEach(cliente => {
                const nome = cliente.nomeSocial ? `${cliente.nomeSocial} (${cliente.nome})` : `${cliente.nome}`
                soma = 0
                cliente.getProdutosConsumidos.forEach(produto =>
                    soma = + produto.itemConsumido.getPreco
                )
                listaClientes.push(new ClienteConsumo(
                    nome,
                    soma
                ))
            })
        }
        else {
            let soma: number
            this.clientes.forEach(cliente => {
                const nome = cliente.nomeSocial ? `${cliente.nomeSocial} (${cliente.nome})` : `${cliente.nome}`
                soma = 0
                cliente.getServicosConsumidos.forEach(produto =>
                    soma = + produto.itemConsumido.getPreco
                )
                listaClientes.push(new ClienteConsumo(
                    nome,
                    soma
                ))
            })
        }
        return listaClientes
    }
    public destacar(pedido: number): void {
        if (![1, 2, 3, 4, 5, 6].includes(pedido)) {
            return
        }
        let lista: Array<ClienteConsumo>
        lista = this.listar(pedido)
        let listaOrdenada: Array<ClienteConsumo> = []
        const mapped = lista.map((v, i) => {
            return { i, value: v.quantidadeConsumo };
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
        if ([1, 2, 5, 6].includes(pedido)) {
            let limite: number = 0
            let count: number = 0
            if (pedido === 1 || pedido === 2) {
                limite = 10
                listaOrdenada.forEach(cliente => {
                    if (count >= limite) {
                        return
                    }
                    count++
                    console.log(`${count}º lugar: ${cliente.nomeCliente} - ${cliente.quantidadeConsumo} consumidos`)
                })
            }
            else {
                limite = 5
                listaOrdenada.forEach(cliente => {
                    if (count >= limite) {
                        return
                    }
                    count++
                    console.log(`${count}º lugar: ${cliente.nomeCliente} - R$${cliente.quantidadeConsumo} gastos`)
                })
            }
        }
        else {
            listaOrdenada.forEach(cliente => {
                console.log(`${cliente.nomeCliente} - ${cliente.quantidadeConsumo} consumidos`)
            })
        }
    }
}