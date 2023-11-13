import Entrada from "../io/entrada"

import Servico from "../modelo/servico";

export default class CadastroServico{
    private servicos: Array<Servico>
    private entrada: Entrada
    constructor(servicos: Array<Servico>) {
        this.servicos = servicos
        this.entrada = new Entrada()
    }

    public cadastrar(): void {
        while (true){
            console.log("---------------------------------------")
            console.log(`\nIníciando o cadastro de servicos`);
            const nome = this.entrada.receberTexto(`Por favor informe o nome do serviço: `)
            const preco = this.entrada.receberNumero(`Por favor informe o preço do serviço: R$`)
            this.servicos.push(new Servico(nome, preco))
            console.log(`\nCadastro concluído :)\n`)
            let continuar = this.entrada.receberTexto(`Deseja cadastrar mais algum serviço? (S/N)`)
            if (continuar.toUpperCase() !== 'S'){
                break
            }
        }
    }
}