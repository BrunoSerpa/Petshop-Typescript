import Entrada from "../io/entrada"
import ListagemClientes from "./listagemClientes";

import Cliente from "../modelo/cliente"
import Pet from "../modelo/pet";

export default class CadastroPet {
    private clientes: Array<Cliente>
    private entrada: Entrada
    private listaClientes
    private clienteEncontrado!: Cliente
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.entrada = new Entrada()
        this.listaClientes =  new ListagemClientes(this.clientes)
    }

    public get cadastrar(): Array<Cliente>{
        let continuar = true
        do{
            let clienteEncontrado = this.listaClientes.selecionarCliente
            if (clienteEncontrado){
                this.clienteEncontrado=clienteEncontrado
                console.log("---------------------------------------")
                console.log(`\nIníciando o cadastro do pet`);
                do{
                    const nome = this.entrada.receberTexto(`Por favor informe o nome do seu pet: `)
                    const raca = this.entrada.receberTexto(`Por favor informe a raça do seu pet: `)
                    const genero = this.entrada.receberTexto(`Por favor informe o genero do seu pet: `)
                    const tipo = this.entrada.receberTexto(`Por favor informe o tipo do seu pet: `)
                    const pet = new Pet(nome, raca, genero, tipo)
                    this.clienteEncontrado.getPets.push(pet)
                    console.log(`\nCadastro concluído :)\n`);
                    const continuarPets = this.entrada.receberTexto(`Gostaria de cadastrar mais algum pet nesse cliente? (S/N): `);
                    if (continuarPets.toUpperCase() === 'S') {
                        continue
                    }
                    continuar= false
                } while (continuar);
                let clientesAntigos: Array<Cliente>
                clientesAntigos = this.clientes
                this.clientes = []
                clientesAntigos.forEach(clienteData =>{
                    if (clienteData === clienteEncontrado)
                        this.clientes.push(this.clienteEncontrado)
                    else
                        this.clientes.push(clienteData)
                })
                const continuarPets = this.entrada.receberTexto(`Gostaria de cadastrar mais algum pet em outro cliente? (S/N): `);
                if (continuarPets.toUpperCase() === 'S') {
                    continue
                }
                continuar= false
            }
        } while (continuar);
        return this.clientes
    }
}