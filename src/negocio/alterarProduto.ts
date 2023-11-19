import Produto from "../modelo/produto";

export default class AlterarProdutos{
    private produtos: Array<Produto>
    constructor(produtos: Array<Produto>) {
        this.produtos = produtos
    }
    public alterarProduto(produtoAlterado: Produto, posicaoProduto: number): Array<Produto>{
        this.produtos.forEach((produto, index) =>{
            if (index === posicaoProduto){
                this.produtos[index] = produtoAlterado
                return this.produtos
            }
        })
        return this.produtos
    }
}