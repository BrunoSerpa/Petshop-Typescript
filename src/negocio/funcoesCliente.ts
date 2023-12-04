import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import Pet from "../modelo/pet"
import RG from "../modelo/rg"
import Telefone from "../modelo/telefone"

class CadastroCliente {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`#### INICIANDO CADASTRO DO CLIENTE  ####`)
        console.log("========================================")
        const nome = this.entrada.receberTexto(`Por favor, informe o nome do cliente: `)
        const nomeSocial = receberPreferenciaNomeSocial(this.entrada)
        const cpfValor = this.entrada.receberCPF(`Por favor, informe o número do CPF: `)
        const dataCpf = this.entrada.receberData(`Por favor, informe a data de emissão do CPF (dd/mm/yyyy): `)
        const cpf = new CPF(cpfValor, dataCpf)
        const cliente = new Cliente(nome, nomeSocial, cpf)
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
        while (true) {
            console.log("----------------------------------------")
            const valorRg = this.entrada.receberRG(`Por favor, informe o número do RG: `)
            const dataRg = this.entrada.receberData(`Por favor, informe a data de emissão do RG (dd/mm/yyyy): `)
            console.log("----------------------------------------")
            const rg = new RG(valorRg, dataRg)
            cliente.getRgs.push(rg)
            const continuar = this.entrada.receberTexto(`Gostaria de cadastrar mais algum RG? (S/N): `)
            if (continuar.toUpperCase() === 'S') {
                continue
            }
            break
        }
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
        while (true) {
            console.log("----------------------------------------")
            const ddd = this.entrada.receberTexto(`Por favor informe o DDD do telefone: `)
            const numero = this.entrada.receberTexto(`Por favor informe o número do telefone: `)
            console.log("----------------------------------------")
            const telefone = new Telefone(ddd, numero)
            cliente.getTelefones.push(telefone)
            const continuar = this.entrada.receberTexto(`Gostaria de cadastrar mais algum telefone? (S/N): `)
            if (continuar.toUpperCase() === 'S') {
                continue
            }
            break
        }
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")

        const continuar = this.entrada.receberTexto(`Gostaria de cadastrar um pet? (S/N): `)
        if (continuar.toUpperCase() === 'S') {
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
            while (true) {
                console.log("----------------------------------------")
                const nome = this.entrada.receberTexto(`Por favor informe o nome do seu pet: `)
                const raca = this.entrada.receberTexto(`Por favor informe a raça do seu pet: `)
                const genero = this.entrada.receberTexto(`Por favor informe o genero do seu pet: `)
                const tipo = this.entrada.receberTexto(`Por favor informe o tipo do seu pet: `)
                console.log("----------------------------------------")
                const pet = new Pet(nome, raca, genero, tipo)
                cliente.getPets.push(pet)
                const continuar = this.entrada.receberTexto(`Gostaria de cadastrar mais algum pet? (S/N): `)
                if (continuar.toUpperCase() === 'S') {
                    continue
                }
                break
            }
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
        }
        console.log("========================================")
        this.clientes.push(cliente)
        console.log(`#### CADASTRO DO CLIENTE FINALIZADO ####`)
    }
}

class AlteracaoCliente {
    private clientes: Array<Cliente>
    private entrada: Entrada
    private clienteSelecionado!: Cliente
    private opcao!: number
    private resposta!: string
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public alterarCliente() {
        console.log(`#### INICIANDO ALTERAÇÃO DO CLIENTE  ####`)
        console.log("========================================")
        const clienteSelecionado = buscarCliente(this.clientes, this.entrada)
        if (!clienteSelecionado) {
            console.log("Cliente não encontrado :(")
        } else {
            this.clienteSelecionado = clienteSelecionado
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
            while (true) {
                console.log("\nDados atuais do cliente:")
                console.log("----------------------------------------")
                exibirDetalhesCliente(clienteSelecionado)
                console.log("----------------------------------------")
                console.log("\nInforme o dado que deseja alterar:")
                console.log("1 - Nome / Nome social")
                console.log("2 - CPF")
                console.log("3 - RGs")
                console.log("4 - Telefones")
                console.log("5 - Pets")
                console.log("0 - Sair")
                this.opcao = this.entrada.receberNumero("Por favor, informe uma das opções:")
                switch (this.opcao) {
                    case 1:
                        this.alterarNome()
                        break
                    case 2:
                        this.alterarCPF()
                        break
                    case 3:
                        this.alterarRgs()
                        break
                    case 4:
                        this.alterarTelefones()
                        break
                    case 5:
                        this.alterarPets()
                        break
                    case 0:
                        break
                    default:
                        console.log("Operação não entendida :(")
                        continue
                }
                if (this.opcao !== 0) {
                    this.resposta = this.entrada.receberTexto("Deseja alterar mais algum dado? (S/N)")
                    if (this.resposta.toUpperCase() === 'S') {
                        continue
                    }
                }
                console.log("Cliente alterado com sucesso :)\n")
                break
            }
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
        }
        console.log("========================================")
        console.log(`### ALTERAÇÃO DO CLIENTE FINALIZADA  ###`)
    }

