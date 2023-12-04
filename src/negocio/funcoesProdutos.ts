import Entrada from "../io/entrada";
import Produto from "../modelo/produto";

class CadastroProduto {
    private produtos: Array<Produto>;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>) {
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`#### INICIANDO CADASTRO DO PRODUTO  ####`)
        console.log("========================================")
        while (true) {
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
            const nome = this.entrada.receberTexto(`Por favor informe o nome do produto: `)
            const preco = this.entrada.receberNumero(`Por favor informe o preço do produto: R$`)
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
            this.produtos.push(new Produto(nome, preco))
            console.log(`\nCadastro concluído :)\n`)
            let continuar = this.entrada.receberTexto(`Deseja cadastrar mais algum produto? (S/N)`)
            if (continuar.toUpperCase() === 'S') {
                continue
            }
            break
        }
        console.log("========================================")
        console.log(`#### CADASTRO DO PRODUTO FINALIZADO ####`)
    }
}

class ListaProdutos {
    private produtos: Array<Produto>;
    private entrada: Entrada;
    constructor(produtos: Array<Produto>) {
        this.produtos = produtos;
        this.entrada = new Entrada();
    }
    public listar(): void {
        console.log(`#### INICIANDO LISTAGEM DO PRODUTO  ####`)
        console.log("========================================")
        let produtoEspecifico = this.entrada.receberTexto(`Gostaria de procurar um produto em específico? (S/N): `);
        switch (produtoEspecifico.toUpperCase()) {
            case "S":
                while (true) {
                    let produtoEncontrado = buscaProduto(this.produtos, this.entrada);
                    if (produtoEncontrado) {
                        this.listarProduto(produtoEncontrado);
                    }
                    let continuar = this.entrada.receberTexto(`Deseja listar mais algum produto? (S/N)`);
                    if (continuar.toUpperCase() === 'S') {
                        continue;
                    }
                    break;
                }
                break;
            case "N":
                this.produtos.forEach(produtoData => {
                    this.listarProduto(produtoData);
                });
                break;
            default:
                console.log(`Operação não entendida :(`);
                break;
        }
        console.log(`#### LISTAGEM DO PRODUTO FINALIZADA ####`)
        console.log("========================================")
    }

    public listarProduto(produtoDesejado: Produto): void {
        console.log(`Dados do Produto:`);
        console.log(`Nome: ${produtoDesejado.getNome}`);
        console.log(`Preço: R$${produtoDesejado.getPreco}`);
    }

}

function buscaProduto(produtos: Array<Produto>, entrada: Entrada): Produto | undefined {
    let produtosEncontrados: Array<Produto> = [];
    while (true) {
        let criterio = entrada.receberTexto(`Informe o nome do produto:`);
        produtos.forEach(produto => {
            if (produto.getNome.toLowerCase() === criterio.toLowerCase()) {
                produtosEncontrados.push(produto);
            }
        });
        if (produtosEncontrados.length > 1) {
            let count: number = 1;
            let opcoes: Array<number> = [];

            console.log(`Mais de um produto encontrado!`);
            console.log(`Qual produto deseja alterar?`);
            produtosEncontrados.forEach(produto => {
                console.log(`${count} - Produto:`);
                opcoes.push(count);
                count++;
            });
            console.log(`0 - Nenhum`);
            let produtoDesejado = entrada.receberNumero(`Por favor, informe uma das opções:`);
            if (opcoes.includes(produtoDesejado)) {
                return produtosEncontrados[produtoDesejado - 1];
            } else if (produtoDesejado !== 0) {
                console.log(`Operação não entendida :(`);
            }
        } else if (produtosEncontrados.length === 1) {
            console.log(`Produto encontrado!`);
            return produtosEncontrados[0];
        } else {
            console.log('Produto não encontrado :(');
        }
        let resposta = entrada.receberTexto(`Deseja procurar novamente? (S/N)`);
        if (resposta.toUpperCase() !== 'S') {
            break;
        }
    }
    return undefined;
}


class AlteracaoProduto {
    private produtos: Array<Produto>;
    private listarProdutos: ListaProdutos;
    private produtoEscolhido!: Produto;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>) {
        this.produtos = produtos;
        this.entrada = new Entrada();
        this.listarProdutos = new ListaProdutos(this.produtos);
    }
    public alterar(): void {
        while (true) {
            console.log(`#### INICIANDO ALTERAÇÃO DO PRODUTO  ####`)
            console.log("========================================")
            let produtoEscolhido = buscaProduto(this.produtos, this.entrada);
            if (produtoEscolhido) {
                this.produtoEscolhido = produtoEscolhido;
            } else {
                break;
            }
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
            while (true) {
                console.log("----------------------------------------")
                this.listarProdutos.listarProduto(this.produtoEscolhido);
                console.log("----------------------------------------")
                console.log(`Informe o dado que deseja alterar:`);
                console.log("1 - Nome");
                console.log("2 - Preço");
                console.log("0 - Sair");
                let opcao = this.entrada.receberNumero(`Por favor, informe uma das opções:`);
                switch (opcao) {
                    case 1:
                        this.produtoEscolhido.setNome = this.entrada.receberTexto(`Por favor informe o novo nome do produto: `);
                        break;
                    case 2:
                        this.produtoEscolhido.setPreco = this.entrada.receberNumero(`Por favor informe o novo preço do produto: R$`);
                        break;
                    default:
                        console.log(`Operação não entendida :(`);
                        break;
                }
                let resposta = this.entrada.receberTexto(`Deseja alterar mais algum dado? (S/N):`);
                if (resposta.toUpperCase() === 'S') {
                    continue;
                }
                console.log("Produto alterado com sucesso :)\n")
                break;
            }
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
            let resposta = this.entrada.receberTexto(`Deseja alterar mais algum produto? (S/N):`);
            if (resposta.toUpperCase() === 'S') {
                continue;
            }
            break;
        }
        console.log("========================================")
        console.log(`### ALTERAÇÃO DO PRODUTO FINALIZADA  ###`)
    }
}

class ExclusaoProduto {
    private produtos: Array<Produto>;
    private listarProdutos: ListaProdutos;
    private produtoEscolhido!: Produto;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>) {
        this.produtos = produtos;
        this.entrada = new Entrada();
        this.listarProdutos = new ListaProdutos(this.produtos);
    }

    public deletar(): Array<Produto> {
        console.log(`#### INICIANDO EXCLUSÃO DO PRODUTO  ####`)
        console.log("========================================")
        while (true) {
            let produtoEscolhido = buscaProduto(this.produtos, this.entrada);
            if (produtoEscolhido) {
                this.produtoEscolhido = produtoEscolhido;
            } else {
                return this.produtos
            }
            if (this.produtoEscolhido) {
                this.listarProdutos.listarProduto(this.produtoEscolhido);
                let continuar = this.entrada.receberTexto(`Deseja excluir esse produto? (S/N):`);
                if (continuar.toUpperCase() === 'S') {
                    this.produtos = this.produtos.filter(produto => produto !== this.produtoEscolhido);
                    return this.produtos
                }
            }
            let continuar = this.entrada.receberTexto(`Deseja excluir mais algum produto? (S/N):`);
            if (continuar.toUpperCase() === 'S') {
                continue;
            }
            console.log("========================================")
            console.log(`#### EXCLUSÃO DO PRODUTO FINALIZADA ####`)
            return this.produtos
        }
    }
}

export { CadastroProduto, AlteracaoProduto, ExclusaoProduto, ListaProdutos, buscaProduto };
