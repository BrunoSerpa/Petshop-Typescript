import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";

import Listagem from "./listagem";

export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public listar(): void {
        let clienteEspecifico= this.entrada.receberTexto(`Gostaria de Procurar um cliente em específico? (S/N): `)
        switch (clienteEspecifico.toUpperCase()){
            case "S":
                let criterio = this.entrada.receberTexto(`Informe o nome ou o número do cpf deste cliente:`)
                const clienteEncontrado = this.clientes.find(cliente =>
                    cliente.nome.toLowerCase() === criterio.toLowerCase() || cliente.getCpf.getValor === criterio
                );
                if (clienteEncontrado){
                    console.log(`Nome: ` + clienteEncontrado.nome);
                    if (clienteEncontrado.nomeSocial){
                        console.log(`Nome social: ` + clienteEncontrado.nomeSocial);
                    }
                    console.log(`CPF: ` + clienteEncontrado.getCpf.getValor);

                    let count = 1;
                    clienteEncontrado.getRgs.forEach((rgData) => {
                        console.log(`${count}º RG: ` + rgData.getValor);
                        count++;
                    });

                    count = 1;
                    clienteEncontrado.getTelefones.forEach((telefoneData) => {
                        console.log(`${count}º Telefone: (${telefoneData.getDdd}) ${telefoneData.getNumero}`);
                        count++;
                    
                    });

                    count = 1
                    clienteEncontrado.getPets.forEach((petsData) => {
                        console.log(`${count}º Pet:` + petsData.getNome)
                        console.log(`- Tipo:` + petsData.getTipo)
                        console.log(`- Genero:` + petsData.getGenero)
                        console.log(`- Raça:` + petsData.getRaca)
                        count++
                        
                    })
                } else {
                    console.log('Cliente não encontrado.');
                }
                break
            case "N":
                console.log(`\nLista de todos os clientes:`);
                this.clientes.forEach(cliente => {
                    console.log(`Nome: ` + cliente.nome);
                            if (cliente.nomeSocial){
                                console.log(`Nome social: ` + cliente.nomeSocial);
                            }
                            console.log(`CPF: ` + cliente.getCpf.getValor);
        
                            let count = 1;
                            cliente.getRgs.forEach((rgData) => {
                                console.log(`${count}º RG: ` + rgData.getValor);
                                count++;
                            });
        
                            count = 1;
                            cliente.getTelefones.forEach((telefoneData) => {
                                console.log(`${count}º Telefone: (${telefoneData.getDdd}) ${telefoneData.getNumero}`);
                                count++;
                            
                            });
                            count = 1
                            cliente.getPets.forEach((petsData) => {
                                console.log(`${count}º Pet:` + petsData.getNome)
                                console.log(`- Tipo:` + petsData.getTipo)
                                console.log(`- Genero:` + petsData.getGenero)
                                console.log(`- Raça:` + petsData.getRaca)
                                count++
                                
                            })
                    console.log(`--------------------------------------`);
                });
                break
            default:
                console.log(`Operação não entendida :(`)
                break
        }
    }
}