import Entrada from "../io/entrada";

import Empresa from "../modelo/empresa";
import AlterarCliente from "../negocio/alterarCliente";
import AlterarPet from "../negocio/alterarPet";

import CadastroCliente from "../negocio/cadastroCliente";
import CadastroPet from "../negocio/cadastroPet";
import DeletarCliente from "../negocio/deletarCliente";
import DeletarPet from "../negocio/deletarPet";
import ListagemClientes from "../negocio/listagemClientes";
import ListagemPets from "../negocio/listagemPet";
import EmpresaTeste from "./empresaTeste";

console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinarias`)
let entrada = new Entrada()
let empresa = new Empresa()
let empresaTeste = new EmpresaTeste()
const clientes = empresaTeste.clientesEmpresaTeste()
empresa.setClientes(clientes)

let execucao = true
while (execucao) {
    console.log(`O que deseja fazer?`);
    console.log(`1 - Cadastrar`)
    console.log(`2 - Visualisar`)
    console.log(`3 - Alterar`)
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
            console.log(`2 - Pets`)
            //console.log(`3 - Produtos`)
            //console.log(`4 - Serviços`)
            console.log(`0 - Voltar`)
            opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
            let cadastro
            switch(opcao){
                case 1:
                    cadastro = new CadastroCliente(empresa.getClientes)
                    cadastro.cadastrar()
                    break
                case 2:
                    cadastro = new CadastroPet(empresa.getClientes)
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
            console.log(`2 - Pets`)
            //console.log(`3 - Produtos`)
            //console.log(`4 - Serviços`)
            console.log(`0 - Voltar`)
            opcao = entrada.receberNumero(`Por favor, escolha uma opções: `)
            let listagem
            switch(opcao){
                case 1:
                    listagem = new ListagemClientes(empresa.getClientes)
                    listagem.listar()
                    break;
                case 2:
                    listagem = new ListagemPets(empresa.getClientes)
                    listagem.listar()
                case 0:
                    break;
                default:
                    console.log(`Operação não entendida :(`)
            }
            break;
        case 3:
            console.log("---------------------------------------")
            console.log("Bem-vindo ao nosso sistema de edição!")
            console.log(`O que deseja editar?`);
            console.log(`1 - Clientes`)
            console.log(`2 - Pets`)
            //console.log(`3 - Produtos`)
            //console.log(`4 - Serviços`)
            console.log(`0 - Voltar`)
            opcao = entrada.receberNumero(`Por favor, escolha uma opções: `)
            let editar
            switch(opcao){
                case 1:
                    editar = new AlterarCliente(empresa.getClientes)
                    empresa.setClientes(editar.alterar())
                    break;
                case 2:
                    editar = new AlterarPet(empresa.getClientes)
                    empresa.setClientes(editar.alterar())
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
            console.log(`2 - Pets`)
            //console.log(`3 - Produtos`)
            //console.log(`4 - Serviços`)
            console.log(`0 - Voltar`)
            opcao = entrada.receberNumero(`Por favor, escolha uma opções: `)
            let deleta
            switch(opcao){
                case 1:
                    deleta = new DeletarCliente(empresa.getClientes)
                    empresa.setClientes(deleta.deletar())
                    break;
                case 2:
                    deleta = new DeletarPet(empresa.getClientes)
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