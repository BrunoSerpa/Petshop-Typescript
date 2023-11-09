import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Pet from "../modelo/pet";

import Listagem from "./listagem";

export default class AlterarPet extends Listagem {
    private clientes: Array<Cliente>
    private entrada: Entrada
    private petEscolhido!: Pet
    private numPet!: number
    private clienteEscolhido!: Cliente
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public listar(): void {
        let criterioCliente = this.entrada.receberTexto(`Informe o nome ou o número do cpf deste cliente:`)
        const clienteEncontrado = this.clientes.find(cliente =>
            cliente.nome.toLowerCase() === criterioCliente.toLowerCase() || cliente.getCpf.getValor === criterioCliente
        );
        if (clienteEncontrado){
            let criterioPet = this.entrada.receberTexto(`Informe o nome do Pet:`)
            let count = 0
            let petEncontrado!:Pet
            clienteEncontrado.getPets.forEach(pet =>{
                if (pet.getNome.toLowerCase() === criterioPet.toLowerCase()){
                    this.numPet=count
                    petEncontrado=pet
                }
                count++
            })
            if (petEncontrado){
                console.log(`Nome:` + petEncontrado.getNome)
                console.log(`Tipo:` + petEncontrado.getTipo)
                console.log(`Genero:` + petEncontrado.getGenero)
                console.log(`Raça:` + petEncontrado.getRaca)
                this.petEscolhido=petEncontrado
            } else {
                console.log(`Pet não Encontrado :(`)
            }
            this.clienteEscolhido=clienteEncontrado
        } else {
            console.log(`Cliente não Encontrado :(`)
        }
    }
    public alterar(): Array<Cliente>{
        while (true){
            this.listar()
            if (this.petEscolhido){
                while (true){
                    console.log(`Informe o dado que deseja alterar:`)
                    console.log("1 - Nome")
                    console.log("2 - Tipo")
                    console.log("3 - Genero")
                    console.log("4 - Raça")
                    console.log("0 - Sair")
                    let nome = this.petEscolhido.getNome
                    let tipo = this.petEscolhido.getTipo
                    let raca = this.petEscolhido.getGenero
                    let genero = this.petEscolhido.getRaca
                    let dadoDesejado = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                    switch (dadoDesejado){
                        case 1:
                            nome = this.entrada.receberTexto(`Por favor informe o nome do seu pet: `)
                            break
                        case 2:
                            tipo = this.entrada.receberTexto(`Por favor informe o tipo do seu pet: `)
                            break
                        case 3:
                            genero = this.entrada.receberTexto(`Por favor informe o genero do seu pet: `)
                            break
                        case 4:
                            raca =    this.entrada.receberTexto(`Por favor informe a raça do seu pet: `)
                            break
                        case 0:
                            break
                    }
                    this.petEscolhido = new Pet(nome, raca, genero, tipo)
                    if (dadoDesejado == 0){
                        break
                    }
                }
            }
            let continuar = this.entrada.receberTexto(`Deseja alterar mais algum pet? (S/N)`)
            if (continuar.toUpperCase() === 'S') {
                continue
            }
            break
        }
        this.clienteEscolhido.setPet(this.petEscolhido, this.numPet)
        return this.clientes
    }
}