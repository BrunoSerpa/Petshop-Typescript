import Servico from "../modelo/servico";

export default class CadastroServico{
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
}