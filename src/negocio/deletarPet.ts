import Entrada from "../io/entrada"

import Cliente from "../modelo/cliente"
import Pet from "../modelo/pet";
import Listagem from "./listagem";

export default class DeletarPet extends Listagem {
    private clientes: Array<Cliente>
    private entrada: Entrada
    private clienteEncontrado!: Cliente
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public listar(): void {
        console.log("---------------------------------------")
        console.log(`Dados dos Pets:\n`);
        console.log(`Nome: ` + this.clienteEncontrado.nome);
        if (this.clienteEncontrado.nomeSocial){
            console.log(`Nome social: ` + this.clienteEncontrado.nomeSocial);
        }
        console.log(`CPF: ` + this.clienteEncontrado.getCpf.getValor);
        let count = 1
        this.clienteEncontrado.getPets.forEach((petsData) => {
            console.log(`${count}º Pet:` + petsData.getNome)
            console.log(`- Tipo:` + petsData.getTipo)
            console.log(`- Genero:` + petsData.getGenero)
            console.log(`- Raça:` + petsData.getRaca)
            count++
            
        })
    }
    private encontrarCliente(criterio:String) {
        const clienteEncontrado = this.clientes.find(cliente =>
            cliente.nome.toLowerCase() === criterio.toLowerCase() || cliente.getCpf.getValor === criterio
        );
        if (clienteEncontrado) {
            this.clienteEncontrado=clienteEncontrado
            this.listar()
            return true
        }
        else {
            console.log('Cliente não encontrado.');
            return false
        }
    }
    public deletar(): Array<Cliente>{
        while (true) {
            let criterio = this.entrada.receberTexto(`Informe o nome ou o número do cpf deste cliente:`)
            let encontrado = this.encontrarCliente(criterio)
            let clienteAntigo = this.clienteEncontrado
            if (encontrado){
                while (true){
                    console.log("---------------------------------------")
                    console.log(`Informe qual pet deseja deletar:`)
                    let quantPets:number 
                    quantPets=this.clienteEncontrado.getPets.length
                    let numPets=[]
                    for (let i = 1; i < quantPets+1; i++) {
                        console.log(`${i} - ${i}º pet`)
                        numPets.push(i)
                    }
                    console.log(`0 - sair`)
                    let petEscolhido = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                    if (petEscolhido === 0){
                        break
                    }
                    else if (numPets.includes(petEscolhido)){
                        this.clienteEncontrado.setPets(
                            this.clienteEncontrado.getPets.filter(
                                petData => petData !== this.clienteEncontrado.getPets[petEscolhido-1]
                            )
                        )
                        break
                    }
                    else {
                        console.log("Insira uma opção válida")
                    }
                }
                let novoClientes: Array<Cliente>
                novoClientes = []
                this.clientes.forEach(clienteData =>{
                    if (clienteData === clienteAntigo){
                        novoClientes.push(this.clienteEncontrado)
                    }
                    else{
                        novoClientes.push(clienteData)
                    }
                })
                this.clientes = novoClientes
            }
            let continuar = this.entrada.receberTexto(`Deseja deletar mais algum pet? (S/N)`)
            if (continuar.toUpperCase() === 'S') {
                continue
            }
            break
        }
        return this.clientes
    }
}