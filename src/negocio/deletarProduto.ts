import Entrada from "../io/entrada"

import Produto from "../modelo/produto";
import ListagemProdutos from "./listarProdutos";

export default class DeletarProduto{
    private produtos: Array<Produto>
    private listarProdutos
    private produtoEscolhido !: Produto
    private entrada: Entrada
    constructor(produtos: Array<Produto>) {
        this.produtos = produtos
        this.entrada = new Entrada()
        this.listarProdutos = new ListagemProdutos(this.produtos)
    }
    public get deletar(): Array<Produto>{
        while (true){
            let produtoEscolhido=this.listarProdutos.selecionarProduto
            if (produtoEscolhido){
                this.produtoEscolhido=produtoEscolhido
            } else{
                break 
            }
            if (this.produtoEscolhido){
                this.listarProdutos.listarProduto=this.produtoEscolhido
                let continuar = this.entrada.receberTexto(`Deseja excluir esse produto? (S/N):`)
                if (continuar.toUpperCase() === 'S'){
                    this.produtos = this.produtos.filter(produto => produto !== this.produtoEscolhido)
                }
            }
            let continuar = this.entrada.receberTexto(`Deseja excluir mais algum produto? (S/N):`)
            if (continuar.toUpperCase() === 'S'){
               continue
            }
            break
        }
        return this.produtos
    }
}