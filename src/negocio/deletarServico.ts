import Entrada from "../io/entrada"

import Servico from "../modelo/servico";
import ListagemServicos from "./listarServicos";

export default class DeletarProduto{
    private produtos: Array<Servico>
    private listarServicos
    private servicoEscolhido !: Servico
    private entrada: Entrada
    constructor(produtos: Array<Servico>) {
        this.produtos = produtos
        this.entrada = new Entrada()
        this.listarServicos = new ListagemServicos(this.produtos)
    }
    public get deletar(): Array<Servico>{
        while (true){
            let servicoEscolhido=this.listarServicos.selecionarServico
            if (servicoEscolhido){
                this.servicoEscolhido=servicoEscolhido
            } else{
                break 
            }
            if (this.servicoEscolhido){
                this.listarServicos.listarServico=this.servicoEscolhido
                let continuar = this.entrada.receberTexto(`Deseja excluir esse serviço? (S/N):`)
                if (continuar.toUpperCase() === 'S'){
                    this.produtos = this.produtos.filter(servico => servico !== this.servicoEscolhido)
                }
            }
            let continuar = this.entrada.receberTexto(`Deseja excluir mais algum serviço? (S/N):`)
            if (continuar.toUpperCase() === 'S'){
               continue
            }
            break
        }
        return this.produtos
    }
}