    private alterarNome() {
        const nome = this.entrada.receberTexto("Por favor, informe o novo nome do cliente: ")
        const nomeSocial = receberPreferenciaNomeSocial(this.entrada)
        this.clienteSelecionado.nome = nome
        this.clienteSelecionado.nomeSocial = nomeSocial
        console.log("Nome alterado com sucesso!\n")
    }

    private alterarCPF() {
        const cpfValor = this.entrada.receberCPF("Por favor, informe o novo número do CPF: ")
        const dataCpf = this.entrada.receberData("Por favor, informe a nova data de emissão do CPF (dd/mm/yyyy): ")
        const novoCpf = new CPF(cpfValor, dataCpf)
        this.clienteSelecionado.setCPF = novoCpf
        console.log("CPF alterado com sucesso!\n")
    }

    private alterarRgs() {
        while (true) {
            console.log(`O que deseja fazer com os RGs?`)
            console.log("1 - Adicionar um novo RG")
            console.log("2 - Alterar um RG ")
            console.log("3 - Excluir um RG ")
            console.log(`0 - Voltar`)
            this.opcao = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
            const quantRgs = this.clienteSelecionado.getRgs.length
            switch (this.opcao) {
                case 1:
                    const valorRg = this.entrada.receberRG(`Por favor informe o número do novo RG: `)
                    const dataRg = this.entrada.receberData(`Por favor informe a data de emissão do novo RG (dd/mm/yyyy): `)
                    const rg = new RG(valorRg, dataRg)
                    this.clienteSelecionado.getRgs.push(rg)
                    break
                case 0:
                    return
                default:
                    if (this.opcao === 3 && quantRgs === 1) {
                        console.log(`Você não pode excluir o Rg atual :(`)
                        continue
                    }
                    else if ([2, 3].includes(this.opcao)) {
                        while (true) {
                            let numRgs = []
                            console.log(`Qual RG deseja ${this.opcao === 2 ? "alterar" : "excluir"}?`)
                            for (let i = 1; i < quantRgs + 1; i++) {
                                console.log(`${i} - ${i}º RG`)
                                numRgs.push(i)
                            }
                            console.log("0 - voltar")
                            let rgEscolhido = this.entrada.receberNumero(`Por favor, informe uma das opções: `)
                            if (this.opcao === 2 && numRgs.includes(rgEscolhido)) {
                                const valorRg = this.entrada.receberRG(`Por favor informe o novo número do RG: `)
                                const dataRg = this.entrada.receberData(`Por favor informe a nova data de emissão do RG (dd/mm/yyyy): `)
                                const rg = new RG(valorRg, dataRg)
                                this.clienteSelecionado.setRg(rg, rgEscolhido - 1)
                            } else if (this.opcao === 3 && numRgs.includes(rgEscolhido)) {
                                this.clienteSelecionado.setRgs =
                                    this.clienteSelecionado.getRgs.filter(
                                        rgData => rgData !== this.clienteSelecionado.getRgs[rgEscolhido - 1]
                                    )
                            } else if (rgEscolhido !== 0) {
                                console.log(`Operação não entendida :(`)
                                continue
                            }
                            break
                        }
                    }
            }
            if (this.opcao !== 0) {
                this.resposta = this.entrada.receberTexto(`Deseja alterar mais algum RG? (S/N)`)
                if (this.resposta.toUpperCase() === 'S') {
                    continue
                }
            }
            return
        }
    }

