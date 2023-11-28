import Entrada from "../io/entrada"
import Empresa from "../modelo/empresa"
import ConsumirProduto from "../negocio/consumirProduto"
import ConsumirServico from "../negocio/consumirServico"
import Destacar from "../negocio/funcoesDestaques"
import { AlteracaoCliente, CadastroCliente, ExclusaoCliente, ListaCliente } from "../negocio/funcoesCliente"
import { AlteracaoPet, CadastroPet, ExclusaoPet, ListaPet } from "../negocio/funcoesPet"
import { AlteracaoProduto, CadastroProduto, ExclusaoProduto, ListaProdutos } from "../negocio/funcoesProdutos"
import { AlteracaoServico, CadastroServico, ExclusaoServico, ListaServicos } from "../negocio/funcoesServicos"
import EmpresaTeste from "./empresaTeste"

console.log(`Seja Bem-vindo!!`)
let entrada = new Entrada()
let empresa = new Empresa()
let empresaTeste = new EmpresaTeste()
const clientes = empresaTeste.clientesEmpresaTeste()
const produtos = empresaTeste.produtosEmpresaTeste()
const servicos = empresaTeste.servicosEmpresaTeste()
empresa.setClientes = clientes
empresa.setProdutos = produtos
empresa.setServicos = servicos
empresaTeste.produtosEServicosConsumidosTeste()

