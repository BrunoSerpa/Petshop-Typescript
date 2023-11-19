import Produto from "../modelo/produto";

export default class CadastroProduto{
    private produtos: Array<Produto>
    constructor(produtos: Array<Produto>) {
        this.produtos = produtos
    }
    public cadastrarProduto(novoProduto: Produto): Array<Produto> {
        const produtoExistente = this.produtos.find(
            (produto) => produto.nome === novoProduto.nome && produto.preco === novoProduto.preco
        );
        if (!produtoExistente) {
            this.produtos.push(novoProduto);
        }
        return this.produtos;
    }
}