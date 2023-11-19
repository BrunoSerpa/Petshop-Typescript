import Cliente from "../modelo/cliente";
export default class AlterarPet {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
    }
    public alterarPet(cpfCliente: string, posicaoPet: number): Array<Cliente>{
        this.clientes = this.clientes.filter((cliente) =>
            (cliente.getCpf.getValor === cpfCliente) && cliente.getPets.filter(
                (pet, index) => index !== posicaoPet
            )
        )
        return this.clientes
    }
}