import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import Pet from "../modelo/pet"

class CadastroPet {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        while (true) {
            const clienteEncontrado = buscarCliente(this.clientes, this.entrada)
            if (clienteEncontrado) {
                while (true) {
                    console.log("---------------------------------------");
                    console.log(`\nIniciando o cadastro do pet`);
                    const nome = this.entrada.receberTexto(`Por favor informe o nome do seu pet: `)
                    const raca = this.entrada.receberTexto(`Por favor informe a raça do seu pet: `)
                    const genero = this.entrada.receberTexto(`Por favor informe o genero do seu pet: `)
                    const tipo = this.entrada.receberTexto(`Por favor informe o tipo do seu pet: `)
                    const pet = new Pet(nome, raca, genero, tipo)
                    clienteEncontrado.getPets.push(pet)
                    console.log(`\nCadastro concluído :)\n`);
                    const continuarPets = this.entrada.receberTexto(`Gostaria de cadastrar mais algum pet nesse cliente? (S/N): `);
                    if (continuarPets.toUpperCase() === 'S') {
                        continue
                    }
                    break
                }
            }
            console.log(`\nCadastro concluído :)\n`);
            const continuarPets = this.entrada.receberTexto(`Gostaria de cadastrar mais algum pet em outro cliente? (S/N): `);
            if (continuarPets.toUpperCase() === 'S') {
                continue
            }
            break
        }

    }
}
class ListaPet {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
    }
    public listar(): void {
        console.log("---------------------------------------");
        console.log("\nLista de todos os pets:");
        this.clientes.forEach(clienteData => clienteData.getPets.forEach(petData =>
            exibirDetalhesPet(petData)
        ))
    }
}
class AlteracaoPet {
    private clientes: Array<Cliente>
    private entrada: Entrada
    private petSelecionado!: Pet
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public alterar(): void {
        const petSelecionado = buscarPet(this.clientes, this.entrada, true);
        while (true) {
            if (petSelecionado instanceof Pet) {
                this.petSelecionado = petSelecionado
                while (true) {
                    console.log("---------------------------------------");
                    console.log("\nDados atuais do pet:");
                    exibirDetalhesPet(this.petSelecionado);
                    console.log("\nInforme o dado que deseja alterar:");
                    console.log("1 - Nome")
                    console.log("2 - Tipo")
                    console.log("3 - Genero")
                    console.log("4 - Raça")
                    console.log("0 - Sair")
                    let nome = this.petSelecionado.getNome
                    let tipo = this.petSelecionado.getTipo
                    let raca = this.petSelecionado.getRaca
                    let genero = this.petSelecionado.getGenero
                    let opcao = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                    switch (opcao) {
                        case 1:
                            nome = this.entrada.receberTexto(`Por favor informe o novo nome do seu pet: `)
                            break
                        case 2:
                            tipo = this.entrada.receberTexto(`Por favor informe o novo tipo do seu pet: `)
                            break
                        case 3:
                            genero = this.entrada.receberTexto(`Por favor informe o novo genero do seu pet: `)
                            break
                        case 4:
                            raca = this.entrada.receberTexto(`Por favor informe a nova raça do seu pet: `)
                            break
                        case 0:
                            return
                    }
                    const novoPet = new Pet(nome, raca, genero, tipo);
                    this.clientes.forEach(cliente => {
                        cliente.setPets=cliente.getPets.map(pet => (pet === this.petSelecionado) ? novoPet : pet);
                    });
                    this.petSelecionado = novoPet;

                    if (opcao !== 0) {
                        let resposta = this.entrada.receberTexto(`Deseja alterar mais algum dado? (S/N)`)
                        if (resposta.toUpperCase() === 'S') {
                            continue
                        }
                    }
                    break
                }
                let resposta = this.entrada.receberTexto(`Deseja alterar mais algum pet? (S/N)`)
                if (resposta.toUpperCase() === 'S') {
                    continue
                }
                return
            }
            return
        }
    }
}

