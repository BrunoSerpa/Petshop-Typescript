import Cliente from "../modelo/cliente";
import Pet from "../modelo/pet";


export default class AlterarPet {
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
}