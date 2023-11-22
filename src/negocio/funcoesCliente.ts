import Cliente from "../modelo/cliente"
export default class FuncoesCliente{
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
    }
    public cadastrarCliente(novoCliente: Cliente): Array<Cliente> {
        const clienteExistente = this.clientes.find(
            (cliente) => cliente.getCpf.getValor === novoCliente.getCpf.getValor
        );
        if (!clienteExistente) {
            this.clientes.push(novoCliente);
        }
        return this.clientes;
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
    public deletarCliente(cpfCliente: string): Array<Cliente>{
        this.clientes=this.clientes.filter((cliente) => cliente.getCpf.getValor !== cpfCliente)
        return this.clientes
    }
}