class ExclusaoPet {
    private clientes: Cliente[];
    private entrada: Entrada;
    constructor(clientes: Cliente[]) {
        this.clientes = clientes;
        this.entrada = new Entrada();
    }
    public deletar(): void{
        console.log("---------------------------------------");
        console.log("\nIniciando a exclusão do Pet");

        const petSelecionado = buscarPet(this.clientes, this.entrada, false);
        if (!(petSelecionado instanceof  Pet)) {
            console.log("Pet não encontrado :(");
            return
        }
        const confirmacao = this.entrada.receberTexto(`Tem certeza que deseja excluir o pet ${petSelecionado.getNome}? (S/N): `);
        if (confirmacao.toUpperCase() === 'S') {
            // Atualiza a lista de pets do cliente excluindo o pet
            this.clientes.forEach(cliente => {
                cliente.setPets=cliente.getPets.filter(pet => pet !== petSelecionado)
            });

            console.log("Pet excluído com sucesso :)\n");
        } else {
            console.log("Exclusão cancelada.\n");
        }
        return
    }
}


function exibirDetalhesCliente(cliente: Cliente) {
    console.log("---------------------------------------");
    console.log("Dados do cliente:\n");
    console.log(`Nome: ${cliente.nomeSocial} (${cliente.nome})`);
    console.log(`CPF: ${cliente.getCpf.getValor}`);

    if (cliente.getPets.length === 1) {
        console.log(`Pet: ${cliente.getPets[0].getNome}`);
        console.log(`- Gênero: ${cliente.getPets[0].getGenero}`);
        console.log(`- Raça: ${cliente.getPets[0].getRaca} (Tipo: ${cliente.getPets[0].getTipo})`);
    } else if (cliente.getPets.length > 1) {
        console.log("Pets:");
        cliente.getPets.forEach((petData, index) => {
            console.log(`${index + 1}º Pet: ${petData.getNome}`);
            console.log(`- Gênero: ${petData.getGenero}`);
            console.log(`- Raça: ${petData.getRaca} (Tipo: ${petData.getTipo})`);
        });
    }
}
function exibirDetalhesPet(pet: Pet) {
    console.log(`Pet: ${pet.getNome} (${pet.getGenero})`)
    console.log(`- Raça: ${pet.getRaca} (${pet.getTipo})`)
}
function buscarPet(clientes: Cliente[], entrada: Entrada, comCliente: boolean): [Pet, Cliente] | Pet | undefined {
    while (true) {
        let criterio = entrada.receberTexto(`Informe o nome do pet:`);
        let petsEncontrados: Array<{ cliente: Cliente, pet: Pet }> = [];
        clientes.forEach(cliente => {
            cliente.getPets.forEach(pet => {
                if (pet.getNome.toLowerCase() === criterio.toLowerCase()) {
                    petsEncontrados.push({ cliente, pet });
                }
            });
        });
        if (petsEncontrados.length > 1) {
            console.log(`Mais de um Pet encontrado! Escolha o cliente:`);
            petsEncontrados.forEach((petData, index) => {
                console.log(`${index + 1} - Cliente:`);
                exibirDetalhesCliente(petData.cliente);
            });
            console.log(`0 - Nenhum`);
            let opcaoCliente = entrada.receberNumero(`Por favor, informe uma das opções:`);
            if (opcaoCliente > 0 && opcaoCliente <= petsEncontrados.length) {
                if (comCliente){
                    return [petsEncontrados[opcaoCliente - 1].pet, petsEncontrados[opcaoCliente-1].cliente];
                } else {
                    return petsEncontrados[opcaoCliente - 1].pet;
                }
            } else if (opcaoCliente !== 0) {
                console.log(`Opção não válida :(`);
            }
        } else if (petsEncontrados.length === 1) {
            console.log(`Pet encontrado!`);
            if (comCliente){
                return [petsEncontrados[0].pet, petsEncontrados[0].cliente];
            } else {
                return petsEncontrados[0].pet;
            }
        } else {
            console.log('Pet não encontrado :(');
        }
        let resposta = entrada.receberTexto(`Deseja procurar novamente? (S/N)`);
        if (resposta.toUpperCase() !== 'S') {
            break;
        }
    }
    return undefined;
}

function buscarCliente(clientes: Cliente[], entrada: Entrada): Cliente | undefined {
    let clientesEncontrados: Array<Cliente> = []
    while (true) {
        let criterio = entrada.receberTexto(`Informe o nome ou o número do cpf deste cliente:`)
        clientes.forEach(cliente => {
            if (cliente.nome.toLowerCase() === criterio.toLowerCase() || cliente.getCpf.getValor === criterio) {
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
            console.log('Cliente não encontrado :(');
        }
        let resposta = entrada.receberTexto(`Deseja procurar novamente? (S/N)`)
        if (resposta.toUpperCase() === 'S') {
            continue
        }
        break
    }
}

export { CadastroPet, AlteracaoPet, ExclusaoPet, ListaPet, buscarPet };