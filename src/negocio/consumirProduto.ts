import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Empresa from "../modelo/empresa";

import Pet from "../modelo/pet";
import Produto from "../modelo/produto";
import ProdutoConsumido from "../modelo/produtoConsumido";
import { buscarPet } from "./funcoesPet";
import { buscaProduto } from "./funcoesProdutos";


export default class ConsumirProduto{
    private empresa: Empresa
    private entrada: Entrada
    private clienteEscolhido!: Cliente
    private petEscolhido!: Pet
    private produtoEscolhido!: Produto
    constructor(empresa: Empresa) {
        this.entrada = new Entrada()
        this.empresa = empresa
    }
    public get consumir(): Empresa{
        while (true){
            const clienteSelecionado= buscarPet(this.empresa.getClientes, this.entrada, true)
            if (clienteSelecionado instanceof Array){
                this.petEscolhido = clienteSelecionado[0]
                this.clienteEscolhido = clienteSelecionado[1]
                const produtoSelecionado= buscaProduto(this.empresa.getProdutos, this.entrada)
                if (produtoSelecionado){
                    this.produtoEscolhido = produtoSelecionado
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
            break
        }
        return this.empresa
    }
}