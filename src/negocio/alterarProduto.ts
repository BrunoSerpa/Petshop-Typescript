import Entrada from "../io/entrada"
import Produto from "../modelo/produto";
import ListagemProdutos from "./listarProdutos";

export default class AlterarProdutos{
    private produtos: Array<Produto>
    private listarProdutos
    private produtoEscolhido !: Produto
    private entrada: Entrada
    constructor(produtos: Array<Produto>) {
        this.produtos = produtos
        this.entrada = new Entrada()
        this.listarProdutos = new ListagemProdutos(this.produtos)
    }
    private continuar!:boolean
    public get alterar(): Array<Produto>{
        this.continuar=true
        while (this.continuar){
            let produtoEscolhido=this.listarProdutos.selecionarProduto
            if (produtoEscolhido){
                this.produtoEscolhido=produtoEscolhido
            } else{
                break 
            }
            while (this.continuar) {
                this.listarProdutos.listarProduto=this.produtoEscolhido
                console.log(`Informe o dado que deseja alterar:`)
                console.log("1 - Nome")
                console.log("2 - Preço")
                console.log("0 - Sair")
                let opcao = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                switch (opcao){
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
                let resposta = this.entrada.receberTexto(`Deseja alterar mais algum dado? (S/N):`)
                if (resposta.toUpperCase() === 'S'){
                    continue
                }        
                this.continuar=false
            }
            this.continuar=true
            let resposta = this.entrada.receberTexto(`Deseja alterar mais algum produto? (S/N):`)
            if (resposta.toUpperCase() === 'S'){
                continue
            }
            this.continuar=false
        }
        return this.produtos
    }
}