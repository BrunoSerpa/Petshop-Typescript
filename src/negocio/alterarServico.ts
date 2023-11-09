import Entrada from "../io/entrada"


import Servico from "../modelo/servico";
import Listagem from "./listagem";

export default class AlterarServicos extends Listagem {
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
            console.log(`Nome:` + servicoEncontrado.nome)
            console.log(`Preço: R$${servicoEncontrado.preco}`)
            this.servicoEscolhido= servicoEncontrado
        } else{
            console.log('servico não encontrado :');
        }
    }
    public alterar(): Array<Servico>{
        while (true){
            this.listar()
            while (true) {       
                if (this.servicoEscolhido){
                    console.log(`Informe o dado que deseja alterar:`)
                    console.log("1 - Nome")
                    console.log("2 - Preço")
                    console.log("0 - Sair")
                    let dadoDesejado = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                    switch (dadoDesejado){
                        case 1:
                            this.servicoEscolhido.nome = this.entrada.receberTexto(`Por favor informe o nome do servico: `)
                            break
                        case 2:
                            this.servicoEscolhido.preco = this.entrada.receberNumero(`Por favor informe o numero do servico: R$`)
                            break
                        default:
                            console.log(`Operação não entendida :(`)
                            break 
                    }
                    let continuar = this.entrada.receberTexto(`Deseja alterar mais algum dado? (S/N):`)
                    if (continuar.toUpperCase() === 'S'){
                        continue
                    }
                }
                break
            }
            let continuar = this.entrada.receberTexto(`Deseja alterar mais algum servico? (S/N):`)
            if (continuar.toUpperCase() === 'S'){
                continue
            }
            break
        }
        return this.servicos
    }
}