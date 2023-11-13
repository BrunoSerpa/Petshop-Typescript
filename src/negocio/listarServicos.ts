import Entrada from "../io/entrada"


import Servico from "../modelo/servico";

export default class ListagemServicos{
    private servicos: Array<Servico>
    private entrada: Entrada
    constructor(servicos: Array<Servico>) {
        this.servicos = servicos
        this.entrada = new Entrada()
    }
    
    public set listarServico(servicoDesejado: Servico){
        console.log("---------------------------------------")
        console.log(`Dados do serviço:\n`);
        console.log(`Nome: ${servicoDesejado.nome}`)
        console.log(`Preço: R$${servicoDesejado.preco}`)
    }

    public get selecionarServico(): Servico|undefined {
        let servicosEncontrados: Array<Servico> = []
        while (true){
            let criterio = this.entrada.receberTexto(`Informe o nome ou o número do cpf deste serviço:`)
            this.servicos.forEach(servico =>{
                if (servico.nome.toLowerCase() === criterio.toLowerCase()){
                    servicosEncontrados.push(servico)
                }
            })
            if (servicosEncontrados.length > 1){
                let count:number=1
                let opcoes: Array<number> = []
                
                console.log(`Mais de um serviço encontrado!`)
                console.log(`Qual serviço deseja alterar?`)
                servicosEncontrados.forEach(servico =>{
                    console.log(`${count} - Serviço:`)
                    this.listarServico= servico
                    opcoes.push(count)
                    count++
                })
                console.log(`0 - Nenhum`)
                let servicoDesejado = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                if (opcoes.includes(servicoDesejado)){
                    return servicosEncontrados[servicoDesejado-1]
                } else if (servicoDesejado !== 0){
                    console.log(`Operação não entendida :(`)
                }
            } else if (servicosEncontrados.length === 1){
                console.log(`Serviço encontrado!`)
                return servicosEncontrados[0]
            } else{
                console.log('Serviço não encontrado :(');
            }
            let resposta = this.entrada.receberTexto(`Deseja procurar novamente? (S/N)`)
            if (resposta.toUpperCase() === 'S'){
                continue
            }
            break
        }
        return
    }

    public listar(): void {
        let servicoEspecifico= this.entrada.receberTexto(`Gostaria de Procurar um serviço em específico? (S/N): `)
        switch (servicoEspecifico.toUpperCase()){
            case "S":
                while (true){
                    let servicoEncontrado = this.selecionarServico
                    if (servicoEncontrado){
                        this.listarServico=servicoEncontrado
                    }
                    let continuar = this.entrada.receberTexto(`Deseja listar mais algum serviço? (S/N)`)
                    if (continuar.toUpperCase() === 'S'){
                        continue
                    }
                    break
                }
                break
            case "N":
                this.servicos.forEach(servicoData =>{
                    this.listarServico=servicoData
                })
                break
            default:
                console.log(`Operação não entendida :(`)
                break
        }
    }
}