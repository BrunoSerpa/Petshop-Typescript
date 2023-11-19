import Cliente from "../modelo/cliente";

export default class DeletarCliente{
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
    }
    public deletarCliente(cpfCliente: string): Array<Cliente>{
        this.clientes.filter((cliente) => cliente.getCpf.getValor !== cpfCliente)
        return this.clientes
    }
}