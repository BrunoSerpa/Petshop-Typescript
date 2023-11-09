import Entrada from "../io/entrada"

import Produto from "../modelo/produto";
import Listagem from "./listagem";

export default class DeletarProduto extends Listagem {
    private produtos: Array<Produto>
    private produtoEscolhido !: Produto
    private entrada: Entrada
    constructor(produtos: Array<Produto>) {
        super()
        this.produtos = produtos
        this.entrada = new Entrada()
    }
    public listar(): void {
        const criterio = this.entrada.receberTexto(`Por favor informe o nome do produto: `)
        let produtoEncontrado = this.produtos.find(produto =>
            produto.nome.toLowerCase() === criterio.toLowerCase()
        );
        if (produtoEncontrado){
            this.produtoEscolhido = produtoEncontrado
            console.log(`Nome:` + this.produtoEscolhido.nome)
            console.log(`Preço: R$${this.produtoEscolhido.preco}`)
        } else{
            console.log('Produto não encontrado :');
        }
    }
    public deletar(): Array<Produto>{
        while (true){
            this.listar()
            if (this.produtoEscolhido){
                let continuar = this.entrada.receberTexto(`Deseja excluir esse produto? (S/N):`)
                if (continuar.toUpperCase() === 'S'){
                    this.produtos = this.produtos.filter(produto => produto !== this.produtoEscolhido)
                }
            }
            let continuar = this.entrada.receberTexto(`Deseja excluir mais algum cliente? (S/N):`)
            if (continuar.toUpperCase() === 'S'){
               continue
            }
            break
        }
        return this.produtos
    }
}