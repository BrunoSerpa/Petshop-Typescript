import Entrada from "../io/entrada";

import Empresa from "../modelo/empresa";
import AlterarCliente from "../negocio/alterarCliente";
import AlterarPet from "../negocio/alterarPet";
import AlterarProdutos from "../negocio/alterarProduto";
import AlterarServicos from "../negocio/alterarServico";

import CadastroCliente from "../negocio/cadastroCliente";
import CadastroPet from "../negocio/cadastroPet";
import CadastroProduto from "../negocio/cadastroProduto";
import CadastroServico from "../negocio/cadastroServico";
import ConsumirProduto from "../negocio/consumirProduto";
import ConsumirServicos from "../negocio/consumirServico";
import DeletarCliente from "../negocio/deletarCliente";
import DeletarPet from "../negocio/deletarPet";
import DeletarProduto from "../negocio/deletarProduto";
import DeletarServico from "../negocio/deletarServico";
import DestacarClientes from "../negocio/destacarClientes";
import ListagemClientes from "../negocio/listagemClientes";
import ListagemPets from "../negocio/listagemPets";
import ListagemProdutos from "../negocio/listarProdutos";
import ListagemServicos from "../negocio/listarServicos";
import EmpresaTeste from "./empresaTeste";

console.log(`Seja Bem-vindo!!`)
let entrada = new Entrada()
let empresa = new Empresa()
let empresaTeste = new EmpresaTeste()
const clientes = empresaTeste.clientesEmpresaTeste()
const produtos = empresaTeste.produtosEmpresaTeste()
const servicos = empresaTeste.servicosEmpresaTeste()
empresa.setClientes=clientes
empresa.setProdutos=produtos
empresa.setServicos=servicos
empresaTeste.produtosEServicosConsumidosTeste()

let continuar:boolean = true
let opcao:number = 0
let resposta:string = ''

