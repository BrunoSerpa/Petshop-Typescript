import Entrada from "../io/entrada"


import Servico from "../modelo/servico";
import Listagem from "./listagem";

export default class ListagemServicos extends Listagem {
    private servicos: Array<Servico>
    private entrada: Entrada
    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos
        this.entrada = new Entrada()
    }
    public listar(): void {
        let servicoEspecifico= this.entrada.receberTexto(`Gostaria de Procurar um servico em específico? (S/N): `)
        switch (servicoEspecifico.toUpperCase()){
            case "S":
                while (true){
                    const criterio = this.entrada.receberTexto(`Por favor informe o nome do servico: `)
                    const servicoEncontrado = this.servicos.find(servico =>
                        servico.nome.toLowerCase() === criterio.toLowerCase()
                    );
                    if (servicoEncontrado){
                        console.log(`Nome:` + servicoEncontrado.nome)
                        console.log(`Preço: R$${servicoEncontrado.preco}`)
                    } else{
                        console.log('Cliente não encontrado.');
                    }
                    let continuar = this.entrada.receberTexto(`Deseja listar mais algum servico? (S/N)`)
                    if (continuar.toUpperCase() !== 'S'){
                        break
                    }
                }
                break
            case "N":
                this.servicos.forEach(servicoData =>{
                    console.log(`Nome:` + servicoData.nome)
                    console.log(`Preço: R$${servicoData.preco}`)
                    console.log(`--------------------------------------`);
                })
                break
            default:
                console.log(`Operação não entendida :(`)
                break
        }
    }
}