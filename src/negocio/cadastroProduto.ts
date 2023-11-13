import Entrada from "../io/entrada"

import Produto from "../modelo/produto";

export default class CadastroProduto{
    private produtos: Array<Produto>
    private entrada: Entrada
    constructor(produtos: Array<Produto>) {
        this.produtos = produtos
        this.entrada = new Entrada()
    }

    public cadastrar(): void {
        while (true){
            console.log("---------------------------------------")
            console.log(`\nIníciando o cadastro de produtos`);
            const nome = this.entrada.receberTexto(`Por favor informe o nome do produto: `)
            const preco = this.entrada.receberNumero(`Por favor informe o preço do produto: R$`)
            this.produtos.push(new Produto(nome, preco))
            console.log(`\nCadastro concluído :)\n`)
            let continuar = this.entrada.receberTexto(`Deseja cadastrar mais algum produto? (S/N)`)
            if (continuar.toUpperCase() !== 'S'){
                break
            }
        }
    }
}