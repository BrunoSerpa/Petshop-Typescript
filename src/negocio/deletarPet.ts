import Entrada from "../io/entrada"

import Cliente from "../modelo/cliente"
import Pet from "../modelo/pet";
import ListagemClientes from "./listagemClientes";
import ListagemPets from "./listagemPets";

export default class DeletarPet{
    private listagemPets
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.entrada = new Entrada()
        this.listagemPets =  new ListagemPets(this.clientes)
    }
    public get deletar(): Array<Cliente>{
        while (true){
            while (true){
                const petEncontrado= this.listagemPets.selecionarPet
                if (petEncontrado){
                    this.listagemPets.listarPet= petEncontrado.animal
                    const excluir = this.entrada.receberTexto(`Ter certeza que deseja deletar esse pet? (S/N)`)
                    if (excluir === 'S') {
                        const clienteAntigo = this.clientes
                        const petnovos = petEncontrado.dono.getPets.filter(petData=> petData !== petEncontrado.animal)
                        let clienteNovo = petEncontrado.dono
                        clienteNovo.setPets = petnovos
                        this.clientes=[]
                        clienteAntigo.forEach(clienteData =>
                            clienteData === petEncontrado.dono?
                            this.clientes.push(clienteNovo) : this.clientes.push(clienteData)
                        )
                    }
                    else if (excluir !== 'N') {
                        console.log("Informe S para sim e N para não")
                    }
                    break
                } else {
                    break
                }
            }
            const continuar = this.entrada.receberTexto(`Deseja excluir mais algum pet? (S/N)`)
            if (continuar === 'S') {
                continue
            }
            break
        }
        return this.clientes
    }
}