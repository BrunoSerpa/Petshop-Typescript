import Entrada from "../io/entrada";

import Empresa from "../modelo/empresa";

import CadastroCliente from "../negocio/cadastroCliente";
import DeletarCliente from "../negocio/deletarCliente";
import ListagemClientes from "../negocio/listagemClientes";

console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinarias`)
let entrada = new Entrada()
let empresa = new Empresa()
let execucao = true
while (execucao) {
    console.log(`O que deseja fazer?`);
    console.log(`1 - Cadastrar`)
    console.log(`2 - Visualisar`)
    //console.log(`3 - Alterar`)
    console.log(`4 - Excluir`)
    //console.log(`5 - Registrar Consumo`)
    console.log(`0 - Sair`);
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
    switch (opcao) {
        case 1:
            console.log("---------------------------------------")
            console.log("Bem-vindo ao nosso sistema de cadastro!")
            console.log(`O que deseja cadastrar?`);
            console.log(`1 - Cliente`)
            //console.log(`2 - Pets`)
            //console.log(`3 - Produtos`)
            //console.log(`4 - Serviços`)
            console.log(`0 - Voltar`)
            opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
            switch(opcao){
                case 1:
                    let cadastro = new CadastroCliente(empresa.getClientes)
                    cadastro.cadastrar()
                    break
                case 0:
                    break
                default:
                    console.log(`Operação não entendida :(`)
            }
            break;
        case 2:
            console.log("---------------------------------------")
            console.log("Bem-vindo ao nosso sistema de visualização!")
            console.log(`O que deseja visualizar?`);
            console.log(`1 - Clientes`)
            //console.log(`2 - Pets`)
            //console.log(`3 - Produtos`)
            //console.log(`4 - Serviços`)
            console.log(`0 - Voltar`)
            opcao = entrada.receberNumero(`Por favor, escolha uma opções: `)
            switch(opcao){
                case 1:
                    let listagem = new ListagemClientes(empresa.getClientes)
                    listagem.listar()
                    break;
                case 0:
                    break;
                default:
                    console.log(`Operação não entendida :(`)
            }
            break;
        case 4:
            console.log("---------------------------------------")
            console.log("Bem-vindo ao nosso sistema de deletar!")
            console.log(`O que deseja deletar?`);
            console.log(`1 - Clientes`)
            //console.log(`2 - Pets`)
            //console.log(`3 - Produtos`)
            //console.log(`4 - Serviços`)
            console.log(`0 - Voltar`)
            opcao = entrada.receberNumero(`Por favor, escolha uma opções: `)
            switch(opcao){
                case 1:
                    let deleta = new DeletarCliente(empresa.getClientes)
                    empresa.setClientes(deleta.deletar())
                    break;
                case 0:
                    break;
                default:
                    console.log(`Operação não entendida :(`)
            }
            break;
        case 0:
            execucao = false
            console.log(`Até mais`)
            break;
        default:
            console.log(`Operação não entendida :(`)
    }
}