import Cliente from "../modelo/cliente"
import Pet from "../modelo/pet"

export default class FuncoesPet {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
    }
    public cadastrarPet(novoPet: Pet, index: number): Array<Cliente>{
        let dono = this.clientes[index]
        if (dono){
            let novo = dono.getPets.find(pet => pet === novoPet)
            if (!novo){
                this.clientes[index].getPets.push(novoPet)
            }
        }
        return this.clientes
    }
    public alterarPet(petAlterado: Pet, posicaoCliente: number, posicaoPet: number): Array<Cliente>{
        let petAntigo = this.clientes[posicaoCliente].getPets[posicaoPet]
        if (petAntigo){
            this.clientes[posicaoCliente].getPets[posicaoPet]=petAlterado
        }
        return this.clientes
    }
    public deletarPet(posicaoCliente: number, posicaoPet: number): Array<Cliente>{
        let clientesAntigos = this.clientes
        this.clientes = []
        clientesAntigos.forEach((cliente, index) => {
            if (index===posicaoCliente){
                cliente.setPets=cliente.getPets.filter((pet, index) => index !== posicaoPet)
            }
            this.clientes.push(cliente)
        })
        return this.clientes
    }
}