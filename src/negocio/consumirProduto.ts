import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import ProdutoConsumido from "../modelo/produtoConsumido";

export default class ConsumirProduto{
    private clientes: Array<Cliente>;
    private produtos: Array<Produto>
    constructor(clientes: Array<Cliente>, produtos: Array<Produto>) {
        this.clientes = clientes;
        this.produtos = produtos;
    }
    public consumirProduto(posicaoCliente: number, posicaoPet: number, posicaoProduto: number): Array<Cliente>{
        const clienteConsumidor = this.clientes[posicaoCliente]
        const petConsumidor = clienteConsumidor.getPets[posicaoPet]
        const dataConsumo = new Date()
        const produtoEscolhido = this.produtos[posicaoProduto]
        if (clienteConsumidor && petConsumidor && produtoEscolhido){
            this.clientes[posicaoCliente].getProdutosConsumidos.push(new ProdutoConsumido(produtoEscolhido, dataConsumo, petConsumidor))
        }
        return this.clientes
    }
}