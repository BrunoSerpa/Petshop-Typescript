import Entrada from "../io/entrada"

import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import RG from '../modelo/rg';
import Telefone from '../modelo/telefone';
import Pet from "../modelo/pet";

export default class CadastroCliente{
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    
    public get cadastrar(): void {
        console.log("---------------------------------------")
        console.log(`\nIníciando o cadastro do cliente`);
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
        const cpfValor = this.entrada.receberCPF(`Por favor informe o número do CPF: `);
        const dataCpf = this.entrada.receberData(`Por favor informe a data de emissão do CPF (dd/mm/yyyy): `);
        const cpf = new CPF(cpfValor, dataCpf);

        const cliente = new Cliente(nome, nomeSocial, cpf)
        let todos = false
        do {
            const valorRg = this.entrada.receberRG(`Por favor informe o número do RG: `);
            const dataRg = this.entrada.receberData(`Por favor informe a data de emissão do RG (dd/mm/yyyy): `);
            const rg = new RG(valorRg, dataRg);
            cliente.getRgs.push(rg);

            const continuar = this.entrada.receberTexto(`Gostaria de cadastrar mais algum RG? (S/N): `);
            if (continuar.toUpperCase() !== 'S') {
                todos = true;
            }
        } while (!todos);

        todos = false;
        do {
            const ddd = this.entrada.receberTexto(`Por favor informe o DDD do telefone: `);
            const numero = this.entrada.receberTexto(`Por favor informe o número do telefone: `);
            const telefone = new Telefone(ddd, numero);
            cliente.getTelefones.push(telefone);
            const continuarTelefone = this.entrada.receberTexto(`Gostaria de cadastrar mais algum telefone? (S/N): `);
            if (continuarTelefone.toUpperCase() !== 'S') {
                todos = true;
            }
        } while (!todos);

        todos = false;
        do{
            const nome = this.entrada.receberTexto(`Por favor informe o nome do seu pet: `)
            const raca = this.entrada.receberTexto(`Por favor informe a raça do seu pet: `)
            const genero = this.entrada.receberTexto(`Por favor informe o genero do seu pet: `)
            const tipo = this.entrada.receberTexto(`Por favor informe o tipo do seu pet: `)
            const pet = new Pet(nome, raca, genero, tipo)
            cliente.getPets.push(pet)
            const continuarPets = this.entrada.receberTexto(`Gostaria de cadastrar mais algum pet? (S/N): `);
            if (continuarPets.toUpperCase() !== 'S') {
                todos = true;
            }
        } while (!todos);
        this.clientes.push(cliente)
        console.log(`\nCadastro concluído :)\n`);
        return
    }
}