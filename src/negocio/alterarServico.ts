import Servico from "../modelo/servico";

export default class AlterarProdutos{
    private servicos: Array<Servico>
    constructor(servico: Array<Servico>) {
        this.servicos = servico
    }
    public alterarServico(servicoAlterado: Servico, posicaoProduto: number): Array<Servico>{
        this.servicos.forEach((servico, index) =>{
            if (index === posicaoProduto){
                this.servicos[index] = servicoAlterado
                return this.servicos   
            }
        })
        return this.servicos
    }
}