let continuar: boolean = true
let opcao: number = 0
let resposta: string = ''

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
            while (continuar) {
                console.log(`O que deseja cadastrar?`);
                console.log(`1 - Clientes`)
                console.log(`2 - Pets`)
                console.log(`3 - Produtos`)
                console.log(`4 - Serviços`)
                console.log(`0 - Voltar`)
                opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
                switch (opcao) {
                    case 1:
                        new CadastroCliente(empresa.getClientes).cadastrar()
                        break
                    case 2:
                        new CadastroPet(empresa.getClientes).cadastrar()
                        break
                    case 3:
                        new CadastroProduto(empresa.getProdutos).cadastrar()
                        break
                    case 4:
                        new CadastroServico(empresa.getServicos).cadastrar()
                        break
                    case 0:
                        break
                    default:
                        console.log(`Operação não entendida :(`)
                        continue
                }
                if ([1, 2, 3, 4].includes(opcao)) {
                    resposta = entrada.receberTexto(`Deseja cadastrar mais alguma coisa? (S/N)`)
                    if (resposta.toUpperCase() === 'S') {
                        continue
                    }
                }
                continuar = false
            }
            continuar = true
            break;
        case 2:
            while (continuar) {
                console.log(`O que deseja visualizar?`);
                console.log(`1 - Clientes`)
                console.log(`2 - Pets`)
                console.log(`3 - Produtos`)
                console.log(`4 - Serviços`)
                console.log(`0 - Voltar`)
                opcao = entrada.receberNumero(`Por favor, escolha uma opções: `)
                switch (opcao) {
                    case 1:
                        new ListaCliente(empresa.getClientes).listarClientes()
                        break;
                    case 2:
                        new ListaPet(empresa.getClientes).listar()
                        break
                    case 3:
                        new ListaProdutos(empresa.getProdutos).listar()
                        break
                    case 4:
                        new ListaServicos(empresa.getServicos).listar()
                        break
                    case 0:
                        break;
                    default:
                        console.log(`Operação não entendida :(`)
                        continue
                }
                if ([1, 2, 3, 4].includes(opcao)) {
                    resposta = entrada.receberTexto(`Deseja listar mais alguma coisa? (S/N)`)
                    if (resposta.toUpperCase() === 'S') {
                        continue
                    }
                }
                continuar = false
            }
            continuar = true
            break;
        case 3:
            while (continuar) {
                console.log(`O que deseja alterar?`);
                console.log(`1 - Clientes`)
                console.log(`2 - Pets`)
                console.log(`3 - Produtos`)
                console.log(`4 - Serviços`)
                console.log(`0 - Voltar`)
                opcao = entrada.receberNumero(`Por favor, escolha uma opções: `)
                switch (opcao) {
                    case 1:
                        new AlteracaoCliente(empresa.getClientes).alterarCliente()
                        break;
                    case 2:
                        new AlteracaoPet(empresa.getClientes).alterar()
                        break;
                    case 3:
                        new AlteracaoProduto(empresa.getProdutos).alterar()
                        break;
                    case 4:
                        new AlteracaoServico(empresa.getServicos).alterar()
                        break;
                    case 0:
                        break;
                    default:
                        console.log(`Operação não entendida :(`)
                        continue
                }
                if ([1, 2, 3, 4].includes(opcao)) {
                    resposta = entrada.receberTexto(`Deseja alterar mais alguma coisa? (S/N)`)
                    if (resposta.toUpperCase() === 'S') {
                        continue
                    }
                }
                continuar = false
            }
            continuar = true
            break;
        case 4:
            while (continuar) {
                console.log(`O que deseja deletar?`);
                console.log(`1 - Clientes`)
                console.log(`2 - Pets`)
                console.log(`3 - Produtos`)
                console.log(`4 - Serviços`)
                console.log(`0 - Voltar`)
                opcao = entrada.receberNumero(`Por favor, escolha uma opções: `)
                switch (opcao) {
                    case 1:
                        empresa.setClientes = new ExclusaoCliente(empresa.getClientes).deletar()
                        break;
                    case 2:
                        new ExclusaoPet(empresa.getClientes).deletar()
                        break;
                    case 3:
                        new ExclusaoProduto(empresa.getProdutos).deletar()
                        break;
                    case 4:
                        new ExclusaoServico(empresa.getServicos).deletar()
                        break;
                    case 0:
                        break;
                    default:
                        console.log(`Operação não entendida :(`)
                        continue
                }
                if ([1, 2, 3, 4].includes(opcao)) {
                    resposta = entrada.receberTexto(`Deseja excluir mais alguma coisa? (S/N)`)
                    if (resposta.toUpperCase() === 'S') {
                        continue
                    }
                }
                continuar = false
            }
            continuar = true
            break;
        case 5:
            while (continuar) {
                console.log(`O que deseja consumir?`);
                console.log(`1 - Produtos`)
                console.log(`2 - Serviços`)
                console.log(`0 - Voltar`)
                opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
                let consumo
                switch (opcao) {
                    case 1:
                        consumo = new ConsumirProduto(empresa)
                        empresa = consumo.consumir
                        break
                    case 2:
                        consumo = new ConsumirServico(empresa)
                        empresa = consumo.consumir
                        break
                    case 0:
                        break
                    default:
                        console.log(`Operação não entendida :(`)
                        continue
                }
                if ([1, 2].includes(opcao)) {
                    resposta = entrada.receberTexto(`Deseja consumir mais alguma coisa? (S/N)`)
                    if (resposta.toUpperCase() === 'S') {
                        continue
                    }
                }
                continuar = false
            }
            continuar = true
            break
        case 6:
            while (continuar) {
                console.log(`O que deseja visualizar?`)
                console.log(`1 - Clientes que mais consumiram produtos (quantidade)`)
                console.log(`2 - Clientes que mais consumiram serviços (quantidade)`)
                console.log(`3 - Produtos mais Consumidos`)
                console.log(`4 - Serviços mais Consumidos`)
                console.log(`5 - Clientes que mais consumiram produtos (valor)`)
                console.log(`6 - Clientes que mais consumiram serviços (valor)`)
                console.log(`0 - Voltar`)
                opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
                if ([1,2,3,4,5,6].includes(opcao)){
                    new Destacar(empresa.getClientes).destacar(opcao)
                    resposta = entrada.receberTexto(`Deseja visualizar mais alguma coisa? (S/N)`)
                    if (resposta.toUpperCase() === 'S') {
                        continue
                    }
                } else if (opcao !== 0){
                    console.log(`Operação não entendida :(`)
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