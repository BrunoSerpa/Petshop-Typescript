import Entrada from "../io/entrada"
import Cadastro from "./cadastro"

import Cliente from "../modelo/cliente"
import Pet from "../modelo/pet";

export default class CadastroPet extends Cadastro {
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
    public cadastrar(): Array<Cliente>{
        let criterio = this.entrada.receberTexto(`Informe o nome ou o número do cpf deste cliente:`)
        let encontrado = this.encontrarCliente(criterio)
        let clienteAntigo = this.clienteEncontrado
        if (encontrado){
            console.log("---------------------------------------")
            console.log(`\nIníciando o cadastro do pet`);
            let todosPets = false;
            do{
                const nome = this.entrada.receberTexto(`Por favor informe o nome do seu pet: `)
                const raca = this.entrada.receberTexto(`Por favor informe a raça do seu pet: `)
                const genero = this.entrada.receberTexto(`Por favor informe o genero do seu pet: `)
                const tipo = this.entrada.receberTexto(`Por favor informe o tipo do seu pet: `)
                const pet = new Pet(nome, raca, genero, tipo)
                this.clienteEncontrado.getPets.push(pet)
                console.log(`\nCadastro concluído :)\n`);
                const continuarPets = this.entrada.receberTexto(`Gostaria de cadastrar mais algum pet? (S/N): `);
                if (continuarPets.toUpperCase() !== 'S') {
                    todosPets = true;
                }
            } while (!todosPets);
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
            return novoClientes
        }
        return this.clientes
    }
}