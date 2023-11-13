import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";

import ListagemClientes from "./listagemClientes";

export default class DeletarCliente{
    private listaClientes
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.entrada = new Entrada()
        this.listaClientes =  new ListagemClientes(this.clientes)
    }
    public get deletar(): Array<Cliente>{
        while (true){
            while (true){
                const clienteEncontrado = this.listaClientes.selecionarCliente
                if (clienteEncontrado){
                    this.listaClientes.listarCliente = clienteEncontrado
                    const excluir = this.entrada.receberTexto(`Ter certeza que deseja deletar esse usuário? (S/N)`)
                    if (excluir === 'S') {
                        this.clientes = this.clientes.filter(clienteData => clienteData !== clienteEncontrado);
                    }
                    else if (excluir !== 'N') {
                        console.log("Informe S para sim e N para não")
                    }
                    break
                }
            }
            const continuar = this.entrada.receberTexto(`Deseja excluir mais algum cliente? (S/N)`)
            if (continuar === 'S') {
                continue
            }
            break
        }
        return this.clientes
    }
}