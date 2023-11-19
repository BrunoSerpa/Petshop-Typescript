import Cliente from "../modelo/cliente";
import Servico from "../modelo/produto";
import ServicoConsumido from "../modelo/servicoConsumidos";

export default class ConsumirServico{
    private clientes: Array<Cliente>;
    private produtos: Array<Servico>
    constructor(clientes: Array<Cliente>, produtos: Array<Servico>) {
        this.clientes = clientes;
        this.produtos = produtos;
    }
    public consumirServico(posicaoCliente: number, posicaoPet: number, posicaoServico: number): Array<Cliente>{
        const clienteConsumidor = this.clientes[posicaoCliente]
        const petConsumidor = clienteConsumidor.getPets[posicaoPet]
        const dataConsumo = new Date()
        const servicoEscolhido = this.produtos[posicaoServico]
        if (clienteConsumidor && petConsumidor && servicoEscolhido){
            this.clientes[posicaoCliente].getServicosConsumidos.push(new ServicoConsumido(servicoEscolhido, dataConsumo, petConsumidor))
        }
        return this.clientes
    }
}