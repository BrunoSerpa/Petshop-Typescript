import Entrada from "../io/entrada"


import Produto from "../modelo/produto";
import Listagem from "./listagem";

export default class AlterarProdutos extends Listagem {
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
            console.log(`Nome:` + produtoEncontrado.nome)
            console.log(`Preço: R$${produtoEncontrado.preco}`)
            this.produtoEscolhido= produtoEncontrado
        } else{
            console.log('Produto não encontrado :');
        }
    }
    public alterar(): Array<Produto>{
        while (true){
            this.listar()
            while (true) {       
                if (this.produtoEscolhido){
                    console.log(`Informe o dado que deseja alterar:`)
                    console.log("1 - Nome")
                    console.log("2 - Preço")
                    console.log("0 - Sair")
                    let dadoDesejado = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                    switch (dadoDesejado){
                        case 1:
                            this.produtoEscolhido.nome = this.entrada.receberTexto(`Por favor informe o nome do produto: `)
                            break
                        case 2:
                            this.produtoEscolhido.preco = this.entrada.receberNumero(`Por favor informe o numero do produto: R$`)
                            break
                        default:
                            console.log(`Operação não entendida :(`)
                            break 
                    }
                    let continuar = this.entrada.receberTexto(`Deseja alterar mais algum dado? (S/N):`)
                    if (continuar.toUpperCase() === 'S'){
                        continue
                    }
                }
                break
            }
            let continuar = this.entrada.receberTexto(`Deseja alterar mais algum produto? (S/N):`)
            if (continuar.toUpperCase() === 'S'){
                continue
            }
            break
        }
        return this.produtos
    }
}