while (continuar) {
    console.log(`O que deseja fazer?`);
    console.log(`1 - Cadastrar`)
    console.log(`2 - Visualisar`)
    console.log(`3 - Alterar`)
    console.log(`4 - Excluir`)
    console.log(`5 - Registrar Consumo`)
    console.log(`6 - Visualisar Destaques`)
    console.log(`0 - Sair`);
    opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
    switch (opcao) {
        case 1:
            while (continuar){
                console.log(`O que deseja cadastrar?`);
                console.log(`1 - Clientes`)
                console.log(`2 - Pets`)
                console.log(`3 - Produtos`)
                console.log(`4 - Serviços`)
                console.log(`0 - Voltar`)
                opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
                let cadastro
                switch(opcao){
                    case 1:
                        cadastro = new CadastroCliente(empresa.getClientes)
                        cadastro.cadastrar
                        break
                    case 2:
                        cadastro = new CadastroPet(empresa.getClientes)
                        cadastro.cadastrar
                        break
                    case 3:
                        cadastro = new CadastroProduto(empresa.getProdutos)
                        cadastro.cadastrar()
                        break
                    case 4:
                        cadastro = new CadastroServico(empresa.getServicos)
                        cadastro.cadastrar()
                        break
                    case 0:
                        break
                    default:
                        console.log(`Operação não entendida :(`)
                        continue
                }
                if ([1,2,3,4].includes(opcao)){
                    resposta = entrada.receberTexto(`Deseja cadastrar mais alguma coisa? (S/N)`)
                    if (resposta.toUpperCase() === 'S'){
                        continue
                    }
                }
                continuar = false
            }
            continuar = true
            break;
        case 2:
            while (continuar){
                console.log(`O que deseja visualizar?`);
                console.log(`1 - Clientes`)
                console.log(`2 - Pets`)
                console.log(`3 - Produtos`)
                console.log(`4 - Serviços`)
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
                        break
                    case 3:
                        listagem = new ListagemProdutos(empresa.getProdutos)
                        listagem.listar()
                        break
                    case 4:
                        listagem = new ListagemServicos(empresa.getServicos)
                        listagem.listar()
                        break
                    case 0:
                        break;
                    default:
                        console.log(`Operação não entendida :(`)
                        continue
                }
                if ([1,2,3,4].includes(opcao)){
                    resposta = entrada.receberTexto(`Deseja listar mais alguma coisa? (S/N)`)
                    if (resposta.toUpperCase() === 'S'){
                        continue
                    }
                }
                continuar = false
            }
            continuar = true
            break;
        case 3:
            while (continuar){
                console.log(`O que deseja alterar?`);
                console.log(`1 - Clientes`)
                console.log(`2 - Pets`)
                console.log(`3 - Produtos`)
                console.log(`4 - Serviços`)
                console.log(`0 - Voltar`)
                opcao = entrada.receberNumero(`Por favor, escolha uma opções: `)
                let editar
                switch(opcao){
                    case 1:
                        editar = new AlterarCliente(empresa.getClientes)
                        empresa.setClientes=editar.alterar
                        break;
                    case 2:
                        editar = new AlterarPet(empresa.getClientes)
                        empresa.setClientes=editar.alterar
                        break;
                    case 3:
                        editar = new AlterarProdutos(empresa.getProdutos)
                        empresa.setProdutos=editar.alterar
                        break;
                    case 4:
                        editar = new AlterarServicos(empresa.getServicos)
                        empresa.setServicos=editar.alterar
                        break;
                    case 0:
                        break;
                    default:
                        console.log(`Operação não entendida :(`)
                        continue
                }
                if ([1, 2, 3 , 4].includes(opcao)){
                    resposta = entrada.receberTexto(`Deseja alterar mais alguma coisa? (S/N)`)
                    if (resposta.toUpperCase() === 'S'){
                        continue
                    }
                }
                continuar = false
            }
            continuar = true
            break;
        case 4:
            while (continuar){
                console.log(`O que deseja deletar?`);
                console.log(`1 - Clientes`)
                console.log(`2 - Pets`)
                console.log(`3 - Produtos`)
                console.log(`4 - Serviços`)
                console.log(`0 - Voltar`)
                opcao = entrada.receberNumero(`Por favor, escolha uma opções: `)
                let deleta
                switch(opcao){
                    case 1:
                        deleta = new DeletarCliente(empresa.getClientes)
                        empresa.setClientes=deleta.deletar
                        break;
                    case 2:
                        deleta = new DeletarPet(empresa.getClientes)
                        empresa.setClientes=deleta.deletar
                        break;
                    case 3:
                        deleta = new DeletarProduto(empresa.getProdutos)
                        empresa.setProdutos=deleta.deletar
                        break;
                    case 4:
                        deleta = new DeletarServico(empresa.getServicos)
                        empresa.setServicos=deleta.deletar
                        break;
                    case 0:
                        break;
                    default:
                        console.log(`Operação não entendida :(`)
                        continue
                }
                if ([1, 2, 3 , 4].includes(opcao)){
                    resposta = entrada.receberTexto(`Deseja excluir mais alguma coisa? (S/N)`)
                    if (resposta.toUpperCase() === 'S'){
                        continue
                    }
                }
                continuar = false
            }
            continuar = true
            break;
        case 5:
            while (continuar){
                console.log(`O que deseja consumir?`);
                console.log(`1 - Produtos`)
                console.log(`2 - Serviços`)
                console.log(`0 - Voltar`)
                opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
                let consumo
                switch(opcao){
                    case 1:
                        consumo = new ConsumirProduto(empresa)
                        empresa=consumo.consumir
                        break
                    case 2:
                        consumo = new ConsumirServicos(empresa)
                        empresa=consumo.consumir
                        break
                    case 0:
                        break
                    default:
                        console.log(`Operação não entendida :(`)
                        continue
                }
                if ([1, 2].includes(opcao)){
                    resposta = entrada.receberTexto(`Deseja consumir mais alguma coisa? (S/N)`)
                    if (resposta.toUpperCase() === 'S'){
                        continue
                    }
                }
                continuar = false
            }
            continuar = true
            break
        case 6:
            while (continuar){
                console.log(`O que deseja visualizar?`)
                console.log(`1 - Clientes que mais consumiram produtos (quantidade)`)
                console.log(`2 - Clientes que mais consumiram serviços (quantidade)`)
                console.log(`3 - Produtos mais Consumidos`)
                console.log(`4 - Serviços mais Consumidos`)
                console.log(`5 - Clientes que mais consumiram produtos (valor)`)
                console.log(`6 - Clientes que mais consumiram serviços (valor)`)
                console.log(`0 - Voltar`)
                opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
                let destacar = new DestacarClientes(empresa.getClientes)
                switch(opcao){
                    case 1:
                        destacar.destacar(opcao)
                        break
                    case 2:
                        destacar = new DestacarClientes(empresa.getClientes)
                        destacar.destacar(opcao)
                        break
                    case 3:
                        destacar = new DestacarClientes(empresa.getClientes)
                        destacar.destacar(opcao)
                        break
                    case 4:
                        destacar = new DestacarClientes(empresa.getClientes)
                        destacar.destacar(opcao)
                        break
                    case 5:
                        destacar = new DestacarClientes(empresa.getClientes)
                        destacar.destacar(5)
                        break
                    case 6:
                        destacar = new DestacarClientes(empresa.getClientes)
                        destacar.destacar(6)
                        break
                    case 0:
                        break
                    default:
                        console.log(`Operação não entendida :(`)
                        continue
                }
                if ([1, 2, 3, 4, 5, 6].includes(opcao)){
                    resposta = entrada.receberTexto(`Deseja visualizar mais alguma coisa? (S/N)`)
                    if (resposta.toUpperCase() === 'S'){
                        continue
                    }
                }
                continuar = false
            }
            continuar = true
            break
        case 0:
            continuar = false
            console.log(`Até mais!!`)
            break;
        default: console.log(`Operação não entendida :(`)
    }
}