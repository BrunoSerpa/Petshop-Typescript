import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Pet from "../modelo/pet";
import ListagemPets from "./listagemPets";


export default class AlterarPet {
    private clientes: Array<Cliente>
    private listagemPets
    private entrada: Entrada
    private petSelecionado!: Pet
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.entrada = new Entrada()
        this.listagemPets =  new ListagemPets(this.clientes)
    }
    private continuar!:boolean
    public get alterar(): Array<Cliente>{
        this.continuar=true
        while(this.continuar){
            const petSelecionado= this.listagemPets.selecionarPet
            if (petSelecionado){
                this.petSelecionado=petSelecionado.animal
            } else {
                break
            }
            while (this.continuar){
                this.listagemPets.listarPet = this.petSelecionado
                console.log(`Informe o dado que deseja alterar:`)
                console.log("1 - Nome")
                console.log("2 - Tipo")
                console.log("3 - Genero")
                console.log("4 - Raça")
                console.log("0 - Sair")
                let nome = this.petSelecionado.getNome
                let tipo = this.petSelecionado.getTipo
                let raca = this.petSelecionado.getGenero
                let genero = this.petSelecionado.getRaca
                let opcao = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                switch (opcao){
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
                this.petSelecionado = new Pet(nome, raca, genero, tipo)
                if (opcao !== 0){
                    let resposta = this.entrada.receberTexto(`Deseja alterar mais algum dado? (S/N)`)
                    if (resposta.toUpperCase() === 'S') {
                        continue
                    }
                }
                this.continuar=false     
            }
            this.continuar=true
            let resposta = this.entrada.receberTexto(`Deseja alterar mais algum pet? (S/N)`)
            if (resposta.toUpperCase() === 'S') {
                continue
            }
            this.continuar=false
        }
        return this.clientes
    }
}