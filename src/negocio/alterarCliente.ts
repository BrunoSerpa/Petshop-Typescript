import Entrada from "../io/entrada";
import Listagem from "./listagem";

import Cliente from "../modelo/cliente";
import CPF from "../modelo/cpf";
import RG from "../modelo/rg";
import Telefone from "../modelo/telefone";
import Pet from "../modelo/pet";

export default class AlterarCliente extends Listagem {
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
        console.log(`Dados do cliente:\n`);
        console.log(`Nome: ` + this.clienteEncontrado.nome);
        if (this.clienteEncontrado.nomeSocial){
            console.log(`Nome social: ` + this.clienteEncontrado.nomeSocial);
        }
        console.log(`CPF: ` + this.clienteEncontrado.getCpf.getValor);

        let count = 1;
        this.clienteEncontrado.getRgs.forEach((rgData) => {
            console.log(`${count}º RG: ` + rgData.getValor);
            count++;
        });

        count = 1;
        this.clienteEncontrado.getTelefones.forEach((telefoneData) => {
            console.log(`${count}º Telefone: (${telefoneData.getDdd}) ${telefoneData.getNumero}`);
            count++;
        });

        count = 1;
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
    public alterar(): Array<Cliente>{
        let continuar = true
        while (continuar){
            let criterio = this.entrada.receberTexto(`Informe o nome ou o número do cpf deste cliente:`)
            let encontrado = this.encontrarCliente(criterio)
            if (encontrado){
                while (true){
                    console.log(`Informe o dado que deseja alterar:`)
                    console.log("1 - nome / nome social")
                    console.log("2 - cpf")
                    console.log("3 - rgs")
                    console.log("4 - telefones")
                    console.log("5 - pets")
                    console.log("0 - sair")
                    let dadoDesejado = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                    switch (dadoDesejado){
                        case 1:
                            const nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `)
                            let nSocial: string
                            while (true){
                                let resposta = this.entrada.receberTexto(`Prefere ser chamado pelo Nome social? (S/N): `)
                                if (resposta.toUpperCase() === 'S'){
                                    nSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `)
                                    break
                                }
                                else if (resposta.toUpperCase() === 'N'){
                                    nSocial = nome
                                    break
                                }
                                console.log('Insira S ou N na sua resposta!')
                            }
                            const nomeSocial = nSocial
                            this.clienteEncontrado.nome= nome
                            this.clienteEncontrado.nomeSocial= nomeSocial
                            break
                        case 2:
                            const cpfValor = this.entrada.receberTexto(`Por favor informe o número do CPF: `);
                            const dataCpf = this.entrada.receberData(`Por favor informe a data de emissão do CPF (dd/mm/yyyy): `);
                            const cpf = new CPF(cpfValor, dataCpf);
                            this.clienteEncontrado.setCPF(cpf)
                            break
                        case 3:
                            console.log(`Informe o que deseja alterar:`)
                            console.log("1 - adicionar um novo RG")
                            console.log("2 - alterar um RG ")
                            console.log("3 - excluir um RG ")
                            console.log("0 - sair")
                            let alteracaoDesejada = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                            let quantRgs:number
                            quantRgs=this.clienteEncontrado.getRgs.length
                            switch (alteracaoDesejada){
                                case 0:
                                    break
                                case 1:
                                    const valorRg = this.entrada.receberTexto(`Por favor informe o número do RG: `);
                                    const dataRg = this.entrada.receberData(`Por favor informe a data de emissão do RG (dd/mm/yyyy): `);
                                    const rg = new RG(valorRg, dataRg);
                                    this.clienteEncontrado.getRgs.push(rg)
                                    break
                                default:
                                    if ([2,3].includes(alteracaoDesejada)){
                                        let numRgs = []
                                        for (let i = 1; i < quantRgs+1; i++) {
                                            console.log(`${i} - ${i}º RG`)
                                            numRgs.push(i)
                                        }
                                        console.log("0 - sair")
                                        let rgEscolhido = this.entrada.receberNumero(`Por favor, informe uma das opções: `)
                                        if (rgEscolhido === 0){
                                            break
                                        }
                                        else if (alteracaoDesejada === 2){
                                            this.clienteEncontrado.getRgs.filter(rgData => rgData !== this.clienteEncontrado.getRgs[rgEscolhido-1])
                                        }
                                        else if (alteracaoDesejada === 3){
                                            const valorRg = this.entrada.receberTexto(`Por favor informe o número do RG: `);
                                            const dataRg = this.entrada.receberData(`Por favor informe a data de emissão do RG (dd/mm/yyyy): `);
                                            const rg = new RG(valorRg, dataRg);
                                            this.clienteEncontrado.setRg(rg, rgEscolhido)
                                        }
                                    } else{
                                        console.log("Informe uma opção válida")
                                    }
                                    break
                            }
                            if (alteracaoDesejada === 0){
                                break
                            }
                        case 4:
                            console.log(`Informe o que deseja alterar:`)
                            console.log("1 - adicionar um novo telefone")
                            console.log("2 - alterar um telefone")
                            console.log("3 - excluir um telefone")
                            console.log("0 - sair")
                            alteracaoDesejada = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                            switch (alteracaoDesejada){
                                case 0:
                                    break
                                case 1:
                                    const ddd = this.entrada.receberTexto(`Por favor informe o DDD do telefone: `);
                                    const numero = this.entrada.receberTexto(`Por favor informe o número do telefone: `);
                                    const telefone = new Telefone(ddd, numero);
                                    this.clienteEncontrado.getTelefones.push(telefone)
                                    break
                                default:
                                    if ([2,3].includes(alteracaoDesejada)){
                                        let quantTelefones:number 
                                        quantTelefones=this.clienteEncontrado.getTelefones.length
                                        let numTelefones=[]
                                        for (let i = 1; i < quantTelefones+1; i++) {
                                            console.log(`${i} - ${i}º telefone`)
                                            numTelefones.push(i)
                                        }
                                        let telefoneEscolhido = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                                        if (telefoneEscolhido === 0){
                                            break
                                        }
                                        else if (alteracaoDesejada === 2){
                                            this.clienteEncontrado.getTelefones.filter(telefoneData => telefoneData !== this.clienteEncontrado.getTelefones[telefoneEscolhido-1])
                                        }
                                        else if (alteracaoDesejada === 3){
                                            const ddd = this.entrada.receberTexto(`Por favor informe o DDD do telefone: `);
                                            const numero = this.entrada.receberTexto(`Por favor informe o número do telefone: `);
                                            const telefone = new Telefone(ddd, numero);
                                            this.clienteEncontrado.setTelefone(telefone, telefoneEscolhido-1)
                                            break
                                        }
                                    } else{
                                        console.log("Informe uma opção válida")
                                    }
                                    break
                            }
                            if (alteracaoDesejada === 0){
                                break
                            }
                        case 5:
                            console.log(`Informe o que deseja alterar:`)
                            console.log("1 - adicionar um novo pet")
                            console.log("2 - alterar um pet")
                            console.log("3 - excluir um pet")
                            console.log("0 - sair")
                            alteracaoDesejada = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                            switch (alteracaoDesejada){
                                case 0:
                                    break
                                case 1:
                                    const nome = this.entrada.receberTexto(`Por favor informe o nome do seu pet: `)
                                    const raca = this.entrada.receberTexto(`Por favor informe a raça do seu pet: `)
                                    const genero = this.entrada.receberTexto(`Por favor informe o genero do seu pet: `)
                                    const tipo = this.entrada.receberTexto(`Por favor informe o tipo do seu pet: `)
                                    const pet = new Pet(nome, raca, genero, tipo)
                                    this.clienteEncontrado.getPets.push(pet)
                                    break
                                default:
                                    if ([2,3].includes(alteracaoDesejada)){
                                        let quantPets:number 
                                        quantPets=this.clienteEncontrado.getPets.length
                                        let numPets=[]
                                        for (let i = 1; i < quantPets+1; i++) {
                                            console.log(`${i} - ${i}º telefone`)
                                            numPets.push(i)
                                        }
                                        let petEscolhido = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                                        if (petEscolhido === 0){
                                            break
                                        }
                                        else if (alteracaoDesejada === 2){
                                            this.clienteEncontrado.getPets.filter(petData => petData !== this.clienteEncontrado.getPets[petEscolhido-1])
                                        }
                                        else if (alteracaoDesejada === 3){
                                            const nome = this.entrada.receberTexto(`Por favor informe o nome do seu pet: `)
                                            const raca = this.entrada.receberTexto(`Por favor informe a raça do seu pet: `)
                                            const genero = this.entrada.receberTexto(`Por favor informe o genero do seu pet: `)
                                            const tipo = this.entrada.receberTexto(`Por favor informe o tipo do seu pet: `)
                                            const pet = new Pet(nome, raca, genero, tipo)
                                            this.clienteEncontrado.setPet(pet, petEscolhido - 1)
                                        }
                                    } else{
                                        console.log("Informe uma opção válida")
                                    }
                                    break
                            }
                            if (alteracaoDesejada === 0){
                                break
                            }
                        case 0:
                            break
                        default:
                            console.log("Informe uma opção válida")
                            continue
                    }
                    let continuar = this.entrada.receberTexto(`Deseja alterar mais algum dado? (S/N)`)
                    if (continuar.toUpperCase() === 'S') {
                        continue
                    }
                    break
                }
            }
            let continuar = this.entrada.receberTexto(`Deseja alterar mais algum usuario? (S/N)`)
            if (continuar.toUpperCase() === 'S') {
                continue
            }
            break
        }
        return this.clientes
    }
}