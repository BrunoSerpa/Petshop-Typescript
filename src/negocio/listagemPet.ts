import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";

import Listagem from "./listagem";

export default class ListagemPets extends Listagem {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public listar(): void {
        let petEspecifico= this.entrada.receberTexto(`Gostaria de Procurar um pet em específico? (S/N): `)
        switch (petEspecifico.toUpperCase()){
            case "S":
                let criterioCliente = this.entrada.receberTexto(`Informe o nome ou o número do cpf deste cliente:`)
                const clienteEncontrado = this.clientes.find(cliente =>
                    cliente.nome.toLowerCase() === criterioCliente.toLowerCase() || cliente.getCpf.getValor === criterioCliente
                );
                if (clienteEncontrado){
                    let criterioPet = this.entrada.receberTexto(`Informe o nome do Pet:`)
                    const petEncontrato = clienteEncontrado.getPets.find(pet =>
                        pet.getNome.toLowerCase() === criterioPet.toLowerCase()
                    )
                    if (petEncontrato){
                        console.log(`Nome:` + petEncontrato.getNome)
                        console.log(`Tipo:` + petEncontrato.getTipo)
                        console.log(`Genero:` + petEncontrato.getGenero)
                        console.log(`Raça:` + petEncontrato.getRaca)
                    } else {
                        console.log(`Pet não Encontrado :(`)
                    }
                } else {
                    console.log(`Cliente não Encontrado :(`)
                }
                break
            case "N":
                console.log(`\nLista de todos os pets:`);
                this.clientes.forEach(clienteData =>
                    clienteData.getPets.forEach(petData =>{
                        console.log(`Nome:` + petData.getNome)
                        console.log(`Tipo:` + petData.getTipo)
                        console.log(`Genero:` + petData.getGenero)
                        console.log(`Raça:` + petData.getRaca)
                        console.log(`Dono ${clienteData.nomeSocial} (${clienteData.nome})`)
                        console.log(`--------------------------------------`);
                    })
                )
                break
            default:
                console.log(`Operação não entendida :(`)
                break
        }
    }
}