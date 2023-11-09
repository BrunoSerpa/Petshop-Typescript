import Entrada from "../io/entrada"


import Produto from "../modelo/produto";
import Listagem from "./listagem";

export default class ListagemProdutos extends Listagem {
    private produtos: Array<Produto>
    private entrada: Entrada
    constructor(produtos: Array<Produto>) {
        super()
        this.produtos = produtos
        this.entrada = new Entrada()
    }
    public listar(): void {
        let produtoEspecifico= this.entrada.receberTexto(`Gostaria de Procurar um produto em específico? (S/N): `)
        switch (produtoEspecifico.toUpperCase()){
            case "S":
                while (true){
                    const criterio = this.entrada.receberTexto(`Por favor informe o nome do produto: `)
                    const produtoEncontrado = this.produtos.find(produto =>
                        produto.nome.toLowerCase() === criterio.toLowerCase()
                    );
                    if (produtoEncontrado){
                        console.log(`Nome:` + produtoEncontrado.nome)
                        console.log(`Preço: R$${produtoEncontrado.preco}`)
                    } else{
                        console.log('Cliente não encontrado.');
                    }
                    let continuar = this.entrada.receberTexto(`Deseja listar mais algum produto? (S/N)`)
                    if (continuar.toUpperCase() !== 'S'){
                        break
                    }
                }
                break
            case "N":
                this.produtos.forEach(produtoData =>{
                    console.log(`Nome:` + produtoData.nome)
                    console.log(`Preço: R$${produtoData.preco}`)
                    console.log(`--------------------------------------`);
                })
                break
            default:
                console.log(`Operação não entendida :(`)
                break
        }
    }
}