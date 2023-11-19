import Cliente from "../modelo/cliente";
import Pet from "../modelo/pet";


export default class AlterarPet {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
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
}