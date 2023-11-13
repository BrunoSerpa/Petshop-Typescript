import Entrada from "../io/entrada"


import Produto from "../modelo/produto";

export default class ListagemProdutos{
    private produtos: Array<Produto>
    private entrada: Entrada
    constructor(produtos: Array<Produto>) {
        this.produtos = produtos
        this.entrada = new Entrada()
    }
    
    public set listarProduto(produtoDesejado: Produto){
        console.log("---------------------------------------")
        console.log(`Dados do Produto:\n`);
        console.log(`Nome: ${produtoDesejado.nome}`)
        console.log(`Preço: R$${produtoDesejado.preco}`)
    }

    public get selecionarProduto(): Produto|undefined {
        let produtosEncontrados: Array<Produto> = []
        while (true){
            let criterio = this.entrada.receberTexto(`Informe o nome ou o número do cpf deste produto:`)
            this.produtos.forEach(produto =>{
                if (produto.nome.toLowerCase() === criterio.toLowerCase()){
                    produtosEncontrados.push(produto)
                }
            })
            if (produtosEncontrados.length > 1){
                let count:number=1
                let opcoes: Array<number> = []
                
                console.log(`Mais de um produto encontrado!`)
                console.log(`Qual produto deseja alterar?`)
                produtosEncontrados.forEach(produto =>{
                    console.log(`${count} - Produto:`)
                    this.listarProduto= produto
                    opcoes.push(count)
                    count++
                })
                console.log(`0 - Nenhum`)
                let produtoDesejado = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                if (opcoes.includes(produtoDesejado)){
                    return produtosEncontrados[produtoDesejado-1]
                } else if (produtoDesejado !== 0){
                    console.log(`Operação não entendida :(`)
                }
            } else if (produtosEncontrados.length === 1){
                console.log(`Produto encontrado!`)
                return produtosEncontrados[0]
            } else{
                console.log('Produto não encontrado :(');
            }
            let resposta = this.entrada.receberTexto(`Deseja procurar novamente? (S/N)`)
            if (resposta.toUpperCase() === 'S'){
                continue
            }
            break
        }
        return
    }

    public listar(): void {
        let produtoEspecifico= this.entrada.receberTexto(`Gostaria de Procurar um produto em específico? (S/N): `)
        switch (produtoEspecifico.toUpperCase()){
            case "S":
                while (true){
                    let produtoEncontrado = this.selecionarProduto
                    if (produtoEncontrado){
                        this.listarProduto=produtoEncontrado
                    }
                    let continuar = this.entrada.receberTexto(`Deseja listar mais algum produto? (S/N)`)
                    if (continuar.toUpperCase() === 'S'){
                        continue
                    }
                    break
                }
                break
            case "N":
                this.produtos.forEach(produtoData =>{
                    this.listarProduto=produtoData
                })
                break
            default:
                console.log(`Operação não entendida :(`)
                break
        }
    }
}