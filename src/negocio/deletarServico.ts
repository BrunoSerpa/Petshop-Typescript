import Entrada from "../io/entrada"

import Servico from "../modelo/servico";
import Listagem from "./listagem";

export default class DeletarServico extends Listagem {
    private servicos: Array<Servico>
    private servicoEscolhido !: Servico
    private entrada: Entrada
    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos
        this.entrada = new Entrada()
    }
    public listar(): void {
        const criterio = this.entrada.receberTexto(`Por favor informe o nome do servico: `)
        let servicoEncontrado = this.servicos.find(servico =>
            servico.nome.toLowerCase() === criterio.toLowerCase()
        );
        if (servicoEncontrado){
            this.servicoEscolhido = servicoEncontrado
            console.log(`Nome:` + this.servicoEscolhido.nome)
            console.log(`Preço: R$${this.servicoEscolhido.preco}`)
        } else{
            console.log('servico não encontrado :');
        }
    }
    public deletar(): Array<Servico>{
        while (true){
            this.listar()
            if (this.servicoEscolhido){
                let continuar = this.entrada.receberTexto(`Deseja excluir esse servico? (S/N):`)
                if (continuar.toUpperCase() === 'S'){
                    this.servicos = this.servicos.filter(servico => servico !== this.servicoEscolhido)
                }
            }
            let continuar = this.entrada.receberTexto(`Deseja excluir mais algum cliente? (S/N):`)
            if (continuar.toUpperCase() === 'S'){
               continue
            }
            break
        }
        return this.servicos
    }
}