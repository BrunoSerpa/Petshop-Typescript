import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Empresa from "../modelo/empresa";

import Pet from "../modelo/pet";
import Produto from "../modelo/produto";
import ProdutoConsumido from "../modelo/produtoConsumidos";

import ListagemClientes from "./listagemClientes";
import ListagemProdutos from "./listarProdutos";

export default class ConsumirProduto{
    private empresa: Empresa
    private entrada: Entrada

    private listaClientes
    private listarProdutos

    private clienteEscolhido!: Cliente
    private petEscolhido!: Pet
    private produtoEscolhido!: Produto
    constructor(empresa: Empresa) {
        this.entrada = new Entrada()
        this.empresa = empresa
        this.listaClientes =  new ListagemClientes(this.empresa.getClientes)
        this.listarProdutos =  new ListagemProdutos(this.empresa.getProdutos)
    }
    public get consumir(): Empresa{
        while (true){
            const clienteSelecionado= this.listaClientes.selecionarCliente
            if (clienteSelecionado){
                while (true){
                    let quantPets:number 
                    quantPets=clienteSelecionado.getPets.length
                    console.log(`Escolha o pet que fará o serviço`)
                    let numPets=[]
                    for (let i = 1; i < quantPets+1; i++) {
                        console.log(`${i} - ${i}º pet`)
                        numPets.push(i)
                    }
                    console.log(`0 - Cancelar`)
                    let petEscolhido = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                    if (numPets.includes(petEscolhido)){
                        this.petEscolhido = clienteSelecionado.getPets[petEscolhido -1]
                    }
                    else if (petEscolhido !== 0){
                        console.log(`Operação não entendida :(`)
                        continue
                    }
                    break
                }
                const produtoSelecionado= this.listarProdutos.selecionarProduto
                if (produtoSelecionado){
                    this.produtoEscolhido=produtoSelecionado
                } else {
                    break
                }
                if (this.clienteEscolhido && this.petEscolhido && this.produtoEscolhido){
                    let data = new Date()
                    const produtoConsumido = new ProdutoConsumido(this.produtoEscolhido, data, this.petEscolhido)
                    this.clienteEscolhido.getProdutosConsumidos.push(produtoConsumido)
                }
                let continuar = this.entrada.receberTexto(`Deseja adiconar mais algum consumo para este cliente? (S/N)`)
                if (continuar.toUpperCase() === 'S') {
                    continue
                }
            } else {
                break
            }
            let continuar = this.entrada.receberTexto(`Deseja adiconar mais algum consumo para outro cliente? (S/N)`)
            if (continuar.toUpperCase() === 'S') {
                continue
            }
        }
        return this.empresa
    }
}