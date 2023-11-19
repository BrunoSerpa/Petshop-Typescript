import Cliente from "../modelo/cliente";

export default class AlterarCliente{
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
    }
    public alterarCliente(clienteAlterado: Cliente, cpfValor: string): Array<Cliente>{
        this.clientes.forEach((cliente, index) => {
            if (cliente.getCpf.getValor === cpfValor){
                this.clientes[index] = clienteAlterado;
                return this.clientes
            }
        })
        return this.clientes
    }
}