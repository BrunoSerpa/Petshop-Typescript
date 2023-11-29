import Produto from "../modelo/produto";

export default class FuncoesProduto{
    private produtos: Array<Produto>
    constructor(produtos: Array<Produto>) {
        this.produtos = produtos
    }
    public cadastrarProduto(novoProduto: Produto): Array<Produto> {
        const produtoExistente = this.produtos.find(
            (produto) => produto.getNome === novoProduto.getNome && produto.getPreco === novoProduto.getPreco
        );
        if (!produtoExistente) {
            this.produtos.push(novoProduto);
        }
        return this.produtos;
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
    public deletarProduto(produtoEscolhido: Produto): Array<Produto>{
        this.produtos=this.produtos.filter((produto) => produto !== produtoEscolhido)
        return this.produtos
    }
}