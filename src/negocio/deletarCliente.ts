import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";

import Listagem from "./listagem";

export default class DeletarCliente extends Listagem {
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
        console.log(`\nDados do cliente`);
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

        count = 1
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
        let continuar = true
        while (continuar){
            let criterio = this.entrada.receberTexto(`Informe o nome ou o número do cpf deste cliente:`)
            let encontrado = this.encontrarCliente(criterio)
            if (encontrado){
                while (true){
                    const excluir = this.entrada.receberTexto(`Ter certeza que deseja deletar esse usuário? (S/N)`)
                    if (excluir === 'S') {
                        this.clientes = this.clientes.filter(clienteData => clienteData !== this.clienteEncontrado);
                        return this.clientes
                    }
                    else if (excluir === 'N') {
                        break
                    }
                    console.log("Informe S para sim e N para não")
                }
            }
            let continuar = this.entrada.receberTexto(`Deseja excluir mais algum usuário? (S/N)`)
            if (continuar.toLocaleUpperCase() === 'S') {
                continue
            }
            break
        }
        return this.clientes
    }
}