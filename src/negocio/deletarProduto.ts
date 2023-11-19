import Produto from "../modelo/produto"

export default class DeletarProduto{
    private produtos: Array<Produto>
    constructor(produtos: Array<Produto>) {
        this.produtos = produtos
    }
    public deletarProduto(produtoEscolhido: Produto): Array<Produto>{
        this.produtos.filter((produto) => produto !== produtoEscolhido)
        return this.produtos
    }
}