    private alterarTelefones() {
        while (true) {
            console.log(`O que deseja fazer com os telefones?`)
            console.log("1 - Adicionar um novo telefone")
            console.log("2 - Alterar um telefone")
            console.log("3 - Excluir um telefone")
            console.log("0 - Voltar")
            this.opcao = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
            const quantTelefones = this.clienteSelecionado.getTelefones.length
            switch (this.opcao) {
                case 1:
                    const ddd = this.entrada.receberTexto(`Por favor informe o DDD do novo telefone: `)
                    const numero = this.entrada.receberTexto(`Por favor informe o número do novo telefone: `)
                    const telefone = new Telefone(ddd, numero)
                    this.clienteSelecionado.getTelefones.push(telefone)
                    break
                case 0:
                    break
                default:
                    if (this.opcao === 3 && quantTelefones === 1) {
                        console.log(`Você não pode excluir o telefone atual :(`)
                        continue
                    }
                    else if ([2, 3].includes(this.opcao)) {
                        while (true) {
                            let numRgs = []
                            console.log(`Qual telefone deseja ${this.opcao === 2 ? "alterar" : "excluir"}?`)
                            for (let i = 1; i < quantTelefones + 1; i++) {
                                console.log(`${i} - ${i}º Telefone`)
                                numRgs.push(i)
                            }
                            console.log("0 - voltar")
                            let telefoneEscolhido = this.entrada.receberNumero(`Por favor, informe uma das opções: `)
                            if (this.opcao === 2 && numRgs.includes(telefoneEscolhido)) {
                                const ddd = this.entrada.receberTexto(`Por favor informe o novo DDD do telefone: `)
                                const numero = this.entrada.receberTexto(`Por favor informe o novo número do telefone: `)
                                const telefone = new Telefone(ddd, numero)
                                this.clienteSelecionado.setTelefone(telefone, telefoneEscolhido - 1)
                            } else if (this.opcao === 3 && numRgs.includes(telefoneEscolhido)) {
                                this.clienteSelecionado.setTelefones = this.clienteSelecionado.getTelefones.filter(
                                    telefoneData => telefoneData !== this.clienteSelecionado.getTelefones[telefoneEscolhido - 1]
                                )
                            } else if (telefoneEscolhido !== 0) {
                                console.log(`Operação não entendida :(`)
                                continue
                            }
                            break
                        }
                    }
            }
            if (this.opcao !== 0) {
                this.resposta = this.entrada.receberTexto(`Deseja alterar mais algum telefone? (S/N)`)
                if (this.resposta.toUpperCase() === 'S') {
                    continue
                }
            }
            return
        }
    }

    private alterarPets() {
        while (true) {
            console.log(`O que deseja fazer com os pets?`)
            console.log("1 - Adicionar um novo pet")
            console.log("2 - Alterar um pet")
            console.log("3 - Excluir um pet")
            console.log("0 - Voltar")
            this.opcao = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
            let quantPets: number
            quantPets = this.clienteSelecionado.getPets.length
            switch (this.opcao) {
                case 1:
                    const nome = this.entrada.receberTexto(`Por favor informe o nome do novo pet: `)
                    const raca = this.entrada.receberTexto(`Por favor informe a raça do novo pet: `)
                    const genero = this.entrada.receberTexto(`Por favor informe o genero do novo pet: `)
                    const tipo = this.entrada.receberTexto(`Por favor informe o tipo do novo pet: `)
                    const pet = new Pet(nome, raca, genero, tipo)
                    this.clienteSelecionado.getPets.push(pet)
                    break
                case 0:
                    return
                default:
                    if ([2, 3].includes(this.opcao)) {
                        while (true) {
                            let numPets = []
                            console.log(`Qual pet deseja ${this.opcao === 2 ? "alterar" : "excluir"}?`)
                            for (let i = 1; i < quantPets + 1; i++) {
                                console.log(`${i} - ${i}º Pet`)
                                numPets.push(i)
                            }
                            console.log("0 - voltar")
                            let petEscolhido = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                            if (petEscolhido === 0) {
                                break
                            } else if (this.opcao === 2 && numPets.includes(petEscolhido)) {
                                const nome = this.entrada.receberTexto(`Por favor informe o novo nome do pet: `)
                                const raca = this.entrada.receberTexto(`Por favor informe a raça do pet: `)
                                const genero = this.entrada.receberTexto(`Por favor informe o genero do pet: `)
                                const tipo = this.entrada.receberTexto(`Por favor informe o tipo do pet: `)
                                const pet = new Pet(nome, raca, genero, tipo)
                                this.clienteSelecionado.setPet(pet, petEscolhido - 1)
                            }
                            else if (this.opcao === 3 && numPets.includes(petEscolhido)) {
                                this.clienteSelecionado.setPets =
                                    this.clienteSelecionado.getPets.filter(
                                        petData => petData !== this.clienteSelecionado.getPets[petEscolhido - 1]
                                    )
                            } else {
                                console.log(`Operação não entendida :(`)
                                continue
                            }
                            break
                        }
                    }
            }
            if (this.opcao !== 0) {
                this.resposta = this.entrada.receberTexto(`Deseja alterar mais algum pet? (S/N)`)
                if (this.resposta.toUpperCase() === 'S') {
                    continue
                }
            }
            return
        }
    }
}

