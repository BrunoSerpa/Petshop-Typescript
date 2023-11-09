import Entrada from "../io/entrada"
import Cadastro from "./cadastro"

import Servico from "../modelo/servico";

export default class CadastroServico extends Cadastro {
    private servicos: Array<Servico>
    private entrada: Entrada
    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        while (true){
            console.log("---------------------------------------")
            console.log(`\nIníciando o cadastro de servicos`);
            const nome = this.entrada.receberTexto(`Por favor informe o nome do servico: `)
            const preco = this.entrada.receberNumero(`Por favor informe o numero do servico: R$`)
            let servico =  new Servico(nome, preco)
            this.servicos.push(servico)
            console.log(`\nCadastro concluído :)\n`)
            let continuar = this.entrada.receberTexto(`Deseja cadastrar mais algum servico? (S/N)`)
            if (continuar.toUpperCase() !== 'S'){
                break
            }
        }
    }
}