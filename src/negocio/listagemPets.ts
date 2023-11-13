import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Pet from "../modelo/pet";
import ListagemClientes from "./listagemClientes";

class PetComDono{
    public dono: Cliente
    public animal: Pet
    constructor(dono:  Cliente, animal: Pet){
        this.dono = dono
        this.animal = animal
    }
}

export default class ListagemPets{
    private clientes: Array<Cliente>
    private listaClientes
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.entrada = new Entrada()
        this.listaClientes =  new ListagemClientes(this.clientes)
    }
    public set listarPet(petDesejado: Pet){
        console.log("---------------------------------------")
        console.log(`Dados do Pet:\n`);
        console.log(`- Nome: ${petDesejado.getNome}`)
        console.log(`- Tipo: ${petDesejado.getTipo}`)
        console.log(`- Genero: ${petDesejado.getGenero}`)
        console.log(`- Raça: ${petDesejado.getRaca}`)
    }
    
    public get selecionarPet(): PetComDono | undefined {
        let petsEncontrados:Array<PetComDono> = []
        while (true){
            let criterio = this.entrada.receberTexto(`Informe o nome de seu pet:`)
            this.clientes.forEach(cliente =>{
                cliente.getPets.forEach(pet =>{
                    if(pet.getNome.toLowerCase() === criterio.toLowerCase()){
                        let petComDono= new PetComDono(cliente, pet)
                        petsEncontrados.push(petComDono)
                    }
                })
            })
            if (petsEncontrados.length > 1){
                let count:number=1
                let opcoes: Array<number> = []
                
                console.log(`Mais de um Pet encontrado!`)
                console.log(`Quem é o dono?`)
                petsEncontrados.forEach(PetComDono =>{
                    console.log(`${count} - Cliente:`)
                    this.listaClientes.listarCliente=PetComDono.dono
                    opcoes.push(count)
                    count++
                })
                console.log(`0 - Nenhum`)
                let clienteDesejado = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                if (opcoes.includes(clienteDesejado)){
                    return petsEncontrados[clienteDesejado-1]
                } else if (clienteDesejado !== 0){
                    console.log(`Operação não entendida :(`)
                }
            } else if (petsEncontrados.length === 1){
                console.log(`Pet encontrado!`)
                return petsEncontrados[0]
            }
            else{
                console.log('Pet não encontrado :(');
            }
            let resposta = this.entrada.receberTexto(`Deseja procurar novamente? (S/N)`)
            if (resposta.toUpperCase() === 'S'){
                continue
            }
            break
        }
        return
    }
    public listar(): void {
        let petEspecifico= this.entrada.receberTexto(`Gostaria de Procurar um pet em específico? (S/N): `)
        switch (petEspecifico.toUpperCase()){
            case "S":
                const petEncontrado=this.selecionarPet
                if (petEncontrado){
                    this.listarPet=petEncontrado.animal
                }
                break
            case "N":
                console.log(`\nLista de todos os pets:`);
                this.clientes.forEach(clienteData =>
                    clienteData.getPets.forEach(petData =>{
                        this.listarPet=petData
                    })
                )
                break
            default:
                console.log(`Operação não entendida :(`)
                break
        }
    }
}