class ExclusaoCliente {
    private clientes: Cliente[]
    private entrada: Entrada
    constructor(clientes: Cliente[]) {
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public deletar(): Array<Cliente> {
        console.log(`#### INICIANDO EXCLUSÃO DO CLIENTE  ####`)
        console.log("========================================")
        const clienteSelecionado = buscarCliente(this.clientes, this.entrada)
        if (!clienteSelecionado) {
            console.log("Cliente não encontrado :(")
            return this.clientes
        }
        const confirmacao = this.entrada.receberTexto(`Tem certeza que deseja excluir o cliente ${clienteSelecionado.nome}? (S/N): `)
        if (confirmacao.toUpperCase() === 'S') {
            this.clientes = this.clientes.filter(cliente => cliente !== clienteSelecionado)
            console.log("Cliente excluído com sucesso :)\n")
        } else {
            console.log("Exclusão cancelada.\n")
        }
        console.log("========================================")
        console.log(`#### EXCLUSÃO DO CLIENTE FINALIZADA ####`)
        return this.clientes
    }
}

class ListaCliente {
    private clientes: Cliente[]
    private entrada: Entrada
    constructor(clientes: Cliente[]) {
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public listarClientes(): void {
        console.log(`#### INICIANDO LISTAGEM DO CLIENTE  ####`)
        console.log("========================================")
        let clienteEspecifico = this.entrada.receberTexto(`Gostaria de procurar um cliente em específico? (S/N): `)
        if (clienteEspecifico.toUpperCase() === 'S') {
            while (true) {
                let clienteEscolhido = buscarCliente(this.clientes, this.entrada)
                if (clienteEscolhido) {
                    console.log(`Dados de ${clienteEscolhido.nomeSocial}:`)
                    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
                    exibirDetalhesCliente(clienteEscolhido)
                    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
                }
                let continuar = this.entrada.receberTexto(`Deseja listar mais algum cliente? (S/N)`)
                if (continuar.toUpperCase() === 'S') {
                    continue
                }
                break
            }
        }
        else {
            if (this.clientes.length === 0) {
                console.log("Nenhum cliente cadastrado.")

            } else {
                console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
                console.log("\nLista de todos os clientes:")
                this.clientes.forEach(clienteData => {
                    console.log("----------------------------------------")
                    exibirDetalhesCliente(clienteData)
                    console.log("----------------------------------------")
                })
                console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
            }
        }
        console.log(`#### LISTAGEM DO CLIENTE FINALIZADA ####`)
        console.log("========================================")
    }
}

function exibirDetalhesCliente(cliente: Cliente) {
    function mostrarData(data: Date): string {
        return `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`
    }

    console.log(`Nome:`, cliente.nomeSocial ? `${cliente.nomeSocial} (${cliente.nome})` : `${cliente.nome}`)
    console.log(`CPF: ${cliente.getCpf.getValor} (${mostrarData(cliente.getCpf.getDataEmissao)})`)
    if (cliente.getRgs.length === 1) {
        console.log(`RG: ${cliente.getRgs[0].getValor} (${mostrarData(cliente.getRgs[0].getDataEmissao)})`)
    } else {
        cliente.getRgs.forEach((rgData, index) => {
            console.log(`${index + 1}º RG: ${rgData.getValor} (${mostrarData(rgData.getDataEmissao)})`)
        })
    }

    if (cliente.getTelefones.length === 1) {
        console.log(`Telefone: (${cliente.getTelefones[0].getDdd}) ${cliente.getTelefones[0].getNumero}`)
    } else {
        cliente.getTelefones.forEach((telefoneData, index) => {
            console.log(`${index + 1}º Telefone: (${telefoneData.getDdd}) ${telefoneData.getNumero}`)
        })
    }

    if (cliente.getPets.length === 1) {
        console.log(`Pet: ${cliente.getPets[0].getNome}`)
        console.log(`- Genero: ${cliente.getPets[0].getGenero}`)
        console.log(`- Raça: ${cliente.getPets[0].getRaca} (${cliente.getPets[0].getTipo})`)
    } else {
        cliente.getPets.forEach((petData, index) => {
            console.log(`${index + 1}º Pet: ${petData.getNome}`)
            console.log(`- Genero: ${petData.getGenero}`)
            console.log(`- Raça: ${petData.getRaca} (${petData.getTipo})`)
        })
    }

    if (cliente.getProdutosConsumidos.length === 1) {
        console.log(`Produto Consumido: ${cliente.getProdutosConsumidos[0].itemConsumido.getNome}`)
        console.log(`- Data: ${mostrarData(cliente.getProdutosConsumidos[0].dataConsumo)}`)
        console.log(`- Pet: ${cliente.getProdutosConsumidos[0].pet}`)
    } else {
        cliente.getProdutosConsumidos.forEach((produtoData, index) => {
            console.log(`${index + 1}º Produto Consumido: ${produtoData.itemConsumido.getNome}`)
            console.log(`- Data: ${mostrarData(produtoData.dataConsumo)}`)
            console.log(`- Pet: ${produtoData.pet.getNome}`)
        })
    }

    if (cliente.getServicosConsumidos.length === 1) {
        console.log(`Serviço Consumido: ${cliente.getServicosConsumidos[0].itemConsumido.getNome}`)
        console.log(`- Data: ${mostrarData(cliente.getServicosConsumidos[0].dataConsumo)}`)
        console.log(`- Pet: ${cliente.getServicosConsumidos[0].pet.getNome}`)
    } else {
        cliente.getServicosConsumidos.forEach((servicoData, index) => {
            console.log(`${index + 1}º Serviço Consumido: ${servicoData.itemConsumido.getNome}`)
            console.log(`- Data: ${mostrarData(servicoData.dataConsumo)}`)
            console.log(`- Pet: ${servicoData.pet.getNome}`)
        })
    }
}

function buscarCliente(clientes: Cliente[], entrada: Entrada): Cliente | undefined {
    let clientesEncontrados: Array<Cliente> = []
    while (true) {
        let criterio = entrada.receberTexto(`Informe o nome ou o número do cpf deste cliente:`)
        clientes.forEach(cliente => {
            if (cliente.nome.toLowerCase() === criterio.toLowerCase() || parseFloat(cliente.getCpf.getValor) === parseFloat(criterio)) {
                clientesEncontrados.push(cliente)
            }
        })

        if (clientesEncontrados.length > 1) {
            let count: number = 1
            let opcoes: Array<number> = []
            console.log(`Mais de um cliente encontrado!`)
            console.log(`Qual cliente deseja alterar?`)
            clientesEncontrados.forEach(cliente => {
                console.log(`${count} - Cliente:`)
                exibirDetalhesCliente(cliente)
                opcoes.push(count)
                count++
            })

            console.log(`0 - Nenhum`)
            let clienteDesejado = entrada.receberNumero(`Por favor, informe uma das opções:`)

            if (opcoes.includes(clienteDesejado)) {
                return clientesEncontrados[clienteDesejado - 1]
            } else if (clienteDesejado !== 0) {
                console.log(`Operação não entendida :(`)
            }
        } else if (clientesEncontrados.length === 1) {
            console.log(`Cliente encontrado!`)
            return clientesEncontrados[0]
        } else {
            console.log('Cliente não encontrado :(')
        }

        let resposta = entrada.receberTexto(`Deseja procurar novamente? (S/N)`)
        if (resposta.toUpperCase() === 'S') {
            continue
        }
        break
    }
}

function receberPreferenciaNomeSocial(entrada: Entrada): string | undefined {
    while (true) {
        const resposta = entrada.receberTexto("Prefere ser chamado pelo nome social? (S/N): ")
        if (resposta.toUpperCase() === "S") {
            return entrada.receberTexto("Por favor, informe o nome social do cliente: ")
        } else if (resposta.toUpperCase() === "N") {
            return
        }
        console.log("Insira S ou N na sua resposta!")
    }
}

export { CadastroCliente, AlteracaoCliente, ExclusaoCliente, ListaCliente, buscarCliente }