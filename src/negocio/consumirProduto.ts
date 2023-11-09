import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import ProdutoConsumido from "../modelo/produtoConsumidos";

import Listagem from "./listagem";

export default class ConsumirProduto extends Listagem {
    private clientes: Array<Cliente>
    private produtos: Array<Produto>
    private entrada: Entrada
    private clienteEscolhido!: Cliente
    private produtoEscolhido!: Produto
    constructor(clientes: Array<Cliente>, produtos: Array<Produto>) {
        super()
        this.entrada = new Entrada()
        this.clientes = clientes
        this.produtos = produtos
    }
    public listar(): void {
        let criterioCliente = this.entrada.receberTexto(`Informe o nome ou o número do cpf deste cliente:`)
        const clienteEncontrado = this.clientes.find(cliente =>
            cliente.nome.toLowerCase() === criterioCliente.toLowerCase() || cliente.getCpf.getValor === criterioCliente
        );
        if (clienteEncontrado){
            let criterioProduto = this.entrada.receberTexto(`Informe o nomedo produto`)
            const produtoEncontrado = this.produtos.find(produto =>
                produto.nome.toLowerCase() === criterioProduto.toLowerCase()
            );
            if (produtoEncontrado){
                this.produtoEscolhido=produtoEncontrado
                this.clienteEscolhido=clienteEncontrado
            }
            else(
                console.log(`Serviço não encontrado`)
            )
        }
        else(
            console.log(`Cliente não encontrado`)
        )
    }
    public consumir(): Array<Cliente>{
        while (true){
            this.listar()
            if (this.produtoEscolhido){
                let quantPets:number 
                quantPets=this.clienteEscolhido.getPets.length
                console.log(`Escolha o pet que fará o serviço`)
                let numPets=[]
                for (let i = 1; i < quantPets+1; i++) {
                    console.log(`${i} - ${i}º pet`)
                    numPets.push(i)
                }
                console.log(`0 - Cancelar`)
                let petEscolhido = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                if (petEscolhido === 0){
                    break
                }
                else if (numPets.includes(petEscolhido)){
                    let data = new Date()
                    let novoProdutoConsumido = new ProdutoConsumido(this.produtoEscolhido, data, this.clienteEscolhido.getPets[petEscolhido -1])
                    this.clienteEscolhido.getProdutosConsumidos.push(novoProdutoConsumido)
                }
                else {
                    console.log(`Operação Invalida :(`)
                }
            }
            let continuar = this.entrada.receberTexto(`Deseja adiconar mais algum consumo? (S/N)`)
            if (continuar.toUpperCase() === 'S') {
                continue
            }
            break
        }
        return this.clientes
    }
}