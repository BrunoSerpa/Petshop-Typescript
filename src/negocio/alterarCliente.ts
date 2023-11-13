import Entrada from "../io/entrada";
import ListagemClientes from "./listagemClientes";
import Cliente from "../modelo/cliente";
import CPF from "../modelo/cpf";
import RG from "../modelo/rg";
import Telefone from "../modelo/telefone";
import Pet from "../modelo/pet";

export default class AlterarCliente{
    private clientes: Array<Cliente>
    private listaClientes
    private entrada: Entrada
    private clienteSelecionado!: Cliente
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.entrada = new Entrada()
        this.listaClientes =  new ListagemClientes(this.clientes)
    }

    private continuar!:boolean
    public get alterar(): Array<Cliente>{
        this.continuar=true
        while (this.continuar){
            const clienteSelecionado = this.listaClientes.selecionarCliente
            if (clienteSelecionado){
                this.clienteSelecionado=clienteSelecionado
            } else{
                break
            }
            while (this.continuar){
                this.listaClientes.listarCliente = this.clienteSelecionado
                console.log(`Informe o dado que deseja alterar:`)
                console.log("1 - Nome / Nome social")
                console.log("2 - CPF")
                console.log("3 - RGS")
                console.log("4 - Telefones")
                console.log("5 - Pets")
                console.log("0 - Sair")
                let opcao = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                let resposta:string
                switch (opcao){
                    case 1:
                        const nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `)
                        let nSocial: string = ''
                        while (this.continuar){
                            resposta = this.entrada.receberTexto(`Prefere ser chamado pelo Nome social? (S/N): `)
                            if (resposta.toUpperCase() === 'S'){
                                nSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `)
                                this.continuar=false
                            }
                            else if (resposta.toUpperCase() === 'N'){
                                nSocial = nome
                                this.continuar=false
                            }
                            else {console.log('Insira S ou N na sua resposta!')}
                        }
                        this.continuar=true
                        const nomeSocial = nSocial
                        this.clienteSelecionado.nome= nome
                        this.clienteSelecionado.nomeSocial= nomeSocial
                        break
                    case 2:
                        const cpfValor = this.entrada.receberCPF(`Por favor informe o número do CPF: `);
                        const dataCpf = this.entrada.receberData(`Por favor informe a data de emissão do CPF (dd/mm/yyyy): `);
                        const cpf = new CPF(cpfValor, dataCpf); 
                        this.clienteSelecionado.setCPF=cpf
                        break
                    case 3:
                        while (this.continuar){
                            console.log(`O que deseja fazer com os RGs?`)
                            console.log("1 - Adicionar um novo RG")
                            console.log("2 - Alterar um RG ")
                            console.log("3 - Excluir um RG ")
                            console.log(`0 - Voltar`)
                            opcao = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                            const quantRgs=this.clienteSelecionado.getRgs.length
                            switch (opcao){
                                case 1:
                                    const valorRg = this.entrada.receberRG(`Por favor informe o número do RG: `);
                                    const dataRg = this.entrada.receberData(`Por favor informe a data de emissão do RG (dd/mm/yyyy): `);
                                    const rg = new RG(valorRg, dataRg);
                                    this.clienteSelecionado.getRgs.push(rg)
                                    break
                                case 0:
                                    this.continuar=false
                                    break
                                default:
                                    if (opcao===3 && quantRgs === 1){
                                        console.log(`Você não pode excluir o Rg atual :(`)
                                        continue
                                    }
                                    else if ([2,3].includes(opcao)){
                                        while (this.continuar){
                                            let numRgs = []
                                            console.log(`Qual RG deseja ${opcao===2?"alterar":"excluir"}?`)
                                            for (let i = 1; i < quantRgs+1; i++) {
                                                console.log(`${i} - ${i}º RG`)
                                                numRgs.push(i)
                                            }
                                            console.log("0 - voltar")
                                            let rgEscolhido = this.entrada.receberNumero(`Por favor, informe uma das opções: `)
                                            if (rgEscolhido === 0){
                                                this.continuar= false
                                            } else if (opcao === 2 && numRgs.includes(rgEscolhido)){
                                                const valorRg = this.entrada.receberRG(`Por favor informe o número do RG: `);
                                                const dataRg = this.entrada.receberData(`Por favor informe a data de emissão do RG (dd/mm/yyyy): `);
                                                const rg = new RG(valorRg, dataRg);
                                                this.clienteSelecionado.setRg(rg, rgEscolhido - 1)
                                            } else if (opcao === 3  && numRgs.includes(rgEscolhido)){
                                                this.clienteSelecionado.setRgs=
                                                    this.clienteSelecionado.getRgs.filter(
                                                        rgData => rgData !== this.clienteSelecionado.getRgs[rgEscolhido-1]
                                                    )    
                                            } else{
                                                console.log(`Operação não entendida :(`)
                                                continue
                                            }
                                            this.continuar=false
                                        }
                                        this.continuar=true
                                    }
                                    else{
                                        console.log(`Operação não entendida :(`)
                                        continue
                                    }
                                    break
                                }
                            if (opcao !== 0){
                                resposta = this.entrada.receberTexto(`Deseja alterar mais algum RG? (S/N)`)
                                if (resposta.toUpperCase() === 'S') {
                                    continue
                                }
                            }
                            this.continuar=false
                        }
                        this.continuar=true
                        break
                    case 4:
                        while (this.continuar){
                            console.log(`O que deseja fazer com os telefones?`)
                            console.log("1 - Adicionar um novo telefone")
                            console.log("2 - Alterar um telefone")
                            console.log("3 - Excluir um telefone")
                            console.log("0 - Voltar")
                            opcao = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                            let quantTelefones:number 
                            quantTelefones=this.clienteSelecionado.getTelefones.length
                            switch (opcao){
                                case 1:
                                    const ddd = this.entrada.receberTexto(`Por favor informe o DDD do telefone: `);
                                    const numero = this.entrada.receberTexto(`Por favor informe o número do telefone: `);
                                    const telefone = new Telefone(ddd, numero);
                                    this.clienteSelecionado.getTelefones.push(telefone)
                                    break
                                case 0:
                                    this.continuar=false
                                    break
                                default:
                                    if (opcao===3 && quantTelefones === 1){
                                        console.log(`Você não pode excluir o Telefone atual :(`)
                                        continue
                                    }
                                    else if ([2,3].includes(opcao)){
                                        while (this.continuar){
                                            let numTelefones=[]
                                            console.log(`Qual telefone deseja ${opcao===2?"alterar":"excluir"}?`)
                                            for (let i = 1; i < quantTelefones+1; i++) {
                                                console.log(`${i} - ${i}º telefone`)
                                                numTelefones.push(i)
                                            }
                                            let telefoneEscolhido = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                                            if (telefoneEscolhido === 0){
                                                this.continuar= false
                                            } else if (opcao === 2 && numTelefones.includes(telefoneEscolhido)){
                                                const ddd = this.entrada.receberTexto(`Por favor informe o DDD do telefone: `);
                                                const numero = this.entrada.receberTexto(`Por favor informe o número do telefone: `);
                                                const telefone = new Telefone(ddd, numero);
                                                this.clienteSelecionado.setTelefone(telefone, telefoneEscolhido-1)
                                            } else if (opcao === 3 && numTelefones.includes(telefoneEscolhido)){
                                                this.clienteSelecionado.setTelefones= this.clienteSelecionado.getTelefones.filter(
                                                    telefoneData => telefoneData !== this.clienteSelecionado.getTelefones[telefoneEscolhido-1]
                                                )
                                        } else{
                                            console.log(`Operação não entendida :(`)
                                            continue
                                        }
                                        this.continuar=false
                                    }
                                    this.continuar=true
                                }
                                else{
                                    console.log(`Operação não entendida :(`)
                                    continue
                                }
                                break
                            }
                            if (opcao !== 0){
                                resposta = this.entrada.receberTexto(`Deseja alterar mais algum telefone? (S/N)`)
                                if (resposta.toUpperCase() === 'S') {
                                    continue
                                }
                            }
                            this.continuar=false
                        }
                        this.continuar=true
                        break
                    case 5:
                        while (this.continuar){
                            console.log(`O que deseja fazer com os pets?`)
                            console.log("1 - Adicionar um novo pet")
                            console.log("2 - Alterar um pet")
                            console.log("3 - Excluir um pet")
                            console.log("0 - Voltar")
                            opcao = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                            let quantPets:number 
                            quantPets=this.clienteSelecionado.getPets.length
                            switch (opcao){
                                case 1:
                                    const nome = this.entrada.receberTexto(`Por favor informe o nome do seu pet: `)
                                    const raca = this.entrada.receberTexto(`Por favor informe a raça do seu pet: `)
                                    const genero = this.entrada.receberTexto(`Por favor informe o genero do seu pet: `)
                                    const tipo = this.entrada.receberTexto(`Por favor informe o tipo do seu pet: `)
                                    const pet = new Pet(nome, raca, genero, tipo)
                                    this.clienteSelecionado.getPets.push(pet)
                                    break
                                case 0:
                                    this.continuar=false
                                    break
                                default:
                                    if (opcao===3 && quantPets === 1){
                                        console.log(`Você não pode excluir o pet atual :(`)
                                        continue
                                    }
                                    if ([2,3].includes(opcao)){
                                        while (this.continuar){
                                            let numPets=[]
                                            for (let i = 1; i < quantPets+1; i++) {
                                                console.log(`${i} - ${i}º pet`)
                                                numPets.push(i)
                                            }
                                            let petEscolhido = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                                            if (petEscolhido === 0){
                                                break
                                            } else if (opcao === 2 && numPets.includes(petEscolhido)){
                                                const nome = this.entrada.receberTexto(`Por favor informe o nome do seu pet: `)
                                                const raca = this.entrada.receberTexto(`Por favor informe a raça do seu pet: `)
                                                const genero = this.entrada.receberTexto(`Por favor informe o genero do seu pet: `)
                                                const tipo = this.entrada.receberTexto(`Por favor informe o tipo do seu pet: `)
                                                const pet = new Pet(nome, raca, genero, tipo)
                                                this.clienteSelecionado.setPet(pet, petEscolhido - 1)
                                            }
                                            else if (opcao === 3  && numPets.includes(petEscolhido)){
                                                this.clienteSelecionado.setPets=
                                                    this.clienteSelecionado.getPets.filter(
                                                        petData => petData !== this.clienteSelecionado.getPets[petEscolhido-1]
                                                    )
                                            } else{
                                                console.log(`Operação não entendida :(`)
                                                continue
                                            }
                                            this.continuar=false
                                        }
                                        this.continuar=true
                                    }
                                    else{
                                        console.log(`Operação não entendida :(`)
                                        continue
                                    }
                                    break
                            }
                            if (opcao !== 0){
                                resposta = this.entrada.receberTexto(`Deseja alterar mais algum pet? (S/N)`)
                                if (resposta.toUpperCase() === 'S') {
                                    continue
                                }
                            }
                            this.continuar=false
                        }
                        this.continuar=true
                        break
                    case 0: break
                    default:
                        console.log(`Operação não entendida :(`)
                        continue
                }
                if (opcao !== 0){
                    resposta = this.entrada.receberTexto(`Deseja alterar mais algum dado? (S/N)`)
                    if (resposta.toUpperCase() === 'S') {
                        continue
                    }
                }
                break
            }
            let resposta = this.entrada.receberTexto(`Deseja alterar mais algum usuario? (S/N)`)
            if (resposta.toUpperCase() === 'S') {
                continue
            }
            this.continuar=false
        }
        return this.clientes
    }
}