import Servico from "../modelo/servico"

export default class DeletarServico{
    private servicos: Array<Servico>
    constructor(servicos: Array<Servico>) {
        this.servicos = servicos
    }
    public deletarServico(servicoEscolhido: Servico): Array<Servico>{
        this.servicos.filter((servico) => servico !== servicoEscolhido)
        return this.servicos
    }
}