import Servico from "../modelo/servico";

export default class FuncoesServico{
    private servicos: Array<Servico>
    constructor(servicos: Array<Servico>) {
        this.servicos = servicos
    }
    public cadastrarServico(novoServico: Servico): Array<Servico> {
        const servicoExistente = this.servicos.find(
            (servico) => servico.nome === novoServico.nome && servico.preco === novoServico.preco
        );
        if (!servicoExistente) {
            this.servicos.push(novoServico);
        }
        return this.servicos;
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
    public deletarServico(servicoEscolhido: Servico): Array<Servico>{
        this.servicos.filter((servico) => servico !== servicoEscolhido)
        return this.servicos
    }
}