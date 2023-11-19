import Cliente from "../modelo/cliente";
import Pet from "../modelo/pet";


export default class FuncoesPet {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
    }
    public cadastrarPet(novoPet: Pet, cpfValor: string): Array<Cliente>{
        this.clientes.forEach((cliente, index) => {
            if (cliente.getCpf.getValor === cpfValor){
                this.clientes[index].getPets.push(novoPet);        
                return this.clientes
            }
        })
        return this.clientes
    }
    public alterarPet(petAlterado: Pet, cpfValor: string, posicaoPet: number): Array<Cliente>{
        this.clientes.forEach((cliente, index) => {
            if (cliente.getCpf.getValor === cpfValor){
                this.clientes[index].setPet(petAlterado, posicaoPet);
                return this.clientes
            }
        })
        return this.clientes
    }
    public deletarPet(cpfCliente: string, posicaoPet: number): Array<Cliente>{
        this.clientes = this.clientes.filter((cliente) =>
            (cliente.getCpf.getValor === cpfCliente) && cliente.getPets.filter(
                (pet, index) => index !== posicaoPet
            )
        )
        return this.clientes
    }
}