import Cliente from "../modelo/cliente"
export default class CadastroCliente{
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
}