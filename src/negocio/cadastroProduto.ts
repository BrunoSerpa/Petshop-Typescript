import Entrada from "../io/entrada"
import Cadastro from "./cadastro"

import Produto from "../modelo/produto";

export default class CadastroProduto extends Cadastro {
    private produtos: Array<Produto>
    private entrada: Entrada
    constructor(produtos: Array<Produto>) {
        super()
        this.produtos = produtos
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        while (true){
            console.log("---------------------------------------")
            console.log(`\nIníciando o cadastro de produtos`);
            const nome = this.entrada.receberTexto(`Por favor informe o nome do produto: `)
            const preco = this.entrada.receberNumero(`Por favor informe o numero do produto: R$`)
            let produto =  new Produto(nome, preco)
            this.produtos.push(produto)
            console.log(`\nCadastro concluído :)\n`)
            let continuar = this.entrada.receberTexto(`Deseja cadastrar mais algum produto? (S/N)`)
            if (continuar.toUpperCase() !== 'S'){
                break
            }
        }
    }
}